import React from "react";
import { Navigation } from "../../components/nav";
import { Card } from "../../components/card";
import { Article } from "../../components/article";
import { Redis } from "@upstash/redis";
import { getWorkExperiences } from "../../lib/sanity";
import { WorkExperience } from "@/../lib/sanity/types";

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function ProjectsPage() {
  const sorted = (await getWorkExperiences) as WorkExperience[];
  if (!sorted) return null;
  const current = sorted.find((p) => !p.endDate);
  const filtered = sorted.filter((p) => !!p.endDate);
  const views = (
    await redis.mget<number[]>(
      ...sorted.map((p) => ["pageviews", "projects", p.slug?.current].join(":"))
    )
  ).reduce((acc, v, i) => {
    acc[sorted[i].slug!.current] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>

        {!!current && (
          <>
            <div className="w-full h-px bg-zinc-800" />
            <Card>
              <Article
                project={current}
                views={views[current!.slug!.current] ?? 0}
                readMore
              />
            </Card>
            <div className="hidden w-full h-px md:block bg-zinc-800" />
          </>
        )}
        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {filtered
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug?.current}>
                  <Article
                    project={project}
                    views={views[project.slug!.current] ?? 0}
                  />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filtered
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug?.current}>
                  <Article
                    project={project}
                    views={views[project.slug!.current] ?? 0}
                  />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filtered
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug?.current}>
                  <Article
                    project={project}
                    views={views[project.slug!.current] ?? 0}
                  />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
