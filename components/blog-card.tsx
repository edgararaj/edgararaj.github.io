import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GitBranchPlusIcon } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  text: string;
  imageUrl: string;
  repoUrl: string;
  index: number;
}

export function BlogCard({
  slug,
  title,
  text,
  imageUrl,
  repoUrl,
  index,
}: BlogCardProps) {
  return (
    <div className="bg-dark-secondary/50 rounded-lg p-6 pl-10 flex justify-between items-center gap-6 mb-4">
      <div className="grid grid-cols-[50px] gap-2">
        <p className="font-cube text-xs m-auto">{index + 1}</p>
        <div className="flex flex-col">
          <h2 className="text-2xl font-secondary">{title}</h2>
          <p className="text-gray-400">{text}</p>
        </div>
        <Link
          href={repoUrl}
          className="inline-flex items-center text-gray-400 hover:opacity-80 transition-opacity font-code col-start-2 border border-gray-400 rounded-xl w-fit p-0.5 pl-1.5 pr-1.5 text-sm mt-1"
        >
          <GitBranchPlusIcon className="mr-2 w-4 h-4"></GitBranchPlusIcon>
          Github
        </Link>
        <Link
          href={`/project?${new URLSearchParams({slug})}`}
          className="inline-flex items-center text-primary hover:opacity-80 transition-opacity font-code col-start-2 mt-5"
        >
          READ MORE
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt=""
        width={300}
        height={200}
        className="rounded-lg object-cover"
      />
    </div>
  );
}
