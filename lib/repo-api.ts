import { apiGetReadme, apiRepoData, apiRepoReadme } from './github-api'

type RepoReadme = {
  readmeBaseUrl: string
  previewImageUrl: string
  readmeContent: string
  readmeTitle: string
  readmeSnippet: string
}

type RepoData = {
  name: string
  description: string
  repoUrl: string
}

export type ProjectData = {
  slug: string
  name: string
  description: string
  repoUrl: string
  readmeContent: string
  readmeBaseUrl: string
  previewImageUrl: string
}

/**
 * Extracts a preview from the given markdown content.
 *
 * @param markdownContent - The content of the markdown file.
 * @returns An object containing the title, snippet, and first image name.
 */
function getReadmePreview(markdownContent: string): {
  title: string | null
  snippet: string | null
  firstImage: string | null
} {
  // Extract the title (first level 1 heading)
  const titleMatch = markdownContent.match(/^# (.+)$/m)
  const title = titleMatch ? titleMatch[1].trim() : null

  // Extract the first paragraph
  const paragraphs = markdownContent.split(/\n\s*\n/).filter(p => p.trim())
  const firstParagraph = paragraphs.find(p => !p.startsWith('#'))
  const snippet = firstParagraph
    ? firstParagraph.slice(0, 60).trim() +
      (firstParagraph.length > 60 ? '...' : '')
    : null

  // Extract the first image name
  const imageMatch = markdownContent.match(/!\[.*?\]\((.*?)\)/)
  const firstImagePath = imageMatch ? imageMatch[1].trim() : null
  const firstImage = firstImagePath
    ? firstImagePath.split('/').pop() || null
    : null

  return { title, snippet, firstImage }
}

async function getRepoReadme(
  userName: string,
  repoName: string,
): Promise<RepoReadme | null> {
  const readmeData = await apiRepoReadme(userName, repoName)
  if (!readmeData) {
    console.log(`Readme file not found for ${userName}/${repoName}`)
    return null
  }

  const downloadUrl = readmeData.download_url
  const readmeContent = await apiGetReadme(downloadUrl)
  const readmePreview = getReadmePreview(readmeContent)
  const baseUrl = downloadUrl.substring(0, downloadUrl.lastIndexOf('/'))

  return {
    readmeBaseUrl: baseUrl,
    previewImageUrl: `${baseUrl}/${readmePreview.firstImage}`,
    readmeContent,
    readmeTitle: readmePreview.title,
    readmeSnippet: readmePreview.snippet,
  }
}

async function getRepoData(
  userName: string,
  repoName: string,
): Promise<RepoData | null> {
  const data = await apiRepoData(userName, repoName)
  if (!data) {
    console.log(`Couldn't fetch data for ${userName}/${repoName}`)
    return null
  }
  return {
    name: data.name,
    description: data.description,
    repoUrl: data.html_url,
  }
}

export async function getProjectData(
  userName: string,
  repoName: string,
  slug: string,
): Promise<ProjectData> {
  const readmeData = await getRepoReadme(userName, repoName)
  const repoData = await getRepoData(userName, repoName)

  const name = readmeData
    ? readmeData.readmeTitle
    : repoData
      ? repoData.name
      : 'Untitled Project'
  const description = repoData
    ? repoData.description
    : readmeData
      ? readmeData.readmeSnippet
      : 'No description available.'
  const ret = {
    slug,
    name,
    description,
    repoUrl: repoData ? repoData.repoUrl : '',
    readmeContent: readmeData ? readmeData.readmeContent : '# Empty',
    readmeBaseUrl: readmeData ? readmeData.readmeBaseUrl : '',
    previewImageUrl: readmeData ? readmeData.previewImageUrl : '',
  }
  return ret
}
