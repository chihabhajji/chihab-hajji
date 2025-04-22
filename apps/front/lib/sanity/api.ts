//@ts-nocheck
import { client } from "./sanity";
import { getWorkExperienceQ, getWorkExperiencesQ } from "./queries";

export const getWorkExperiences = client.fetch(getWorkExperiencesQ);

export const getWorkExperience = (slug: string) =>
  client.fetch(getWorkExperienceQ, {
    slug,
  });
