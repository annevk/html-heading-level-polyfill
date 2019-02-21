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
  let type = heading.localName;
  if (type === "hgroup") {
    heading.setAttribute("role", "heading");
    heading.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach(h => {
      h.setAttribute("role", "presentation");
      h.removeAttribute("aria-level");
    })
  }
  
  heading.setAttribute("aria-level", determineLevel(heading));
}

function traverseAndAdjustHeadings(doc) {
  doc.querySelectorAll("hgroup,h1").forEach(heading => {
    adjustHeading(heading);
  })
}

function initiateHeadingPolyfill(doc) {
  traverseAndAdjustHeadings(doc);
  (new MutationObserver(() => traverseAndAdjustHeadings(doc))).observe(doc, { childList: true, subtree: true });
}

initiateHeadingPolyfill(document);
