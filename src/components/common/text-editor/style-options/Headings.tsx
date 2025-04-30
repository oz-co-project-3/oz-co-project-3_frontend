'use client';

import { Editor, mergeAttributes } from '@tiptap/react';
import { Heading1, Heading2, Heading3 } from 'lucide-react';
import Heading from '@tiptap/extension-heading';
import TogleButton from '../TogleButton';

export const customHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level;
    // 임시 타입
    const classes: Record<number, string> = {
      1: 'text-3xl font-extrabold',
      2: 'text-2xl font-bold',
      3: 'text-xl font-semibold',
    };

    return [
      `h${level}`,
      mergeAttributes(HTMLAttributes, {
        class: classes[level],
      }),
      0,
    ];
  },
});

export default function Headings({ editor }: { editor: Editor }) {
  return (
    <>
      <TogleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
      >
        <Heading1 />
      </TogleButton>

      <TogleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
      >
        <Heading2 />
      </TogleButton>

      <TogleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
      >
        <Heading3 />
      </TogleButton>
    </>
  );
}

// 드롭다운으로 리팩토링?
