'use client';

import { Editor } from '@tiptap/react';
import TogleButton from '../TogleButton';
import TextAlign from '@tiptap/extension-text-align';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';

export const textAlign = TextAlign.configure({
  types: ['heading', 'paragraph'],
});

export default function TextAligns({ editor }: { editor: Editor }) {
  return (
    <>
      <TogleButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
      >
        <AlignLeft />
      </TogleButton>

      <TogleButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
      >
        <AlignCenter />
      </TogleButton>

      <TogleButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
      >
        <AlignRight />
      </TogleButton>

      <TogleButton
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        isActive={editor.isActive({ textAlign: 'justify' })}
      >
        <AlignJustify />
      </TogleButton>
    </>
  );
}
