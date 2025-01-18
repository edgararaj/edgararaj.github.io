'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useQueries, UseQueryOptions } from '@tanstack/react-query'
import { getProjectData, ProjectData } from 'lib/repo-api'

interface ProjectRepo {
  user: string
  repo: string
}

type ProjectRepos = {
  [key: string]: ProjectRepo
}

type ProjectsContextType = {
  projects: Map<string, ProjectData>
  isLoading: boolean
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined,
)

function fetchPublicJsonFile(
  filePath: string,
  onFetchComplete: (response: ProjectRepos | null, error?: Error) => void,
) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`)
      }
      return response.json()
    })
    .then(response => {
      onFetchComplete(response)
    })
    .catch(error => {
      console.error('Error calculating hash:', error)
      onFetchComplete(null, error)
    })
}

type ProjectQuery = UseQueryOptions<ProjectData, Error>

export const ProjectsProvider = ({ children }) => {
  const [projectQueries, setProjectQueries] = useState<ProjectQuery[]>([])

  useEffect(() => {
    fetchPublicJsonFile('/project_repos.json', (projectRepos, error) => {
      if (error) {
        console.error('Error during file fetching:', error)
        return
      }
      setProjectQueries(
        Object.entries(projectRepos)
          .map(([slug, { user, repo }]) => [
            {
              queryKey: ['project', user, repo],
              queryFn: () => getProjectData(user, repo, slug),
              staleTime: 1000 * 60 * 60,
            },
          ])
          .flat(),
      )
    })
  }, [])

  const results = useQueries({
    queries: projectQueries,
    combine: results => {
      const data = results.reduce((acc, result) => {
        if (result.data !== undefined) {
          const projectData = result.data as ProjectData
          acc[projectData.slug] = projectData
        }
        return acc
      }, new Map<string, ProjectData>())
      return {
        data,
        pending: results.some(result => result.isPending),
      }
    },
  })

  return (
    <ProjectsContext.Provider
      value={{
        projects: results.data,
        isLoading: results.pending,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export const useProjects = () => {
  const context = useContext(ProjectsContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider')
  }
  return context
}
