'use client';

import TogleButton from '../TogleButton';
import Link from '@tiptap/extension-link';
import { Editor } from '@tiptap/react';
import { Link as LinkIcon } from 'lucide-react';
import { useCallback } from 'react';

export const link = Link.configure({
  HTMLAttributes: {
    class: 'text-main-light underline cursor-pointer',
  },
  // autolink: false,
  linkOnPaste: false,
  defaultProtocol: 'https',
  protocols: ['http', 'https'],
  isAllowedUri: (url, ctx) => {
    try {
      // construct URL
      const parsedUrl = url.includes(':')
        ? new URL(url)
        : new URL(`${ctx.defaultProtocol}://${url}`);

      // use default validation
      if (!ctx.defaultValidate(parsedUrl.href)) {
        return false;
      }

      // disallowed protocols
      const disallowedProtocols = ['ftp', 'file', 'mailto'];
      const protocol = parsedUrl.protocol.replace(':', '');

      if (disallowedProtocols.includes(protocol)) {
        return false;
      }

      // only allow protocols specified in ctx.protocols
      const allowedProtocols = ctx.protocols.map((p) => (typeof p === 'string' ? p : p.scheme));

      if (!allowedProtocols.includes(protocol)) {
        return false;
      }

      // disallowed domains
      // const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
      // const domain = parsedUrl.hostname;

      // if (disallowedDomains.includes(domain)) {
      //   return false;
      // }

      // all checks have passed
      return true;
    } catch {
      return false;
    }
  },
});

export default function HyperLink({ editor }: { editor: Editor }) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = prompt('URL을 입력해주세요.', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // URL 포맷팅
    let formattedUrl = url.trim();
    if (!formattedUrl.includes('://')) {
      if (formattedUrl.startsWith('www.')) {
        formattedUrl = formattedUrl.slice(4);
      }
      formattedUrl = `https://${formattedUrl}`;
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: formattedUrl }).run();
    } catch (e) {
      // TODO: 가능한 에러가 뭔지 생각해보기
      console.log((e as Error).message);
    }
  }, [editor]);

  return (
    <>
      <TogleButton onClick={setLink}>
        <LinkIcon />
      </TogleButton>
    </>
  );
}
