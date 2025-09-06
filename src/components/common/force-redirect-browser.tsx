"use client";

import { useEffect } from "react";

export const ForceRedirectBrowser = () => {
  useEffect(() => {
    // Detect Facebook WebView
    const userAgent = navigator.userAgent;
    const isFB = /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);
    
    if (isFB) {
      // Check if user has already dismissed auto-redirect
      const hasDismissed = localStorage.getItem('fb-force-redirect-dismissed');
      
      if (!hasDismissed) {
        // Show alert and redirect
        const shouldRedirect = confirm(
          '🚀 Để có trải nghiệm tốt nhất, chúng tôi khuyến nghị mở trang này trong Safari hoặc Chrome.\n\nBạn có muốn mở trong trình duyệt không?'
        );
        
        if (shouldRedirect) {
          // Try multiple methods to redirect to external browser
          const currentUrl = window.location.href;
          
          // Method 1: Try window.open
          try {
            window.open(currentUrl, '_blank');
          } catch (error) {
            console.error('Error opening in new window:', error);
          }
          
          // Method 2: Try to trigger external app with delay
          setTimeout(() => {
            try {
              // Try to redirect to external browser
              window.location.href = currentUrl;
            } catch (error) {
              console.error('Error redirecting:', error);
            }
          }, 500);
          
          // Method 3: Try to create a link and click it
          setTimeout(() => {
            try {
              const link = document.createElement('a');
              link.href = currentUrl;
              link.target = '_blank';
              link.rel = 'noopener noreferrer';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } catch (error) {
              console.error('Error creating link:', error);
            }
          }, 1000);
          
          // Method 4: Try to trigger external app with different approach
          setTimeout(() => {
            try {
              // Try to redirect to external browser with different approach
              window.location.replace(currentUrl);
            } catch (error) {
              console.error('Error replacing location:', error);
            }
          }, 1500);
          
        } else {
          // User chose to stay, mark as dismissed
          localStorage.setItem('fb-force-redirect-dismissed', 'true');
        }
      }
    }
  }, []);

  return null; // This component doesn't render anything
};
