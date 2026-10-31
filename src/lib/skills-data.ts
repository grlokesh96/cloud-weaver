import {
  SiKubernetes, SiDocker, SiTerraform, SiGithub, SiGit, SiArgo, SiHelm,
  SiPrometheus, SiGrafana, SiJenkins, SiPython, SiAnsible, SiNginx, SiIstio,
  SiGitlab, SiGithubactions, SiSonarqubeserver, SiSonatype, SiTrivy,
  SiSnyk, SiOwasp, SiVault, SiDatadog, SiElasticstack, SiOpentelemetry,
  SiGnubash, SiPaloaltonetworks, SiPodman, SiJfrog,
  SiAnthropic, SiClaude, SiLangchain, SiFastapi, SiGoogle, SiModelcontextprotocol,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzureDevops, VscTerminalPowershell } from "react-icons/vsc";
import { SiLinux } from "react-icons/si";
import type { IconType } from "react-icons";
const awsEc2 = { url: "/tech/aws-ec2.svg" };
const awsEks = { url: "/tech/aws-eks.svg" };
const awsS3 = { url: "/tech/aws-s3.svg" };
const awsIam = { url: "/tech/aws-iam.svg" };
const awsVpc = { url: "/tech/aws-vpc.svg" };
const awsLambda = { url: "/tech/aws-lambda.svg" };
const awsEcr = { url: "/tech/aws-ecr.svg" };
const awsRds = { url: "/tech/aws-rds.svg" };
const awsCloudwatch = { url: "/tech/aws-cloudwatch.svg" };
const azureLogo = { url: "/tech/azure.svg" };
const azureAks = { url: "/tech/azure-aks.svg" };
const azureRbac = { url: "/tech/azure-rbac.svg" };
const awsSecretsManager = { url: "/tech/aws-secrets-manager.svg" };

/**
 * Centralized Skills & Technologies config.
 * - `img` → official brand/service SVG (AWS Architecture Icons, Microsoft Azure icons).
 * - `icon` omitted → monogram fallback tile (`mono` or first two letters).
 * - `color` omitted → uses the theme foreground (for near-black brand marks).
 */
export interface Tech {
  name: string;
  icon?: IconType;
  img?: string;
  color?: string;
  mono?: string;
  url?: string;
  label?: string;
}

/** `splitAt` → tools before this index render in one block, the rest start on a new row. */
export interface TechCategory { id: string; title: string; tools: Tech[]; splitAt?: number }

const AWS = "#FF9900";
const K8S = "#326CE5";

