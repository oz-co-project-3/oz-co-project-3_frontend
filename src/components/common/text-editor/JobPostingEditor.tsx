'use client';

import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { List } from 'lucide-react';
import TogleButton from './TogleButton';
import Headings, { customHeading } from './style-options/Headings';
import FontStyle, { listKeymap, listItem, underline } from './style-options/FontStyle';
import UndoRedo from './style-options/UndoRedo';
import TextAligns, { textAlign } from './style-options/TextAligns';
import HighlightText, { highlight } from './style-options/HighlightText';
import YoutubeBtn, { youtube } from './style-options/YoutubeBtn';
import HyperLink, { link } from './style-options/HyperLink';
import ImageUploadBtn, { imageUploadNode } from './style-options/ImageUploadBtn';
import CharacterCounter, { characterCount } from './CharacterCounter';
import { useEffect } from 'react';
import ImageResize from 'tiptap-extension-resize-image';

export default function JobPostingEditor({
  setDetailJSON,
}: {
  setDetailJSON: (json: string) => void;
}) {
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
      Placeholder.configure({
        placeholder: '내용을 입력해주세요...',
      }),
      characterCount,
    ],
    // 일단 테스트용 텍스트 (수정이나 불러오기 했을때, 초기 텍스트로 대체, JSON 으로 넣어주기)
    content: ``,
    editorProps: {
      attributes: {
        class: 'min-h-[500px] w-full bg-white p-4 focus:outline-none',
      },
    },
    // Tiptap Error: SSR has been detected,
    // please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setDetailJSON(JSON.stringify(editor.getJSON()));
    },
  });

  useEffect(() => {
    if (editor) {
      setDetailJSON(JSON.stringify(editor.getJSON()));
      // console.log(editor.getJSON());
    }
  }, [editor, setDetailJSON]);

  if (!editor) return null;

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className='overflow-hidden rounded-md border'>
        {/* Toolbar */}
        <div className='flex flex-wrap items-center gap-2 border-b bg-white px-4 py-2'>
          {/* 실행 취소, 실행 */}
          <UndoRedo editor={editor} />
          <div className='h-6 w-[1px] border-l' />

          {/* 헤딩 */}
          <Headings editor={editor} />
          {/* 리스트 (불릿) */}
          <TogleButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
          >
            <List />
          </TogleButton>
          <div className='h-6 w-[1px] border-l' />

          {/* 볼드, 이탤릭, 언더라인, 하이라이트 */}
          <FontStyle editor={editor} />
          <HighlightText editor={editor} />
          <div className='h-6 w-[1px] border-l' />

          {/* 텍스트 정렬 */}
          <TextAligns editor={editor} />
          <div className='h-6 w-[1px] border-l' />

          {/* 링크 */}
          <HyperLink editor={editor} />
          {/* 이미지 */}
          <ImageUploadBtn editor={editor} />
          {/* 유튜브 */}
          <YoutubeBtn editor={editor} />
        </div>

        {/* Editor */}
        <EditorContent editor={editor} />
        <CharacterCounter editor={editor} />
      </div>
    </EditorContext.Provider>
  );
}

// 버튼 디자인해서 공통 컴포넌트로?
// 템플릿의 버튼 베끼기

// 툴바 컴포넌트화
// 툴바 내 카테고리 별 컴포넌트화
// extensions 까지 컴포넌트화해서 여기서 조립
