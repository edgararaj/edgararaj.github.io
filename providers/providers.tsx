'use client'
import { ProjectsProvider } from 'providers/projects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { createHash, randomBytes } from 'crypto'
import { useEffect, useState } from 'react'

function calculateHashForPublicFile(
  filePath: string,
  onHashCalculated: (hash: string | null, error?: Error) => void,
) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`)
      }
      return response.text()
    })
    .then(fileContent => {
      const hash = createHash('sha256').update(fileContent).digest('hex')
      onHashCalculated(hash)
    })
    .catch(error => {
      console.error('Error calculating hash:', error)
      onHashCalculated(null, error)
    })
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [buster, setBuster] = useState(null)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  })

  useEffect(() => {
    if (process.env.NODE_ENV == 'development') {
      const hash = randomBytes(3).toString()
      setBuster(hash)
      console.log(`Random hash generated to force refresh: ${hash}`)
      return
    }

    calculateHashForPublicFile('/project_repos.json', (hash, error) => {
      if (error) {
        console.error('Error during hash calculation:', error)
        return
      }
      setBuster(hash)
      console.log(`Hash calculated for project_repos.json, value: ${hash}`)
    })
  }, [])

  if (buster === null) {
    return null
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: createAsyncStoragePersister({ storage: AsyncStorage }),
        buster,
      }}
    >
      <ProjectsProvider>{children}</ProjectsProvider>
    </PersistQueryClientProvider>
  )
}
