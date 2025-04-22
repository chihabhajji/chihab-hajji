"use client";

import { useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
  useEffect(() => {
    fetch(`/api/incr/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [slug]);

  return null;
};
