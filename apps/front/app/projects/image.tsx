"use client";
import Image from "next/image";
import { WorkExperience } from "../../lib/sanity/types";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../../lib/sanity";

type Props = {
  title?: string;
  image: NonNullable<WorkExperience["previewImage"]>;
};
export default function SanityImage({ image, title }: Props) {
  const props = useNextSanityImage(client, image);
  return (
    <Image
      {...props}
      alt={title ?? "Project image"}
      sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
    />
  );
}
