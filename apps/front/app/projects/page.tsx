import React from "react";
import { Navigation } from "../../components/nav";
import { Card } from "../../components/card";
import { Article } from "../../components/article";
import { getWorkExperiences } from "../../lib/sanity";
import { type WorkExperience } from "@/../lib/sanity/types";

export const revalidate = false;

export default async function ProjectsPage() {
  const projects = (await getWorkExperiences) as WorkExperience[];
  if (!projects) return null;
  const current = projects.find((p) => !p.endDate);
  const filtered = projects.filter((p) => !!p.endDate);
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
              <Article project={current} readMore />
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
                  <Article project={project} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filtered
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug?.current}>
                  <Article project={project} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filtered
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug?.current}>
                  <Article project={project} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
