"use client";

import Masonry from "react-masonry-css";
import { SmartImage } from "./smart-image";
import styles from "./Gallery.module.scss";
import { WorkExperience } from "../../lib/sanity/types";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../../lib/sanity";

export default function MasonryGrid({
  gallery,
  title,
}: {
  gallery: NonNullable<WorkExperience["gallery"]>;
  title?: string;
}) {
  const breakpointColumnsObj = {
    default: 3,
    1440: 3,
    1024: 2,
    560: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {gallery.map((image, index) => {
        const imageProps = useNextSanityImage(client, image);

        if (!imageProps) {
          return null;
        }

        return (
          <SmartImage
            {...imageProps}
            priority={index < 10}
            sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
            key={image._key || index}
            alt={title ?? "Gallery image"}
            className={styles.gridItem}
            objectFit="cover"
            enlarge={true}
          />
        );
      })}
    </Masonry>
  );
}
