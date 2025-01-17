"use client";
import ReactMarkdown from "react-markdown";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { GitBranchPlusIcon } from "lucide-react";
import { useProjects } from "../../providers/projects";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const MarkdownComponents: object = {
  p: (paragraph: { children?: boolean; node?: any }) => {
    const { node } = paragraph;

    if (node.children[0].tagName === "img") {
      const image = node.children[0];
      const metastring = image.properties.alt;
      const alt = metastring?.replace(/ *\{[^)]*\} */g, "");

      return (
        <div className="postImgWrapper">
          <Image
            src={image.properties.src}
            width={768}
            height={432}
            className="postImg"
            alt={alt}
          />
        </div>
      );
    }
    return <p>{paragraph.children}</p>;
  },
};

function ProjectMarkdown() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const { projects, isLoading } = useProjects();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      setProject(projects.find((project) => project.slug === slug));
    }
  }, [projects, isLoading, slug]);

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  if (!project) {
    return <div>None</div>;
  }

  return (
    <div className="max-w-[60ch] m-auto">
      <Link
        href={project.repoUrl}
        className="inline-flex items-center text-gray-400 hover:opacity-80 transition-opacity font-code border border-gray-400 rounded-xl w-fit p-0.5 pl-1.5 pr-1.5 text-sm mb-5 -ml-0.5"
      >
        <GitBranchPlusIcon className="mr-2 w-4 h-4"></GitBranchPlusIcon>
        Github
      </Link>
      <div className={styles.markdownBody}>
        <ReactMarkdown
          components={MarkdownComponents}
          urlTransform={(url) =>
            url.startsWith("http") ? url : `${project.readmeBaseUrl}/${url}`
          }
        >
          {project.readmeContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default function ProjectPage() {
  return (
    <Suspense>
      <ProjectMarkdown />
    </Suspense>
  );
}
