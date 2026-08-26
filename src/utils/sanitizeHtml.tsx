/**
 * Sanitize HTML by parsing it in the browser, removing disallowed tags
 * and stripping all attributes. Returns a safe HTML string containing only
 * allowed tags and text nodes.
 *
 * Allowed tags (whitelist): i, em, b, strong, u, br, p, span, ol, li
 */
export function sanitizeHtml(input: string | null | undefined): string {
  if (input == null) return "";
  const s = String(input);

  if (typeof document === "undefined" || typeof DOMParser === "undefined") {
    // fallback: remove all tags (best-effort)
    return s.replace(/<[^>]+>/g, "");
  }

  const allowedTags = new Set([
    "I",
    "EM",
    "B",
    "STRONG",
    "U",
    "BR",
    "P",
    "SPAN",
    "OL",
    "LI",
  ]);

  const parser = new DOMParser();
  const doc = parser.parseFromString(s, "text/html");

  function walk(node: Node) {
    const children = Array.from(node.childNodes);
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as Element;
        const tag = el.tagName.toUpperCase();

        if (!allowedTags.has(tag)) {
          // replace element with its children (drop the tag but keep children)
          while (el.firstChild) {
            node.insertBefore(el.firstChild, el);
          }
          node.removeChild(el);
        } else {
          // allowed tag: remove attributes for safety, then walk deeper
          for (const attr of Array.from(el.attributes)) {
            el.removeAttribute(attr.name);
          }
          walk(el);
        }
      } else if (child.nodeType === Node.TEXT_NODE) {
        // keep text nodes
      } else {
        // remove comments, processing instructions, etc.
        node.removeChild(child);
      }
    }
  }

  walk(doc.body);
  return doc.body.innerHTML || "";
}
