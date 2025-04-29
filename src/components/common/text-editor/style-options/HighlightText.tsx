'use client';

import { Editor } from '@tiptap/react';
import TogleButton from '../TogleButton';
import { Highlighter } from 'lucide-react';
import Highlight from '@tiptap/extension-highlight';

export const highlight = Highlight.configure({
  HTMLAttributes: {
    class: 'bg-main-light rounded px-[4px] py-[2px] text-white',
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
