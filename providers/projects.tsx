"use client";
import { createContext, useContext } from "react";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { getRepoData, getRepoReadme } from "lib/github-api";
import project_repos from "../assets/project_repos.json";

export type Project = {
  slug: string;
  name: string;
  description: string;
  repoUrl: string;
  readmeContent: string;
  readmeBaseUrl: string;
  previewImageUrl: string;
}

type ProjectsContextType = {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetchAll: () => Promise<void>;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Transform project_repos into an array for useQueries
  const projectQueries = Object.entries(project_repos).map(([slug, { user, repo }]) => [
    // Query for repo data
    {
      queryKey: ['repo', user, repo],
      queryFn: () => getRepoData(user, repo),
      staleTime: 1000 * 60 * 60, // 1 hour
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
    // Query for readme data
    {
      queryKey: ['readme', user, repo],
      queryFn: () => getRepoReadme(user, repo),
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  ]).flat();

  // Execute all queries
  const results = useQueries({ queries: projectQueries });

  // Process results into projects array
  const projectsData = Object.entries(project_repos).map(([slug, { user, repo }], index) => {
    const repoResult = results[index * 2];
    const readmeResult = results[index * 2 + 1];

    if (repoResult.data && readmeResult.data) {
      return {
        slug,
        ...repoResult.data,
        ...readmeResult.data,
      };
    }
    return null;
  }).filter((project): project is Project => project !== null);

  // Calculate loading and error states
  const isLoading = results.some(result => result.isLoading);
  const isError = results.some(result => result.isError);
  const error = results.find(result => result.error)?.error as Error || null;

  // Function to refetch all data
  const refetchAll = async () => {
    await Promise.all(results.map(result => result.refetch()));
  };

  // Optional: Prefetch data on mount
  const prefetchProjects = async () => {
    await Promise.all(
      Object.entries(project_repos).flatMap(([_, { user, repo }]) => [
        queryClient.prefetchQuery({
          queryKey: ['repo', user, repo],
          queryFn: () => getRepoData(user, repo)
        }),
        queryClient.prefetchQuery({
          queryKey: ['readme', user, repo],
          queryFn: () => getRepoReadme(user, repo)
        })
      ])
    );
  };

  return (
    <ProjectsContext.Provider 
      value={{ 
        projects: projectsData, 
        isLoading, 
        isError,
        error,
        refetchAll
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};