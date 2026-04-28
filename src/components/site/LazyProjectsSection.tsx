"use client";

import dynamic from "next/dynamic";

const ProjectsSectionDynamic = dynamic(
  () => import("./ProjectsSection").then((m) => ({ default: m.ProjectsSection })),
  { loading: () => <div style={{ minHeight: "720px" }} aria-hidden="true" /> }
);

export function LazyProjectsSection() {
  return <ProjectsSectionDynamic />;
}
