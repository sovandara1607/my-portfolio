"use client"

import { CaseStudyTemplate } from "@/components/case-study-template"
import { profile } from "@/lib/profile"

export default function ResumeBuilderCaseStudy() {
  const project = profile.academicProjects.find(
    (p) => p.name === "Online Resume Builder Platform",
  )!

  return (
    <CaseStudyTemplate
      name={project.name}
      tagline="Web app for creating and managing professional resumes online, with full CRUD and authentication."
      course={project.course}
      period={project.period}
      stack={project.stack}
      bullets={project.bullets}
    />
  )
}
