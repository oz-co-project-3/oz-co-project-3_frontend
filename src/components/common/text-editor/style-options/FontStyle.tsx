'use client';

import { Editor } from '@tiptap/react';
import TogleButton from '../TogleButton';
import { Bold, Italic, Underline as UnderlineIcon } from 'lucide-react';
import ListItem from '@tiptap/extension-list-item';
import ListKeymap from '@tiptap/extension-list-keymap';
import Underline from '@tiptap/extension-underline';

export const listItem = ListItem.configure({
  HTMLAttributes: {
    class: 'ml-5 list-disc',
  },
});

export const listKeymap = ListKeymap.configure({
  listTypes: [
    {
      itemName: 'listItem',
      wrapperNames: ['bulletList'],
    },
  ],
});

export const underline = Underline.configure({
  HTMLAttributes: {
    class: 'underline',
  },
});

export default function FontStyle({ editor }: { editor: Editor }) {
  return (
    <>
      <TogleButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <Bold />
      </TogleButton>

      <TogleButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <Italic />
      </TogleButton>

      <TogleButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
      >
        <UnderlineIcon />
      </TogleButton>
    </>
  );
}
