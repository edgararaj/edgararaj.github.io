import path from 'path';
import fs from 'fs/promises';
import fsSync from 'fs';

/**
 * Fetches all files in a GitHub repository using the `contents` API endpoint.
 *
 * @param userName - The repository' username
 * @param repoName - The repository name
 * @returns A list of files with their metadata, including `download_url`.
 */
async function fetchRepoContents(userName: string, repoName: string): Promise<any[]> {
  const apiUrl = `https://api.github.com/repos/${userName}/${repoName}/contents`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch repository contents: ${response.statusText}`);
  }

  return response.json(); // Parse and return the JSON response
}

/**
 * Downloads the README file from a GitHub repository,
 * extracts image links, and saves the images in the public folder.
 *
 * @param userName - The repository's username.
 * @param repoName - The repository name
 * @param publicDirectory - The absolute path to the public directory.
 * @returns The content of the README markdown file.
 */
export async function processReadme(userName: string, repoName: string, publicDirectory: string): Promise<string> {
  const repoFolderPath = path.join(publicDirectory, userName, repoName);
  if (fsSync.existsSync(repoFolderPath)) {
    console.log(`Folder already exists, skipping fetching: ${repoFolderPath}`);
    const readmeFile = await fs.readdir(repoFolderPath).then(files => files.find(file => file.toLowerCase().startsWith('readme')));
    if (readmeFile) {
      return fs.readFile(path.join(repoFolderPath, readmeFile), 'utf8');
    }
  }
  try {
    // Fetch all files in the repository
    const repoContents = await fetchRepoContents(userName, repoName);

    // Find the README file
    const readmeFile = repoContents.find(file => file.name.toLowerCase().startsWith('readme'));
    if (!readmeFile || !readmeFile.download_url) {
      throw new Error('README file not found in the repository.');
    }

    // Fetch the README content
    const readmeResponse = await fetch(readmeFile.download_url);
    if (!readmeResponse.ok) {
      throw new Error(`Failed to fetch README content: ${readmeResponse.statusText}`);
    }

    const content = await readmeResponse.text();

    // Extract image paths from the markdown
    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    const images: string[] = Array.from(content.matchAll(imageRegex)).map(match => match[1]);

    if (images.length === 0) {
      console.log('No images found in the README file.');
      return content;
    }

    // Create a folder for the repository in the public directory
    const repoFolder = path.join(publicDirectory, userName, repoName);
    await fs.mkdir(repoFolder, { recursive: true });

    // Process each image
    for (const imagePath of images) {
      const imageFileName = path.basename(imagePath);

      // Find the image file in the repository contents
      const imageFile = repoContents.find(file => file.name === imageFileName);
      if (!imageFile || !imageFile.download_url) {
        console.error(`Image not found in the repository: ${imageFileName}`);
        continue;
      }

      // Fetch and save the image
      const imageResponse = await fetch(imageFile.download_url);
      if (!imageResponse.ok) {
        console.error(`Failed to download image: ${imageFileName}`);
        continue;
      }

      const imageBuffer = await imageResponse.arrayBuffer();
      const imageFilePath = path.join(repoFolder, imageFileName);

      await fs.writeFile(imageFilePath, Buffer.from(imageBuffer));
      console.log(`Downloaded: ${imageFileName}`);
    }

    return content; // Return markdown content
  } catch (error) {
    console.error('Error processing README:', error);
    throw error;
  }
}

/**
 * Extracts a preview from the given markdown content.
 *
 * @param markdownContent - The content of the markdown file.
 * @returns An object containing the title, snippet, and first image name.
 */
export function getPreview(markdownContent: string): {
  title: string | null;
  snippet: string | null;
  firstImage: string | null;
} {
  // Extract the title (first level 1 heading)
  const titleMatch = markdownContent.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : null;

  // Extract the first paragraph
  const paragraphs = markdownContent.split(/\n\s*\n/).filter(p => p.trim());
  const firstParagraph = paragraphs.find(p => !p.startsWith('#'));
  const snippet = firstParagraph ? firstParagraph.slice(0, 60).trim() + (firstParagraph.length > 60 ? '...' : '') : null;

  // Extract the first image name
  const imageMatch = markdownContent.match(/!\[.*?\]\((.*?)\)/);
  const firstImagePath = imageMatch ? imageMatch[1].trim() : null;
  const firstImage = firstImagePath ? firstImagePath.split('/').pop() || null : null;

  return { title, snippet, firstImage };
}
