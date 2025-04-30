'use client';

import { Editor } from '@tiptap/react';
import TogleButton from '../TogleButton';
import { Highlighter } from 'lucide-react';
import Highlight from '@tiptap/extension-highlight';

export const highlight = Highlight.configure({
  HTMLAttributes: {
    class: 'bg-main-light/50 py-[1px]',
  },
});

export default function HighlightText({ editor }: { editor: Editor }) {
  return (
    <>
      <TogleButton
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        isActive={editor.isActive('highlight')}
      >
        <Highlighter />
      </TogleButton>
    </>
  );
}
