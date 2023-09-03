import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import { markedTeXExtensions } from './markedMathExtension.js';
import {
  type WalineHighlighter,
  type WalineTeXRenderer,
} from '../typings/index.js';

export interface MarkdownParserOptions {
  highlighter: WalineHighlighter | false;
  texRenderer: WalineTeXRenderer | false;
}

export type MarkdownParser = (content: string) => string;

export const getMarkdownRenderer = ({
  highlighter,
  texRenderer,
}: MarkdownParserOptions): MarkdownParser => {
  const marked = new Marked({
    breaks: true,
  });

  marked.setOptions({ breaks: true });

  if (highlighter)
    marked.use(
      markedHighlight({
        highlight: highlighter,
      }),
    );

  if (texRenderer) {
    const extensions = markedTeXExtensions(texRenderer);

    marked.use({ extensions });
  }

  return (content: string): string => <string>marked.parse(content);
};
