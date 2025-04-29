'use client';

import { EditorContent, EditorContext, mergeAttributes, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Heading1, Heading2, Heading3, Italic, List } from 'lucide-react';
import ListItem from '@tiptap/extension-list-item';
import ListKeymap from '@tiptap/extension-list-keymap';
import TogleButton from './TogleButton';

const CustomHeading = Heading.extend({
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

export default function JobPostingEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: {
          keepMarks: true,
          // TODO: Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
          keepAttributes: false,
        },
      }),
      CustomHeading,
      ListItem.configure({
        HTMLAttributes: {
          class: 'ml-5 list-disc',
        },
      }),
      ListKeymap.configure({
        listTypes: [
          {
            itemName: 'listItem',
            wrapperNames: ['bulletList'],
          },
        ],
      }),
      Placeholder.configure({
        placeholder: '내용을 입력해주세요...',
      }),
    ],
    // 일단 테스트용 텍스트 (수정이나 불러오기 했을때, 초기 텍스트로 대체)
    content: `
        <h1>This is a 1st level heading</h1>
        <p>This is a paragraph</p>
        <h2>This is a 2nd level heading</h2>
        <h3>This is a 3rd level heading</h3>
        <h4>This 4th level heading will be converted to a paragraph, because levels are configured to be only 1, 2 or 3.</h4>
        asdf
      `,
    editorProps: {
      attributes: {
        class: 'min-h-[500px] w-full bg-white p-4',
      },
    },
    // Tiptap Error: SSR has been detected,
    // please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className='overflow-hidden rounded-md border'>
        {/* Toolbar */}
        <div className='flex gap-2 border-b bg-white px-4 py-2'>
          {/* 헤딩 */}
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

          {/* 리스트 (불릿) */}
          <TogleButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
          >
            <List />
          </TogleButton>

          {/* 볼드, 이탤릭 */}
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
        </div>

        {/* Editor */}
        <EditorContent editor={editor} />
      </div>
    </EditorContext.Provider>
  );
}

// 버튼 디자인해서 공통 컴포넌트로?
// 템플릿의 버튼 베끼기

// 툴바 컴포넌트화
// 툴바 내 카테고리 별 컴포넌트화
// extensions 까지 컴포넌트화해서 여기서 조립
