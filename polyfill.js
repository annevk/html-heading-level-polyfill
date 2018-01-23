function determineLevel(el) {
  let level = 1;
  // Arguably the parentNode being null check can be removed as it will never be null when this and
  // the function below are run on a document, as is the case.
  //
  // This is "sectioning content" and "sectioning roots"
  while (el.parentNode && (el = el.parentNode.closest("article,aside,nav,section,blockquote,details,dialog,fieldset,figure,td"))) {
    level += 1;
  }
  return level;
}

function adjustHeading(heading) {
  let type = heading.localName,
      parent = heading.parentNode;
  if ((type === "h1" ||
       type === "h2" ||
       type === "h3" ||
       type === "h4" ||
       type === "h5" ||
       type === "h6") &&
      parent !== null && parent.localName === "hgroup") {
    heading.setAttribute("role", "presentation");
    heading.removeAttribute("aria-level");
  } else if (type === "hgroup" || type === "h1") {
    heading.setAttribute("aria-level", determineLevel(heading));
    if (type === "hgroup") {
      heading.setAttribute("role", "heading");
    }
  }
}

function traverseAndAdjustHeadings(doc) {
  doc.querySelectorAll("hgroup,h1,h2,h3,h4,h5,h6").forEach(heading => {
    adjustHeading(heading);
  })
}

function initiateHeadingPolyfill(doc) {
  traverseAndAdjustHeadings(doc);
  (new MutationObserver(() => traverseAndAdjustHeadings(doc))).observe(doc, { childList: true, subtree: true });
}

initiateHeadingPolyfill(document);
