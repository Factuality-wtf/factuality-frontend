'use client';

import { IconContext } from 'react-icons';
import { RiTwitterXFill, RiBlueskyLine } from 'react-icons/ri';
import { PiCopyLight, PiFacebookLogoBold } from 'react-icons/pi';
import { XShareButton, FacebookShareButton, BlueskyShareButton } from 'react-share';

import { Fact } from '@/lib/api/facts/factClient';
import { trackCopy, trackShare } from '@/lib/analytics/events';

type Props = {
  fact: Fact;
};

function shareUrl(base: string, source: string) {
  return `${base}?utm_source=${source}&utm_medium=social&utm_campaign=fact_share`;
}

export default function ShareButtons({ fact }: Props) {
  const baseUrl = `https://factually.wtf/${fact.id}/${fact.url}`;
  const text = `Did you know?\n\n${fact.body}\n\n`;

  const twitterUrl = shareUrl(baseUrl, 'twitter');
  const blueskyUrl = shareUrl(baseUrl, 'bluesky');
  const facebookUrl = shareUrl(baseUrl, 'facebook');
  const copyUrl = `${baseUrl}?utm_source=copy&utm_medium=share&utm_campaign=fact_share`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(copyUrl);
    trackCopy(fact.id);
    alert('Link copied!');
  };

  return (
    <div className="flex items-center gap-6">
      <IconContext.Provider
        value={{
          className:
            'text-primary hover:text-secondary text-4xl cursor-pointer transition-all hover:scale-110',
        }}
      >
        <XShareButton
          title={text}
          url={twitterUrl}
          aria-label="Share on X"
          onClick={() => trackShare(fact.id, 'twitter')}
        >
          <RiTwitterXFill />
        </XShareButton>

        <BlueskyShareButton
          title={text}
          url={blueskyUrl}
          aria-label="Share on Bluesky"
          onClick={() => trackShare(fact.id, 'bluesky')}
        >
          <RiBlueskyLine />
        </BlueskyShareButton>

        <FacebookShareButton
          url={facebookUrl}
          aria-label="Share on Facebook"
          onClick={() => trackShare(fact.id, 'facebook')}
        >
          <PiFacebookLogoBold />
        </FacebookShareButton>

        <button onClick={copyLink} aria-label="Copy link">
          <PiCopyLight />
        </button>
      </IconContext.Provider>
    </div>
  );
}
