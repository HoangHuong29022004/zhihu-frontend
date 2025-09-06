"use client";

import { useEffect } from "react";

export const FacebookAutoRedirect = () => {
  useEffect(() => {
    // Detect Facebook WebView
    const userAgent = navigator.userAgent;
    const isFB = /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);
    
    if (isFB) {
      // Check if user has already dismissed auto-redirect
      const hasDismissed = localStorage.getItem('fb-auto-redirect-dismissed');
      
      if (!hasDismissed) {
        // Show alert and redirect
        const shouldRedirect = confirm(
          'Để có trải nghiệm tốt nhất, chúng tôi khuyến nghị mở trang này trong Safari hoặc Chrome.\n\nBạn có muốn mở trong trình duyệt không?'
        );
        
        if (shouldRedirect) {
          // Try to redirect to external browser
          const currentUrl = window.location.href;
          
          // Method 1: Try window.open
          try {
            window.open(currentUrl, '_blank');
          } catch (error) {
            console.error('Error opening in new window:', error);
          }
          
          // Method 2: Try to trigger external app
          setTimeout(() => {
            try {
              window.location.href = currentUrl;
            } catch (error) {
              console.error('Error redirecting:', error);
            }
          }, 1000);
        } else {
          // User chose to stay, mark as dismissed
          localStorage.setItem('fb-auto-redirect-dismissed', 'true');
        }
      }
    }
  }, []);

  return null; // This component doesn't render anything
};
