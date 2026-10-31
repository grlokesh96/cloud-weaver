import {
  SiKubernetes, SiDocker, SiTerraform, SiLinux, SiGithub,
  SiGit, SiArgo, SiHelm, SiPrometheus, SiGrafana, SiJenkins, SiPython,
  SiAnsible, SiNginx, SiIstio, SiGitlab, SiGithubactions,
  SiPostgresql,
} from "react-icons/si";
import { FaAws, FaShieldAlt, FaCloud } from "react-icons/fa";
import type { IconType } from "react-icons";

export const PROFILE = {
  name: "G. R. Lokesh",
  firstName: "Lokesh",
  title: "Senior DevOps · DevSecOps · Platform Engineer",
  tagline:
    "Designing secure, scalable, automated cloud platforms using AWS, Kubernetes, Terraform, GitOps, and DevSecOps best practices.",
  location: "Hyderabad, India",
  email: "grlokesh96@gmail.com",
  phone: "+91 9100948285",
  linkedin: "https://www.linkedin.com/in/grlokesh96",
  github: "https://github.com/grlokesh96",
  years: "5+",
};

export const ROLES = [
  "DevOps Engineer",
  "DevSecOps Engineer",
  "AWS Cloud Engineer",
  "Kubernetes Engineer",
  "Cloud Native Engineer",
  "GitOps Engineer",
  "Azure DevOps Engineer",
  "AIOps Engineer",
  "Site Reliability Engineer",
  "Cloud Security Engineer",
];

export interface TechIcon { name: string; Icon: IconType; color: string }

