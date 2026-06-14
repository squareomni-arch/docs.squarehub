"use client";

import Script from "next/script";

declare global {
  interface Window {
    square_hubSDK?: {
      run: (opts: { websiteToken: string; baseUrl: string }) => void;
    };
  }
}

/** SquareHub chatbot widget — loads the SDK and boots the bubble. */
export default function ChatWidget() {
  return (
    <Script
      id="square-hub-sdk"
      src="https://hub.squareomni.com/sdk.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.square_hubSDK?.run({
          websiteToken: "LM4z8CaGbp9nATNKGBcW5Meg",
          baseUrl: "https://hub.squareomni.com",
        });
      }}
    />
  );
}
