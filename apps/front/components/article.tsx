"use client";
import Link from "next/link";
import Image from "next/image";
import { Eye, CameraOff } from "lucide-react";
import { type WorkExperience } from "../lib/sanity/types";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../lib/sanity";

type Props = {
  project: WorkExperience;
  views: number;
  readMore?: boolean;
};

export const Article: React.FC<Props> = ({ project, views, readMore }) => {
  const imageProps = useNextSanityImage(client, project.previewImage ?? null);

  return (
    <Link href={`/projects/${project.slug?.current}`} className="h-full">
      <article className="p-4 md:p-8 flex flex-col h-full">
        <div className="flex justify-between gap-2 items-center">
          <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
            {project.startDate ? (
              <time dateTime={new Date(project.startDate).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(project.startDate),
                )}
              </time>
            ) : (
              <span>Current</span>
            )}
          </span>
          <span className="text-zinc-500 text-xs  flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
          </span>
        </div>
        <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
          {project.title}
        </h2>
        <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200 flex-1">
          {project.description}
        </p>

        <div className="flex flex-row justify-end pt-4">
          {imageProps ? (
            <Image
              alt={project.title ?? "Project image"}
              src={imageProps.src}
              loader={imageProps.loader}
              objectFit="contain"
              width={60}
              height={60}
            />
          ) : (
            <CameraOff />
          )}
        </div>
        {readMore && (
          <div className="absolute bottom-4 md:bottom-8">
            <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
              Read more <span aria-hidden="true">&rarr;</span>
            </p>
          </div>
        )}
      </article>
    </Link>
  );
};