export const HERO_TECH: TechIcon[] = [
  { name: "AWS", Icon: FaAws, color: "#FF9900" },
  { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Terraform", Icon: SiTerraform, color: "#7B42BC" },
  { name: "Linux", Icon: SiLinux, color: "#EAEAEA" },
  { name: "GitHub", Icon: SiGithub, color: "#f0f6fc" },
  { name: "Git", Icon: SiGit, color: "#F05033" },
  { name: "Argo CD", Icon: SiArgo, color: "#EF7B4D" },
  { name: "Helm", Icon: SiHelm, color: "#0F1689" },
  { name: "Prometheus", Icon: SiPrometheus, color: "#E6522C" },
  { name: "Grafana", Icon: SiGrafana, color: "#F46800" },
  { name: "Jenkins", Icon: SiJenkins, color: "#D33833" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Ansible", Icon: SiAnsible, color: "#EE0000" },
  { name: "NGINX", Icon: SiNginx, color: "#009639" },
  { name: "Istio", Icon: SiIstio, color: "#466BB0" },
  { name: "SonarQube", Icon: FaShieldAlt, color: "#4E9BCD" },
  { name: "GitLab CI", Icon: SiGitlab, color: "#FC6D26" },
];

export const STATS = [
  { label: "Years of Experience", value: 5, suffix: "+" },
  { label: "Microservices Delivered", value: 60, suffix: "+" },
  { label: "CI/CD Pipelines", value: 40, suffix: "+" },
  { label: "Faster Releases", value: 45, suffix: "%" },
  { label: "Cloud Cost Reduction", value: 30, suffix: "%" },
  { label: "Production Availability", value: 99.9, suffix: "%" },
];

export interface SkillGroup { title: string; icon: IconType; items: string[] }

export const SKILLS: SkillGroup[] = [
  { title: "Cloud", icon: FaCloud, items: ["AWS", "EKS", "EC2", "S3", "IAM", "VPC", "Lambda", "RDS", "Route53", "ALB", "CloudWatch", "Azure"] },
  { title: "Containers", icon: SiDocker, items: ["Docker", "Kubernetes", "EKS", "Helm", "Docker Compose", "Karpenter", "HPA", "Cluster Autoscaler"] },
  { title: "Infrastructure as Code", icon: SiTerraform, items: ["Terraform", "Terraform Modules", "Ansible Playbooks", "Ansible Roles", "Dynamic Inventory"] },
  { title: "CI/CD", icon: SiGithubactions, items: ["GitHub Actions", "GitLab CI", "Jenkins", "Argo CD", "Blue-Green", "Canary"] },
  { title: "Security · DevSecOps", icon: FaShieldAlt, items: ["SonarQube", "Trivy", "Snyk", "Checkov", "OWASP ZAP", "GitHub Advanced Security", "Vault", "IRSA", "RBAC", "OIDC"] },
  { title: "Observability", icon: SiGrafana, items: ["Prometheus", "Grafana", "Datadog", "CloudWatch", "ELK Stack", "Alertmanager", "Loki"] },
  { title: "Networking · Mesh", icon: SiIstio, items: ["NGINX Ingress", "Istio", "AWS ALB", "Route53", "SSL/TLS", "VPC Peering"] },
  { title: "Automation · Scripting", icon: SiPython, items: ["Python", "Bash", "Shell", "YAML"] },
  { title: "Databases", icon: SiPostgresql, items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "DynamoDB"] },
];

export interface Experience { role: string; company: string; period: string; bullets: string[] }

export const EXPERIENCE: Experience[] = [
  {
    role: "DevSecOps Engineer",
    company: "ASICS Technologies, India",
    period: "Jul 2024 — Present",
    bullets: [
      "Designed a GitOps platform using GitLab CI/CD, Argo CD, and Amazon EKS for 20+ microservices, reducing release time by 45%.",
      "Implemented DevSecOps security gates across SAST, SCA, IaC, container, and DAST scanning, embedding security throughout the software delivery lifecycle.",
      "Optimized EKS workloads with HPA, KEDA, Cluster Autoscaler, and Karpenter, reducing AWS compute costs by 30%.",
      "Hardened Kubernetes with RBAC, IRSA, Vault, Kyverno, and Istio, enforcing least-privilege access and secure service-to-service communication.",
      "Engineered observability and centralized logging with ELK, Datadog, and Alertmanager, reducing MTTR by 50%.",
      "Built AI-powered DevOps automation using LLMs, RAG, and Python for incident analysis and human-approved remediation.",
    ],
  },
  {
    role: "DevOps Engineer",
    company: "Larsen & Toubro (L&T), India",
    period: "AUG 2021 — JUL 2024",
    bullets: [
      "Built and maintained CI/CD pipeline for 40+ microservices using GitHub Actions and Argo CD, improving release velocity.",
      "Integrated SonarQube, Trivy, SAST, dependency, and container scanning into pipelines, strengthening application security.",
      "Containerized application services using Docker multi-stage builds, reducing image sizes by 60% and improving build efficiency.",
      "Provisioned AWS infrastructure across EC2, S3, VPC, and IAM using Terraform, accelerating infrastructure delivery by 80%.",
      "Deployed and operated microservices on Kubernetes, standardizing application delivery with reusable Helm charts across environments.",
    ],
  },
  {
    role: "Cloud Support Associate",
    company: "Larsen & Toubro (L&T), India",
    period: "SEP 2021 — JUL 2022",
    bullets: [
      "Provided L1/L2 support for AWS and Azure production infrastructure, troubleshooting Compute, Networking, Storage, Connectivity, and performance issues. ",
      "Managed AWS IAM, Azure RBAC, MFA, and access controls, enforcing least-privilege security practices.",
      "Managed backup and recovery operations using EBS Snapshots, S3, Azure Backup, and Recovery Services Vault.",
      "Automated cloud operations using AWS Lambda, Azure Automation, Bash, Python, And AWS/Azure CLI, reducing manual operational effort.",
      "Reduced AWS and Azure cloud costs by 30% through right-sizing, usage analysis, and automated resource shutdown.",
    ],
  },
];

export interface Project {
  title: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string[];
  tech: string[];
  categories: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "Cloud-Native Trading & Portfolio Platform",
    summary: "Production-grade DevSecOps and GitOps platform supporting 20+ microservices, with automated deployments, integrated security controls, and production observability.",
    problem: "The trading platform required high availability, zero-downtime deployments, secure software delivery, and reliable Kubernetes operations across multiple environments.",
    solution: "Built and operated AWS EKS infrastructure using Terraform and automated CI/CD workflows with GitHub Actions, Argo CD, and Helm. Integrated security scanning using Checkmarx One, SonarQube, Snyk, Gitleaks, Trivy, and Checkov. Implemented SBOM generation with Syft, container image signing with Cosign, Istio service mesh, and observability using Datadog and Prometheus. Leveraged AI-assisted incident analysis to accelerate troubleshooting and root cause identification, achieving a 40% reduction in incident investigation time.",
    impact: [
      "45% faster releases",
      "99.9% production availability",
      "50% reduction in MTTR",
      "40% reduction in incident investigation time through AI-assisted analysis",
    ],
    tech: ["AWS", "EKS", "Kubernetes", "Terraform", "GitHub Actions", "Argo CD", "Helm", "Istio", "Checkmarx One", "SonarQube", "Trivy", "Syft", "Cosign", "Datadog", "Prometheus", "Python", "LLMs", "RAG"],
    categories: ["AWS", "Kubernetes", "Terraform", "GitOps", "DevSecOps", "Platform Engineering", "CI/CD"],
  },
  {
    title: "IoT Smart Devices — Real-Time Monitoring",
    summary: "Secure and scalable DevOps platform supporting an IoT-connected smart device ecosystem.",
    problem: "Supported 40+ microservices across Development, QA, and Production, requiring standardized CI/CD workflows, consistent deployments, secure delivery, and scalable cloud infrastructure.",
    solution: "Designed and implemented standardized CI/CD and GitOps workflows using GitHub Actions and Argo CD for automated deployments across 40+ microservices. Developed reusable Terraform modules to provision AWS infrastructure, reducing provisioning time by 80%, and automated Linux configuration management using Ansible. Optimized Docker images through multi-stage builds, reducing image footprint by 60%, and implemented Kubernetes monitoring using Prometheus, Grafana, and AWS CloudWatch for proactive alerting and improved operational visibility.",
    impact: [
      "40+ microservices supported",
      "60% reduction in Docker image size",
      "80% faster infrastructure provisioning",
      "30% improvement in cloud cost efficiency",
    ],
    tech: ["AWS", "Azure", "Kubernetes", "EKS/AKS", "Docker", "Helm", "Terraform", "Ansible", "GitHub Actions", "Argo CD", "Trivy", "Prometheus", "Grafana"],
    categories: ["Kubernetes", "CI/CD", "GitOps", "Infrastructure as Code", "Monitoring"],
  },
];

export const PROJECT_FILTERS = [
  "All", "AWS", "Kubernetes", "Terraform", "DevSecOps",
  "CI/CD", "GitOps", "Infrastructure as Code", "Monitoring",
];

export const CERTIFICATIONS = [
  { name: "CKA — Kubernetes Administrator", issuer: "CNCF / Linux Foundation", tag: "Kubernetes", accent: "#326CE5" },
  { name: "CKS — Kubernetes Security", issuer: "CNCF / Linux Foundation", tag: "Security", accent: "#22c55e" },
];

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#pipeline", label: "Pipeline" },
  { href: "#ops-center", label: "K8s Ops" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact", label: "Contact" },
];

