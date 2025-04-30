'use client';

import { Editor } from '@tiptap/react';
import TogleButton from '../TogleButton';
import { Redo2, Undo2 } from 'lucide-react';

export default function UndoRedo({ editor }: { editor: Editor }) {
  return (
    <>
      <TogleButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo2 />
      </TogleButton>

      <TogleButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo2 />
      </TogleButton>
    </>
  );
}
