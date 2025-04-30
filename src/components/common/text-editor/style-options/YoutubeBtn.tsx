'use client';

import { Editor } from '@tiptap/react';
import Youtube from '@tiptap/extension-youtube';
import TogleButton from '../TogleButton';
import { TvMinimalPlay } from 'lucide-react';

export const youtube = Youtube.configure({
  interfaceLanguage: 'kr',
  nocookie: true,
});

export default function YoutubeBtn({ editor }: { editor: Editor }) {
  const addYoutubeVideo = () => {
    const url = prompt('URL을 입력해주세요.');

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        // width: Math.max(320, parseInt(width, 10)) || 640,
        // height: Math.max(180, parseInt(height, 10)) || 480,
      });
    }
  };

  return (
    <>
      <TogleButton
        onClick={addYoutubeVideo}
        // isActive={editor.isActive('highlight')}
      >
        <TvMinimalPlay />
      </TogleButton>
    </>
  );
}
