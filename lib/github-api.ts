
// lib/github-api.ts
import { useQuery } from '@tanstack/react-query';

// Types
type RepoReadme = {
  readmeBaseUrl: string;
  previewImageUrl: string;
  readmeContent: string;
  readmeTitle: string;
  readmeSnippet: string;
}

type RepoData = {
  name: string;
  description: string;
  repoUrl: string;
}

/**
 * Extracts a preview from the given markdown content.
 *
 * @param markdownContent - The content of the markdown file.
 * @returns An object containing the title, snippet, and first image name.
 */
export function getRepoReadmePreview(markdownContent: string): {
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

// Base fetcher functions
export async function getRepoReadme(userName: string, repoName: string): Promise<RepoReadme> {
  const apiUrl = `https://api.github.com/repos/${userName}/${repoName}/readme`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch readme: ${response.statusText}`);
  }

  const readmeData = await response.json();
  const downloadUrl = readmeData.download_url;
  
  if (!downloadUrl) {
    throw new Error('Download URL not found in the README response.');
  }

  const readmeResponse = await fetch(downloadUrl);
  if (!readmeResponse.ok) {
    throw new Error(`Failed to fetch README content: ${readmeResponse.statusText}`);
  }

  const readmeContent = await readmeResponse.text();
  const readmePreview = getRepoReadmePreview(readmeContent);
  const baseUrl = downloadUrl.substring(0, downloadUrl.lastIndexOf('/'));

  return {
    readmeBaseUrl: baseUrl,
    previewImageUrl: `${baseUrl}/${readmePreview.firstImage}`,
    readmeContent,
    readmeTitle: readmePreview.title,
    readmeSnippet: readmePreview.snippet
  };
}

export async function getRepoData(userName: string, repoName: string): Promise<RepoData> {
  const apiUrl = `https://api.github.com/repos/${userName}/${repoName}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch repository data: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    name: data.name,
    description: data.description,
    repoUrl: data.html_url
  };
}