# HTML heading level polyfill

A polyfill for a proposed HTML Standard "outline algorithm".

The basic gist of the proposal is as follows:

* Focus on headings alone and leave landmarks to their own UI.
* `h2`-`h6` always have heading level 2-6, unless their parent is `hgroup`, in which case `hgroup` is the heading and `h2`-`h6` are just content.
* `h1` and `hgroup` have heading level 1 + the number of ancestor sectioning content / sectioning root elements. (We include sectioning roots as it seems sensible that a h1 inside a blockquote should have a higher level than the one in the section or article the blockquote is in. A wrinkle here is that sectioning roots are not considered by the rendering section at the moment.)
* `hgroup` presents itself as a heading (`role=heading`) and its `h1`-`h6` children as ordinary content (no role, like span).

Motivation can be found in [HTML Standard issue 83](https://github.com/whatwg/html/issues/83).
