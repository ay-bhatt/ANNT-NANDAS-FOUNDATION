export type MediaRange = {
  type: string;
  subtype: string;
  q: number;
  specificity: number;
};

function specificity(type: string, subtype: string): number {
  if (type === "*" && subtype === "*") return 1;
  if (subtype === "*") return 2;
  return 3;
}

export function parseAccept(header: string | null | undefined): MediaRange[] {
  if (!header || !header.trim()) {
    return [{ type: "*", subtype: "*", q: 1, specificity: 1 }];
  }

  const ranges: MediaRange[] = [];

  for (const part of header.split(",")) {
    const [rawType, ...params] = part.trim().split(";").map((item) => item.trim());
    if (!rawType) continue;

    const [type, subtype] = rawType.toLowerCase().split("/");
    if (!type || !subtype) continue;

    let q = 1;
    for (const param of params) {
      const [key, value] = param.split("=").map((item) => item.trim());
      if (key === "q" && value) {
        const parsed = Number.parseFloat(value);
        if (!Number.isNaN(parsed)) {
          q = Math.min(1, Math.max(0, parsed));
        }
      }
    }

    ranges.push({
      type,
      subtype,
      q,
      specificity: specificity(type, subtype),
    });
  }

  return ranges.sort((a, b) => b.q - a.q || b.specificity - a.specificity);
}

function qualityFor(ranges: MediaRange[], type: string, subtype: string): number {
  let best = -1;

  for (const range of ranges) {
    const typeMatch = range.type === "*" || range.type === type;
    const subtypeMatch = range.subtype === "*" || range.subtype === subtype;
    if (!typeMatch || !subtypeMatch) continue;
    if (range.q > best) best = range.q;
  }

  return best;
}

export function prefersMarkdown(header: string | null | undefined): boolean {
  const ranges = parseAccept(header);
  const markdownQ = Math.max(
    qualityFor(ranges, "text", "markdown"),
    qualityFor(ranges, "text", "x-markdown"),
    qualityFor(ranges, "application", "markdown"),
  );
  const htmlQ = Math.max(
    qualityFor(ranges, "text", "html"),
    qualityFor(ranges, "application", "xhtml+xml"),
  );

  if (markdownQ <= 0 && htmlQ <= 0) return false;
  if (markdownQ <= 0) return false;
  if (htmlQ < 0) return markdownQ > 0;
  return markdownQ > htmlQ;
}


