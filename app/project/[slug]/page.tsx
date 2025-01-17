import ReactMarkdown from "react-markdown";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import projects from "../../../assets/project_repos.json";
import { GitBranchPlusIcon } from 'lucide-react'
import { processReadme } from '../../../lib/processReadme';
import path from "path";

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({slug}));
}

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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const {user, repo} = projects[slug];
  const repoUrl = `https://github.com/${user}/${repo}`
  const publicDirectory = path.join(process.cwd(), 'public');
  const markdownContent = await processReadme(user, repo, publicDirectory);
  
  return (
    <div className="max-w-[60ch] m-auto">
      <Link
        href={repoUrl}
        className="inline-flex items-center text-gray-400 hover:opacity-80 transition-opacity font-code border border-gray-400 rounded-xl w-fit p-0.5 pl-1.5 pr-1.5 text-sm mb-5 -ml-0.5"
      >
        <GitBranchPlusIcon className="mr-2 w-4 h-4"></GitBranchPlusIcon>
        Github
      </Link>
      <div className={styles.markdownBody}>
        <ReactMarkdown
          components={MarkdownComponents}
          urlTransform={(url) => (url.startsWith("http") ? url : `/${user}/${repo}/${url}`)}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