export const SKILL_CATEGORIES: TechCategory[] = [
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    tools: [
      { name: "AWS", icon: FaAws, color: AWS, url: "https://aws.amazon.com" },
      { name: "EC2", img: awsEc2.url, label: "Amazon EC2" },
      { name: "EKS", img: awsEks.url, label: "Amazon EKS" },
      { name: "S3", img: awsS3.url, label: "Amazon S3" },
      { name: "IAM", img: awsIam.url, label: "AWS IAM" },
      { name: "VPC", img: awsVpc.url, label: "Amazon VPC" },
      { name: "Lambda", img: awsLambda.url, label: "AWS Lambda" },
      { name: "RDS", img: awsRds.url, label: "Amazon RDS" },
      { name: "Route 53", img: "/tech/aws-route53.svg", label: "Amazon Route 53" },
      { name: "WAF", img: "/tech/aws-waf.svg", label: "AWS WAF" },
      { name: "DynamoDB", img: "/tech/aws-dynamodb.svg", label: "Amazon DynamoDB" },
      { name: "Secrets Manager", img: awsSecretsManager.url, label: "AWS Secrets Manager" },
      { name: "CloudTrail", img: "/tech/aws-cloudtrail.svg", label: "AWS CloudTrail" },
      { name: "AWS Cost Explorer", img: "/tech/aws-cost-explorer.svg" },
      { name: "AWS CLI", img: "/tech/aws-cli.svg", label: "AWS Command Line Interface" },
      { name: "Azure", img: azureLogo.url, label: "Microsoft Azure" },
      { name: "Azure VMs", img: "/tech/azure-vm.svg", label: "Azure Virtual Machines" },
      { name: "AKS", img: azureAks.url, label: "Azure AKS" },
      { name: "Entra ID", img: "/tech/azure-entra.svg", label: "Microsoft Entra ID" },
      { name: "VNets", img: "/tech/azure-vnet.svg", label: "Azure Virtual Networks" },
      { name: "Azure RBAC", img: azureRbac.url, label: "Azure Role-Based Access Control" },
      { name: "Azure Cost Management", img: "/tech/azure-cost-management.svg", label: "Azure Cost Management" },
      { name: "Azure Activity Log", img: "/tech/azure-activity-log.svg" },
      { name: "Azure CLI", img: "/tech/azure-cli.svg", label: "Azure Command-Line Interface" },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD & GitOps",
    tools: [
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Jenkins", icon: SiJenkins, color: "#D33833" },
      { name: "Azure DevOps", icon: VscAzureDevops, color: "#0078D4" },
      { name: "GitLab CI/CD", icon: SiGitlab, color: "#FC6D26" },
      { name: "Argo CD", icon: SiArgo, color: "#EF7B4D" },
      { name: "Git", icon: SiGit, color: "#F05033" },
      { name: "GitHub", icon: SiGithub },
      { name: "JFrog Artifactory", icon: SiJfrog, color: "#40BE46" },
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
      { name: "AWS Load Balancer", img: "/tech/aws-elb.svg", label: "AWS Elastic Load Balancing" },
      { name: "NGINX", icon: SiNginx, color: "#009639" },
      { name: "Kubernetes HPA", icon: SiKubernetes, color: K8S },
      { name: "Cluster Autoscaler", icon: SiKubernetes, color: K8S },
      { name: "Amazon ECR", img: awsEcr.url },
      { name: "Azure ACR", img: "/tech/azure-acr.svg", label: "Azure Container Registry" },
      { name: "Podman", icon: SiPodman, color: "#A78BFA" },
      { name: "AWS Fargate", img: "/tech/aws-fargate.svg" },
      { name: "Azure Container Apps", img: "/tech/azure-container-apps.svg" },
      { name: "Application Gateway", img: "/tech/azure-app-gateway.svg", label: "Azure Application Gateway" },
      { name: "KEDA", img: "/tech/keda.svg", label: "Kubernetes Event-driven Autoscaling" },
    ],
  },
  {
    id: "security",
    title: "DevSecOps & Security",
    tools: [
      { name: "Trivy", icon: SiTrivy, color: "#5B6CFF" },
      { name: "Checkov", icon: SiPaloaltonetworks, color: "#FA582D" },
      { name: "Semgrep", mono: "SG", color: "#2FD381" },
      { name: "Gitleaks", mono: "GL", color: "#E5484D" },
      { name: "Snyk", icon: SiSnyk, color: "#9B7BFF" },
      { name: "OWASP ZAP", icon: SiOwasp },
      { name: "SonarQube", icon: SiSonarqubeserver, color: "#4E9BCD" },
      { name: "Syft", mono: "SY", color: "#4AA8FF" },
      { name: "Cosign", mono: "CS", color: "#F59E0B" },
      { name: "HashiCorp Vault", icon: SiVault, color: "#FFD814" },
      { name: "Kyverno", img: "/tech/kyverno.svg" },
      { name: "OPA Gatekeeper", img: "/tech/opa.svg", label: "Open Policy Agent Gatekeeper" },
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
      { name: "Alertmanager", icon: SiPrometheus, color: "#E6522C", label: "Prometheus Alertmanager" },
      { name: "Loki", img: "/tech/loki.png", label: "Grafana Loki" },
      { name: "OpenTelemetry", icon: SiOpentelemetry, color: "#F5A800" },
      { name: "AWS CloudWatch", img: awsCloudwatch.url },
      { name: "Azure Monitor", img: "/tech/azure-monitor.svg" },
      { name: "Python", icon: SiPython, color: "#4B8BBE" },
      { name: "PowerShell", icon: VscTerminalPowershell, color: "#5391FE" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Boto3", mono: "B3", color: AWS },
      { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
      { name: "Terraform", icon: SiTerraform, color: "#844FBA" },
      { name: "Terragrunt", img: "/tech/terragrunt.svg" },
      { name: "Ansible", icon: SiAnsible, color: "#EE3333" },
    ],
  },
  {
    id: "ai",
    title: "AI & AIOps",
    tools: [
      { name: "LLMs", icon: SiAnthropic, color: "#D97757", label: "Large Language Models" },
      { name: "RAG", icon: SiLangchain, color: "#1C9A8C", label: "Retrieval-Augmented Generation" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "Google ADK", icon: SiGoogle, color: "#4285F4", label: "Google Agent Development Kit" },
      { name: "MCP", icon: SiModelcontextprotocol, label: "Model Context Protocol" },
      { name: "Amazon Bedrock", img: "/tech/aws-bedrock.svg" },
      { name: "Kiro CLI", img: "/tech/kiro.svg" },
      { name: "Claude", icon: SiClaude, color: "#D97757" },
    ],
  },
];
