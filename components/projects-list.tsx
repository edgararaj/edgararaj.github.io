"use client";
import { useProjects, Project } from "../providers/projects";
import { BlogCard } from "@/components/blog-card";

const ProjectList = () => {
  const { projects, isLoading } = useProjects();

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      {projects.map(
        (p: Project, i: number) => (
          <BlogCard
            key={i}
            slug={p.slug}
            title={p.name}
            text={p.description}
            imageUrl={p.previewImageUrl}
            repoUrl={p.repoUrl}
            index={i}
          />
        )
      )}
    </div>
  );
};

export default ProjectList;
