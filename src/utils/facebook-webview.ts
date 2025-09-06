/**
 * Utility functions for Facebook WebView detection and handling
 */

/**
 * Detect if the current environment is Facebook WebView
 */
export const isFacebookWebView = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent;
  return /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);
};

/**
 * Detect if the current environment is Facebook in-app browser
 */
export const isFacebookInAppBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent;
  return /FBAN|FBAV|FB_IAB|FB4A|Instagram|Line|Twitter|LinkedInApp/i.test(userAgent);
};

/**
 * Get the current URL with proper encoding for external browser
 */
export const getExternalBrowserUrl = (): string => {
  if (typeof window === 'undefined') return '';
  
  return window.location.href;
};

/**
 * Open current page in external browser
 */
export const openInExternalBrowser = (): void => {
  if (typeof window === 'undefined') return;
  
  const currentUrl = window.location.href;
  window.open(currentUrl, '_blank');
};

/**
 * Check if user has dismissed the Facebook WebView banner
 */
export const hasDismissedFacebookBanner = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return localStorage.getItem('fb-webview-banner-dismissed') === 'true';
};

/**
 * Mark Facebook WebView banner as dismissed
 */
export const dismissFacebookBanner = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('fb-webview-banner-dismissed', 'true');
};

/**
 * Reset Facebook WebView banner dismissal (for testing)
 */
export const resetFacebookBannerDismissal = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('fb-webview-banner-dismissed');
};
