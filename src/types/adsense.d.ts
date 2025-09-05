/* eslint-disable @typescript-eslint/no-explicit-any */
// Google AdSense Type Definitions
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export interface AdSenseConfig {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
}

export interface AdSenseAdUnit {
  adSlot: string;
  adFormat?: "auto" | "fluid";
  style?: React.CSSProperties;
  className?: string;
  fullWidthResponsive?: boolean;
}
