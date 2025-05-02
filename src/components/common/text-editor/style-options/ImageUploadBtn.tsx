'use client';

import { Editor } from '@tiptap/react';
import { ImageUploadNode } from '@/components/ui/tiptap-node/image-upload-node';
import TogleButton from '../TogleButton';
import { Image as ImageIcon } from 'lucide-react';
// import useSWRMutation from 'swr/mutation';
import { apiFetch } from '@/lib/fetcher';

// TODO: 임시 이미지 업로드 함수 (이미지 업로드 함수 따로 분리)
const handleImageUpload = async (file: File) => {
  // swr 훅은 사용 불가 (여기선 swr이 관여할 방법이 없나?)
  // const { data, trigger } = useSWRMutation('/api/upload-image/',
  //   async (url: string, { arg }: { arg: FormData }) => {
  //     return apiFetch(url, {
  //       method: 'POST',
  //       body: arg,
  //     });
  //   },
  //   {
  //   headers: {
  //     'Content-Type': null,
  //   },
  // });

  // 샤드씨엔 프로그레스바 추가 (업로드 진행 정도) onProgress인가 옵션이 있음, 공식문서 참고

  const formData = new FormData();
  formData.append('file', file);
  console.log(formData);

  // TODO: 리팩토링 필요
  const response = await apiFetch<{ image_url: string }>(
    '/api/upload-image/',
    {
      method: 'POST',
      body: formData,
    },
    true, // isFormData
  );
  console.log(response);
  return response.image_url;
};

export const imageUploadNode = ImageUploadNode.configure({
  accept: 'image/*',
  maxSize: 1024 * 1024 * 5,
  // TODO: 일단 파일 하나만 시도해서 성공하고, 나중에 여러개로 업그레이드 하기
  limit: 1,
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
