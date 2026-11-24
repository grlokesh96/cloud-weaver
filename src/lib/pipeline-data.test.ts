import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { PIPELINE_STAGES } from "./pipeline-data";

describe("requested pipeline additions", () => {
  test("places Google GCR immediately after Azure ACR in Artifact Registry", () => {
    const stage = PIPELINE_STAGES.find(item => item.id === "registry");
    assert.deepEqual(stage?.tools.map(tool => tool.name), [
      "Amazon ECR", "Azure ACR", "Google GCR", "Docker Hub", "GitHub Packages", "JFrog", "Harbor",
    ]);
  });
  test("has 24 stages with unique identifiers", () => {
    assert.equal(PIPELINE_STAGES.length, 24);
    assert.equal(new Set(PIPELINE_STAGES.map(stage => stage.id)).size, 24);
  });

  test("places FinOps immediately after IaC Security and before Container Security", () => {
    assert.deepEqual(PIPELINE_STAGES.slice(10, 13).map(stage => stage.name), [
      "IaC Security", "FinOps & Cost Estimation", "Container Security",
    ]);
    const stage = PIPELINE_STAGES.find(item => item.id === "finops");
    assert.deepEqual(stage?.categories, ["Infrastructure", "Cloud"]);
    assert.deepEqual(stage?.tools.map(tool => tool.name), ["Infracost", "Kubecost", "OpenCost", "CAST AI"]);
  });

  test("includes CAST AI exactly once in FinOps with its local logo", () => {
    const placements = PIPELINE_STAGES.flatMap(stage =>
      stage.tools.filter(tool => tool.name === "CAST AI").map(tool => ({ stage: stage.id, logo: tool.img }))
    );
    assert.deepEqual(placements, [{ stage: "finops", logo: "/tech/cast-ai.svg" }]);
  });

  test("ends with Notifications followed by AIOps and its requested tools", () => {
    assert.deepEqual(PIPELINE_STAGES.slice(-2).map(stage => stage.name), [
      "Notifications", "AIOps & Self-Healing",
    ]);
    const stage = PIPELINE_STAGES.find(item => item.id === "aiops");
    assert.deepEqual(stage?.categories, ["Observability", "Cloud"]);
    assert.deepEqual(stage?.tools.map(tool => tool.name), [
      "Robusta", "incident.io", "PagerDuty Runbook Automation", "AWS Systems Manager Automation",
    ]);
  });
});