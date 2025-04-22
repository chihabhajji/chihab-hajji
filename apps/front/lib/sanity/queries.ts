import { groq } from "next-sanity";

export const getWorkExperiencesQ = groq`
   *[_type == "workExperience"] | order(startDate desc) {
  slug,
  title,
  company,
  companyUrl,
  startDate,
  endDate,
  description,
  previewImage {
      asset -> {
        ...,
				metadata
      },
      crop,
      hotspot
    },
}`;

export const getWorkExperienceQ = groq`
  *[_type == "workExperience" && slug.current == $slug][0]{
    slug,
    title,
    company,
    companyUrl,
    startDate,
    endDate,
    description,
    longDescription,
    previewImage {
      asset -> {
        ...,
				metadata
      },
      crop,
      hotspot
    },
    url,
    gallery[] {
      _type == 'image' => {
        asset -> {
          ...,
				  metadata
        },
      },
      _type == 'urlObject' => {
        urlField
      }
    }
  }
`;
