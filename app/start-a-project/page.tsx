import type { Metadata } from "next";
import StartProjectForm from "@/components/StartProjectForm";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell Creative Core what you're trying to create, build or grow — we'll figure out what it takes.",
};

export default function StartAProjectPage() {
  return <StartProjectForm />;
}
