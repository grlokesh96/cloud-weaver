import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { PIPELINE_STAGES } from "./pipeline-data";

describe("requested pipeline additions", () => {
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
    assert.deepEqual(stage?.tools.map(tool => tool.name), ["Infracost", "Kubecost", "OpenCost"]);
  });

  test("ends with Notifications followed by AIOps and its requested tools", () => {
    assert.deepEqual(PIPELINE_STAGES.slice(-2).map(stage => stage.name), [
      "Notifications", "AIOps & Self-Healing",
    ]);
    const stage = PIPELINE_STAGES.find(item => item.id === "aiops");
    assert.deepEqual(stage?.categories, ["Observability", "Cloud"]);
    assert.deepEqual(stage?.tools.map(tool => tool.name), [
      "Robusta", "PagerDuty Runbook Automation", "AWS Systems Manager Automation",
    ]);
  });
});