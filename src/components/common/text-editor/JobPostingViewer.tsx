'use client';

import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { listKeymap } from './style-options/FontStyle';
import { underline } from './style-options/FontStyle';
import { customHeading } from './style-options/Headings';
import { listItem } from './style-options/FontStyle';
import { highlight } from './style-options/HighlightText';
import { imageUploadNode } from './style-options/ImageUploadBtn';
import ImageResize from 'tiptap-extension-resize-image';
import { youtube } from './style-options/YoutubeBtn';
import { textAlign } from './style-options/TextAligns';
import { link } from './style-options/HyperLink';
import { cleanString } from '@/lib/utils';

export default function JobPostingViewer({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        listItem: false,
        bulletList: {
          keepMarks: true,
          // TODO: 이거 없으면 여러줄 동시 선택시 맨윗줄만 불릿
          keepAttributes: false,
        },
      }),
      customHeading,
      listItem,
      listKeymap,
      underline,
      textAlign,
      highlight,
      youtube,
      link,
      imageUploadNode,
      ImageResize,
    ],
    content: '컨텐츠를 불러오는 중입니다...',
    editorProps: {
      attributes: {
        class: 'min-h-[500px] w-full bg-white p-4 focus:outline-none border',
      },
    },
    immediatelyRender: false,
    editable: false,
  });

  useEffect(() => {
    if (editor && content) {
      try {
        editor.commands.setContent(JSON.parse(cleanString(content)));
      } catch (error) {
        console.error('파싱 오류:', error);
      }
    }
  }, [editor, content]);

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}
