'use client';

import { CharacterCount } from '@tiptap/extension-character-count';
import { Editor } from '@tiptap/react';

//  constants로 옮겨주기?
const CHARACTER_LIMIT = 1000;

export const characterCount = CharacterCount.configure({
  limit: CHARACTER_LIMIT,
});

export default function CharacterCounter({ editor }: { editor: Editor }) {
  const percentage = editor
    ? Math.round((100 / CHARACTER_LIMIT) * editor.storage.characterCount.characters())
    : 0;

  return (
    <div
      className={`character-count ${editor.storage.characterCount.characters() === CHARACTER_LIMIT ? 'character-count--warning' : ''} flex items-center justify-end gap-2 bg-white p-2`}
    >
      <svg height='20' width='20' viewBox='0 0 20 20'>
        <circle r='10' cx='10' cy='10' fill='#e9ecef' />
        <circle
          r='5'
          cx='10'
          cy='10'
          fill='transparent'
          stroke='var(--color-main-light)'
          strokeWidth='10'
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
          transform='rotate(-90) translate(-20)'
        />
        <circle r='6' cx='10' cy='10' fill='white' />
      </svg>
      <span className='text-sm'>
        {editor.storage.characterCount.characters()} / {CHARACTER_LIMIT} 글자
      </span>
      <span className='text-sm'>({editor.storage.characterCount.words()} 단어)</span>
    </div>
  );
}
