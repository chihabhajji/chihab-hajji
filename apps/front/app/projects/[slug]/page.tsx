import { notFound } from "next/navigation";
import { Header } from "./header";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import { getWorkExperience, getWorkExperiences } from "../../../lib/sanity";
import Mosaique from "../../../components/masonry/masonry";
import Markdown from "./markdown";
import { WorkExperience } from "@/../lib/sanity/types";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<
  Awaited<Props["params"]>[]
> {
  const experiences = (await getWorkExperiences) as WorkExperience[];
  if (!experiences) {
    throw new Error("No experiences found");
  }
  return experiences.map((p) => ({
    slug: p.slug!.current,
  }));
}

export default async function PostPage({ params }: Props) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;
  const project = (await getWorkExperience(slug)) as WorkExperience;

  if (!project || !project.slug?.current) {
    notFound();
  }

  const views = await redis.getset(
    ["pageviews", "projects", slug].join(":"),
    0
  );

  return (
    <div className="">
      <div className="bg-zinc-50 min-h-screen text-black">
        <Header project={project!} views={views ?? 0} />
        <ReportView slug={project.slug!.current} />
        {!!project.longDescription && (
          <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
            <Markdown blocks={project.longDescription} />
          </article>
        )}
      </div>
      <div className="p-2 m-4">
        <Mosaique gallery={project.gallery ?? []} title={project.title} />
      </div>
    </div>
  );
}
