import {
  SiKubernetes, SiDocker, SiTerraform, SiGithub, SiGit, SiArgo, SiHelm,
  SiPrometheus, SiGrafana, SiJenkins, SiPython, SiAnsible, SiNginx, SiIstio,
  SiGitlab, SiGithubactions, SiSonarqubeserver, SiJfrog, SiSonatype, SiTrivy,
  SiSnyk, SiOwasp, SiVault, SiDatadog, SiElasticstack, SiOpentelemetry,
  SiGnubash, SiYaml, SiPaloaltonetworks,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import type { IconType } from "react-icons";

/**
 * Centralized Skills & Technologies config.
 * - `icon` omitted → monogram fallback tile (`mono` or first two letters).
 * - `color` omitted → uses the theme foreground (for near-black brand marks).
 */
export interface Tech {
  name: string;
  icon?: IconType;
  color?: string;
  mono?: string;
  url?: string;
  label?: string;
}

export interface TechCategory { id: string; title: string; tools: Tech[] }

const AWS = "#FF9900";
const AZURE = "#0089D6";
const K8S = "#326CE5";

export const SKILL_CATEGORIES: TechCategory[] = [
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    tools: [
      { name: "AWS", icon: FaAws, color: AWS, url: "https://aws.amazon.com" },
      { name: "Azure", icon: VscAzure, color: AZURE, label: "Microsoft Azure" },
      { name: "EC2", icon: FaAws, color: AWS, label: "Amazon EC2" },
      { name: "EKS", icon: FaAws, color: AWS, label: "Amazon EKS" },
      { name: "S3", icon: FaAws, color: AWS, label: "Amazon S3" },
      { name: "IAM", icon: FaAws, color: AWS, label: "AWS IAM" },
      { name: "VPC", icon: FaAws, color: AWS, label: "Amazon VPC" },
      { name: "Lambda", icon: FaAws, color: AWS, label: "AWS Lambda" },
      { name: "ECR", icon: FaAws, color: AWS, label: "Amazon ECR" },
      { name: "RDS", icon: FaAws, color: AWS, label: "Amazon RDS" },
      { name: "CloudWatch", icon: FaAws, color: AWS, label: "AWS CloudWatch" },
      { name: "AKS", icon: VscAzure, color: AZURE, label: "Azure AKS" },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD & GitOps",
    tools: [
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Jenkins", icon: SiJenkins, color: "#D33833" },
      { name: "GitLab CI/CD", icon: SiGitlab, color: "#FC6D26" },
      { name: "Argo CD", icon: SiArgo, color: "#EF7B4D" },
      { name: "SonarQube", icon: SiSonarqubeserver, color: "#4E9BCD" },
      { name: "JFrog Artifactory", icon: SiJfrog, color: "#40BE46" },
      { name: "Nexus Repository", icon: SiSonatype, color: "#1B8A5A" },
      { name: "Git", icon: SiGit, color: "#F05033" },
      { name: "GitHub", icon: SiGithub },
      { name: "GitOps", icon: SiArgo, color: "#EF7B4D" },
    ],
  },
  {
    id: "containers",
    title: "Containers & Orchestration",
    tools: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: K8S },
      { name: "Helm", icon: SiHelm, color: "#277A9F" },
      { name: "Karpenter", mono: "KP", color: AWS },
      { name: "Istio", icon: SiIstio, color: "#466BB0" },
      { name: "NGINX", icon: SiNginx, color: "#009639" },
      { name: "Kubernetes HPA", icon: SiKubernetes, color: K8S },
      { name: "Cluster Autoscaler", icon: SiKubernetes, color: K8S },
      { name: "Docker Hub", icon: SiDocker, color: "#2496ED" },
      { name: "Amazon ECR", icon: FaAws, color: AWS },
    ],
  },
  {
    id: "security",
    title: "DevSecOps & Security",
    tools: [
      { name: "Trivy", icon: SiTrivy, color: "#1904DA" },
      { name: "Checkov", icon: SiPaloaltonetworks, color: "#FA582D" },
      { name: "Semgrep", mono: "SG", color: "#2FD381" },
      { name: "Gitleaks", mono: "GL", color: "#E5484D" },
      { name: "Snyk", icon: SiSnyk, color: "#9B7BFF" },
      { name: "OWASP ZAP", icon: SiOwasp },
      { name: "SonarQube", icon: SiSonarqubeserver, color: "#4E9BCD" },
      { name: "Syft", mono: "SY", color: "#4AA8FF" },
      { name: "Cosign", mono: "CS", color: "#F59E0B" },
      { name: "HashiCorp Vault", icon: SiVault, color: "#FFD814" },
      { name: "AWS Secrets Manager", icon: FaAws, color: AWS },
      { name: "IAM & RBAC", icon: SiKubernetes, color: K8S },
    ],
  },
  {
    id: "observability",
    title: "Observability & Automation",
    tools: [
      { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
      { name: "Grafana", icon: SiGrafana, color: "#F46800" },
      { name: "Datadog", icon: SiDatadog, color: "#A07BE8" },
      { name: "ELK Stack", icon: SiElasticstack, color: "#00BFB3" },
      { name: "OpenTelemetry", icon: SiOpentelemetry, color: "#F5A800" },
      { name: "AWS CloudWatch", icon: FaAws, color: AWS },
      { name: "Python", icon: SiPython, color: "#4B8BBE" },
      { name: "Boto3", mono: "B3", color: AWS },
      { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
      { name: "Terraform", icon: SiTerraform, color: "#844FBA" },
      { name: "Ansible", icon: SiAnsible, color: "#EE3333" },
      { name: "YAML", icon: SiYaml, color: "#CB171E" },
    ],
  },
];
