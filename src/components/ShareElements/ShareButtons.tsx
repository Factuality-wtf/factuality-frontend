"use client";
import { IconContext } from "react-icons";
import { RiTwitterXFill, RiBlueskyLine } from "react-icons/ri";
import { PiCopyLight, PiFacebookLogoBold } from "react-icons/pi";
import {
  XShareButton,
  FacebookShareButton,
  BlueskyShareButton,
} from "react-share";
import { Fact } from "@/lib/factClient";

type Props = {
  fact: Fact;
};

export default function ShareButtons({ fact }: Props) {
  const url = `https://factually.wtf/${fact.id}/${fact.url}`;
  const text = `Did you know?\n\n${fact.body}`;

  const open = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const shareX = () =>
    open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text,
      )}&url=${encodeURIComponent(url)}`,
    );

  const shareBluesky = () =>
    open(
      `https://bsky.app/intent/compose?text=${encodeURIComponent(
        `${text}\n\n${url}`,
      )}`,
    );

  const shareFacebook = () =>
    open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    );

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex items-center gap-6">
      <IconContext.Provider
        value={{
          className: "text-primary hover:text-secondary text-4xl cursor",
        }}
      >
        <XShareButton
          title={text}
          htmlTitle="Native button tooltip"
          url={url}
          aria-label="Share on X"
        >
          <RiTwitterXFill />
        </XShareButton>

        <BlueskyShareButton
          title={text}
          url={url}
          aria-label="Share on Bluesky"
        >
          <RiBlueskyLine />
        </BlueskyShareButton>

        <FacebookShareButton url={url} aria-label="Share this page on Facebook">
          <PiFacebookLogoBold />
        </FacebookShareButton>

        <button onClick={copyLink} className="text-sm hover:underline">
          <PiCopyLight />
        </button>
      </IconContext.Provider>
    </div>
  );
}
