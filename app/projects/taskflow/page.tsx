"use client"

import { CaseStudyTemplate } from "@/components/case-study-template"
import { profile } from "@/lib/profile"

export default function TaskflowCaseStudy() {
  const project = profile.academicProjects.find(
    (p) => p.name === "TaskFlow, a Flutter Task Management Mobile App",
  )!

  return (
    <CaseStudyTemplate
      name={project.name}
      tagline="A clean, user-friendly Flutter mobile app for organizing daily tasks."
      course={project.course}
      period={project.period}
      stack={project.stack}
      bullets={project.bullets}
    />
  )
}
