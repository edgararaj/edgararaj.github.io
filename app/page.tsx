import { BlogCard } from "@/components/blog-card";
import { ArrowDown } from "lucide-react";
import projects from "../assets/project_repos.json";
import { getPreview, processReadme } from '../lib/processReadme';
import path from "path";

export default async function Home() {
  const projectsPreview = await Promise.all(Object.entries(projects).map(async ([slug, {user, repo}]) => {
    const repoUrl = `https://github.com/${user}/${repo}`
    const publicDirectory = path.join(process.cwd(), 'public');
    const markdownContent = await processReadme(user, repo, publicDirectory);
    return {
      repoUrl,
      slug,
      ...getPreview(markdownContent)
    }
  }))

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-md font-code">Conteúdo</h2>
        <button className="flex items-center text-gray-400 hover:text-primary transition-colors text-md font-code">
          Ordenar por: Data
          <ArrowDown className="ml-1 w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {projectsPreview.map(({title, snippet, firstImage, repoUrl, slug}, index) => (
          <BlogCard
            key={index}
            slug={slug}
            title={title}
            snippet={snippet}
            imageUrl={firstImage}
            repoUrl={repoUrl}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
