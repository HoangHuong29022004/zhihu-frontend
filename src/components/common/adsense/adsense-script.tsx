"use client";

import Script from "next/script";

interface AdSenseScriptProps {
  client: string; // Google AdSense client ID (ca-pub-xxxxxxxxxx)
}

export default function AdSenseScript({ client }: AdSenseScriptProps) {
  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
