'use client';

import { Editor } from '@tiptap/react';
import { ImageUploadNode } from '@/components/ui/tiptap-node/image-upload-node';
import TogleButton from '../TogleButton';
import { Image as ImageIcon } from 'lucide-react';

// TODO: 임시 이미지 업로드 함수 (이미지 업로드 함수 따로 분리)
const handleImageUpload = async (file: File) => {
  console.log(file);
  const imageUrl = 'https://picsum.photos/200/300';
  return Promise.resolve(imageUrl);
};

export const imageUploadNode = ImageUploadNode.configure({
  accept: 'image/*',
  maxSize: 1024 * 1024 * 5,
  limit: 3,
  upload: handleImageUpload,
  onError: (error) => console.error('Upload failed:', error),
});

export default function ImageUploadBtn({ editor }: { editor: Editor }) {
  const insertImageUploader = () => {
    if (editor) {
      editor.chain().focus().setImageUploadNode().run();
    }
  };

  return (
    <>
      <TogleButton
        onClick={insertImageUploader}
        // isActive={editor.isActive('highlight')}
      >
        <ImageIcon />
      </TogleButton>
    </>
  );
}
