'use client'
import { useProjects } from '../providers/projects'
import { BlogCard } from '@/components/blog-card'
import Skeleton from '@/components/skeleton'

const ProjectList = () => {
  const { projects, isLoading } = useProjects()

  if (isLoading) {
    return (
      <div className='space-y-6'>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {Object.entries(projects).map(([slug, p], i) => (
        <BlogCard
          key={i}
          slug={slug}
          title={p.name}
          text={p.description}
          imageUrl={p.previewImageUrl}
          repoUrl={p.repoUrl}
          index={i}
        />
      ))}
    </div>
  )
}

export default ProjectList
