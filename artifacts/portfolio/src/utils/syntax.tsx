import { ReactNode } from "react";

interface Token {
  text: string;
  color: string;
}

const COLORS = {
  keyword:  "#FF3B30",
  string:   "#98C379",
  comment:  "#5C6370",
  number:   "#D19A66",
  tag:      "#E06C75",
  attr:     "#D19A66",
  value:    "#98C379",
  selector: "#E5C07B",
  property: "#61AFEF",
  punct:    "#ABB2BF",
  fn:       "#61AFEF",
  default:  "#ABB2BF",
  type:     "#E5C07B",
};

function tokenizeJS(line: string): Token[] {
  const tokens: Token[] = [];
  const keywords = /\b(const|let|var|function|return|if|else|for|while|class|import|export|default|from|new|this|typeof|async|await|try|catch|throw|extends|true|false|null|undefined|=>|of|in)\b/g;

  let remaining = line;
  let match: RegExpExecArray | null;

  // Single-line comment
  const commentIdx = remaining.indexOf("//");
  let commentSuffix = "";
  if (commentIdx !== -1) {
    commentSuffix = remaining.slice(commentIdx);
    remaining = remaining.slice(0, commentIdx);
  }

  // Tokenize the non-comment part by splitting on strings and keywords
  const parts = remaining.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g);
  for (const part of parts) {
    if ((part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) && part.length > 1) {
      tokens.push({ text: part, color: COLORS.string });
    } else {
      // Find keywords inside the part
      let last = 0;
      const regex = /\b(const|let|var|function|return|if|else|for|while|class|import|export|default|from|new|this|typeof|async|await|try|catch|throw|extends|true|false|null|undefined)\b/g;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(part)) !== null) {
        if (m.index > last) tokens.push({ text: part.slice(last, m.index), color: COLORS.default });
        tokens.push({ text: m[0], color: COLORS.keyword });
        last = m.index + m[0].length;
      }
      if (last < part.length) tokens.push({ text: part.slice(last), color: COLORS.default });
    }
  }

  if (commentSuffix) {
    tokens.push({ text: commentSuffix, color: COLORS.comment });
  }

  return tokens;
}

function tokenizeHTML(line: string): Token[] {
  const tokens: Token[] = [];

  // Comments
  if (line.trim().startsWith("<!--")) {
    return [{ text: line, color: COLORS.comment }];
  }

  // Split by tags
  const parts = line.split(/(<\/?[a-zA-Z][^>]*>)/g);
  for (const part of parts) {
    if (/^<\/?[a-zA-Z]/.test(part)) {
      // It's a tag — split into tag name, attributes
      const tagMatch = part.match(/^(<\/?)([a-zA-Z0-9-]+)(.*?)(\/?>)$/s);
      if (tagMatch) {
        tokens.push({ text: tagMatch[1], color: COLORS.punct });
        tokens.push({ text: tagMatch[2], color: COLORS.tag });
        // attributes
        const attrStr = tagMatch[3];
        const attrParts = attrStr.split(/(=["'][^"']*["']|=\{[^}]*\})/g);
        for (const ap of attrParts) {
          if (ap.startsWith('="') || ap.startsWith("='") || ap.startsWith("={")) {
            tokens.push({ text: ap, color: COLORS.value });
          } else {
            tokens.push({ text: ap, color: COLORS.attr });
          }
        }
        tokens.push({ text: tagMatch[4], color: COLORS.punct });
      } else {
        tokens.push({ text: part, color: COLORS.tag });
      }
    } else {
      tokens.push({ text: part, color: COLORS.default });
    }
  }
  return tokens;
}

function tokenizeCSS(line: string): Token[] {
  const trimmed = line.trim();
  if (trimmed.startsWith("/*") || trimmed.startsWith("//")) {
    return [{ text: line, color: COLORS.comment }];
  }
  if (trimmed.startsWith("@")) {
    return [{ text: line, color: COLORS.keyword }];
  }
  // property: value;
  const propMatch = line.match(/^(\s*)([a-zA-Z-]+)(\s*:\s*)(.+?)(;?\s*)$/);
  if (propMatch) {
    return [
      { text: propMatch[1], color: COLORS.default },
      { text: propMatch[2], color: COLORS.property },
      { text: propMatch[3], color: COLORS.punct },
      { text: propMatch[4], color: COLORS.value },
      { text: propMatch[5], color: COLORS.punct },
    ];
  }
  // selector line (contains { or })
  if (trimmed.includes("{") || trimmed.includes("}")) {
    return [{ text: line, color: COLORS.selector }];
  }
  return [{ text: line, color: COLORS.default }];
}

export function highlightCode(code: string, lang: "html" | "css" | "javascript"): ReactNode {
  const lines = code.split("\n");
  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
      {lines.map((line, i) => {
        let tokens: Token[];
        if (lang === "html") tokens = tokenizeHTML(line);
        else if (lang === "css") tokens = tokenizeCSS(line);
        else tokens = tokenizeJS(line);

        return (
          <div key={i} style={{ display: "flex", minHeight: "1.6em" }}>
            <span style={{
              width: 40,
              minWidth: 40,
              textAlign: "right",
              paddingRight: 16,
              color: "#3C4048",
              userSelect: "none",
              borderRight: "1px solid #1e1e1e",
              marginRight: 16,
              flexShrink: 0,
            }}>
              {i + 1}
            </span>
            <span style={{ flex: 1, whiteSpace: "pre" }}>
              {tokens.map((t, j) => (
                <span key={j} style={{ color: t.color }}>{t.text}</span>
              ))}
            </span>
          </div>
        );
      })}
    </div>
  );
}
