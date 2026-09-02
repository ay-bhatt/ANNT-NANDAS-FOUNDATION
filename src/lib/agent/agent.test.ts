import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { prefersMarkdown } from "./accept";
import { VARY_ACCEPT } from "./headers";
import { founderJsonLd, organizationJsonLd } from "./jsonld";
import { renderAgentInstructions, renderLlmsTxt } from "./llms-txt";
import { negotiate } from "./negotiate";
import { renderNotFoundMarkdown, renderPageMarkdown, TRUST_PAGE_PATHS, visibleCharacterCount } from "./pages";
import { markdownUrlFor, PAGE_PATHS } from "./site";

describe("Accept negotiation", () => {
  it("prefers markdown when Accept is text/markdown", () => {
    assert.equal(prefersMarkdown("text/markdown"), true);
  });

  it("prefers HTML for browsers and bare curl", () => {
    assert.equal(prefersMarkdown("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"), false);
    assert.equal(prefersMarkdown("*/*"), false);
    assert.equal(prefersMarkdown(null), false);
  });

  it("prefers markdown when it outranks HTML", () => {
    assert.equal(prefersMarkdown("text/markdown, text/html;q=0.9"), true);
  });

  it("does not prefer markdown when q=0", () => {
    assert.equal(prefersMarkdown("text/markdown;q=0, text/html"), false);
  });
});

describe("Markdown documents", () => {
  it("serves llms.txt with when-to-use guidance", () => {
    const result = negotiate({ pathname: "/llms.txt", accept: "*/*" });
    assert.equal(result.kind, "document");
    if (result.kind !== "document") return;
    assert.equal(result.status, 200);
    assert.match(result.headers.Vary, /Accept/);
    assert.match(result.body, /^# ANNT NANDAS FOUNDATION/m);
    assert.match(result.body, /> Himalayan Section 8 non-profit/);
    assert.match(result.body, /## When to use this/);
    assert.match(result.body, /How an agent should call this site/);
    assert.equal(renderLlmsTxt(), result.body);
  });

  it("serves dedicated agent instructions", () => {
    const result = negotiate({ pathname: "/agent-instructions", accept: "text/html" });
    assert.equal(result.kind, "document");
    if (result.kind !== "document") return;
    assert.match(result.body, /When to use this/);
    assert.equal(result.body, renderAgentInstructions());
  });

  it("returns markdown for the canonical homepage", () => {
    const result = negotiate({ pathname: "/", accept: "text/markdown" });
    assert.equal(result.kind, "document");
    if (result.kind !== "document") return;
    assert.equal(result.status, 200);
    assert.equal(result.contentType, "text/markdown; charset=utf-8");
    assert.equal(result.headers.Vary, VARY_ACCEPT);
    assert.match(result.body, /^# ANNT NANDAS FOUNDATION/m);
    assert.match(result.body, /^## What we do/m);
    assert.ok(visibleCharacterCount(result.body) >= 500);
  });

  it("returns markdown for .md URLs without an Accept header", () => {
    const result = negotiate({ pathname: "/about.md", accept: "text/html" });
    assert.equal(result.kind, "document");
    if (result.kind !== "document") return;
    assert.equal(result.status, 200);
    assert.match(result.body, /^# About ANNT NANDAS FOUNDATION/m);
  });
});

describe("Agent-friendly 404s", () => {
  it("returns HTTP 404 markdown for unknown paths", () => {
    const result = negotiate({
      pathname: "/some-path-that-does-not-exist",
      accept: "text/markdown",
    });
    assert.equal(result.kind, "document");
    if (result.kind !== "document") return;
    assert.equal(result.status, 404);
    assert.equal(result.contentType, "text/markdown; charset=utf-8");
    assert.equal(result.headers.Vary, VARY_ACCEPT);
    assert.match(result.body, /^# 404 Not Found/m);
    assert.match(result.body, /llms\.txt/);
    assert.match(result.body, /sitemap\.xml/);
    assert.equal(result.body, renderNotFoundMarkdown("/some-path-that-does-not-exist"));
  });

  it("does not treat unknown HTML paths as 200 documents", () => {
    const result = negotiate({
      pathname: "/some-path-that-does-not-exist",
      accept: "text/html",
    });
    assert.equal(result.kind, "passthrough");
    if (result.kind !== "passthrough") return;
    assert.equal(result.headers.Vary, VARY_ACCEPT);
    assert.match(result.headers["X-Robots-Tag"] ?? "", /noindex/);
  });
});

describe("Trust anchors and JSON-LD", () => {
  it("publishes about, contact, and privacy with 500+ characters", () => {
    for (const path of TRUST_PAGE_PATHS) {
      const markdown = renderPageMarkdown(path);
      assert.ok(markdown, `missing markdown for ${path}`);
      assert.ok(visibleCharacterCount(markdown ?? "") >= 500, `${path} is too short`);
    }
    assert.ok((PAGE_PATHS as readonly string[]).includes("/privacy"));
  });

  it("adds Person url, sameAs, and jobTitle plus Organization url and sameAs", () => {
    assert.equal(founderJsonLd["@type"], "Person");
    assert.ok(founderJsonLd.url.endsWith("/about"));
    assert.equal(founderJsonLd.jobTitle, "Founder, Mentor & Ultra Trail Runner");
    assert.ok(founderJsonLd.sameAs.length >= 1);
    assert.equal(organizationJsonLd.url.includes("anntnandasfoundation.com"), true);
    assert.ok(organizationJsonLd.sameAs.length >= 1);
    assert.equal(organizationJsonLd["@type"], "NGO");
  });

  it("exposes markdown alternate paths for public pages", () => {
    assert.equal(markdownUrlFor("/"), "/index.md");
    assert.equal(markdownUrlFor("/privacy"), "/privacy.md");
  });
});
