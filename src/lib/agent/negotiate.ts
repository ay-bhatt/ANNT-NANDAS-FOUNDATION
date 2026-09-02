import { prefersMarkdown } from "./accept";
import { documentHeaders, MARKDOWN_CONTENT_TYPE, negotiationHeaders, notFoundHeaders } from "./headers";
import { renderAgentInstructions, renderLlmsTxt } from "./llms-txt";
import { renderNotFoundMarkdown, renderPageMarkdown } from "./pages";
import {
  hasPassthroughExtension,
  isDocumentPath,
  isKnownPage,
  markdownPathToPage,
  normalizePath,
} from "./site";

export type NegotiateInput = {
  pathname: string;
  accept: string | null | undefined;
};

export type NegotiateResult =
  | {
      kind: "document";
      status: number;
      body: string;
      contentType: string;
      headers: Record<string, string>;
    }
  | {
      kind: "passthrough";
      headers: Record<string, string>;
    };

export function negotiate({ pathname, accept }: NegotiateInput): NegotiateResult {
  const path = normalizePath(pathname);

  if (path === "/llms.txt" || path === "/agent-instructions") {
    const body = path === "/llms.txt" ? renderLlmsTxt() : renderAgentInstructions();
    return {
      kind: "document",
      status: 200,
      body,
      contentType: MARKDOWN_CONTENT_TYPE,
      headers: documentHeaders(),
    };
  }

  if (hasPassthroughExtension(path)) {
    return {
      kind: "passthrough",
      headers: { Vary: "Accept, Accept-Encoding" },
    };
  }

  const markdownPage = markdownPathToPage(path);
  const isMarkdownUrl = markdownPage !== null;
  const pagePath = markdownPage ?? path;
  const wantsMarkdown = isMarkdownUrl || prefersMarkdown(accept);

  if (wantsMarkdown) {
    if (isKnownPage(pagePath)) {
      const body = renderPageMarkdown(pagePath) ?? renderNotFoundMarkdown(pagePath);
      return {
        kind: "document",
        status: 200,
        body,
        contentType: MARKDOWN_CONTENT_TYPE,
        headers: negotiationHeaders(pagePath),
      };
    }

    return {
      kind: "document",
      status: 404,
      body: renderNotFoundMarkdown(path),
      contentType: MARKDOWN_CONTENT_TYPE,
      headers: notFoundHeaders(),
    };
  }

  if (isKnownPage(pagePath) || isDocumentPath(pagePath)) {
    return {
      kind: "passthrough",
      headers: negotiationHeaders(pagePath),
    };
  }

  return {
    kind: "passthrough",
    headers: notFoundHeaders(),
  };
}
