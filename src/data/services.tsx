import type { ReactNode } from "react";
import {
  Server,
  RefreshCw,
  Cloud,
  Users,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";

export interface ServiceLine {
  id: string;
  icon: ReactNode;
  titleKey: string;
  descriptionKey: string;
  proofPointKey?: string;
  technologies: string[];
}

export const services: ServiceLine[] = [
  {
    id: "cloud-devops",
    icon: <Cloud size={24} strokeWidth={2.5} />,
    titleKey: "services_cloud_devops_title",
    descriptionKey: "services_cloud_devops_description",
    technologies: ["AWS", "Google Cloud", "Kubernetes", "Docker"],
  },
  {
    id: "ai-engineering",
    icon: <BrainCircuit size={24} strokeWidth={2.5} />,
    titleKey: "services_ai_engineering_title",
    descriptionKey: "services_ai_engineering_description",
    technologies: [
      "LLM",
      "RAG",
      "Agents",
      "Evaluation",
      "Observability",
      "Guardrails",
    ],
  },
  {
    id: "legacy-modernization",
    icon: <RefreshCw size={24} strokeWidth={2.5} />,
    titleKey: "services_legacy_modernization_title",
    descriptionKey: "services_legacy_modernization_description",
    technologies: ["Refactoring", "System Architecture", "Database Migration"],
  },
  {
    id: "security-compliance",
    icon: <ShieldCheck size={24} strokeWidth={2.5} />,
    titleKey: "services_security_compliance_title",
    descriptionKey: "services_security_compliance_description",
    technologies: [
      "Secure SDLC",
      "Threat Modeling",
      "Dependency Scanning",
      "SBOMs",
      "Compliance-Evidence Automation",
    ],
  },
  {
    id: "enterprise-software",
    icon: <Server size={24} strokeWidth={2.5} />,
    titleKey: "services_enterprise_software_title",
    descriptionKey: "services_enterprise_software_description",
    technologies: ["Golang", "Python", "Kafka", "Microservices"],
  },
  {
    id: "staff-augmentation",
    icon: <Users size={24} strokeWidth={2.5} />,
    titleKey: "services_staff_augmentation_title",
    descriptionKey: "services_staff_augmentation_description",
    proofPointKey: "services_staff_augmentation_proof_point",
    technologies: ["Agile/Scrum", "QA & Testing", "Team Leadership"],
  },
];
