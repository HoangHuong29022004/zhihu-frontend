"use client";

import { useEffect } from "react";

export const AutoOpenBrowser = () => {
  useEffect(() => {
    // Detect Facebook WebView
    const userAgent = navigator.userAgent;
    const isFB = /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);
    
    if (isFB) {
      // Check if user has already dismissed auto-redirect
      const hasDismissed = localStorage.getItem('fb-auto-open-dismissed');
      
      if (!hasDismissed) {
        // Auto redirect to external browser without asking
        const currentUrl = window.location.href;
        
        // Try multiple methods to redirect to external browser
        try {
          // Method 1: Try window.open
          window.open(currentUrl, '_blank');
        } catch (error) {
          console.error('Error opening in new window:', error);
        }
        
        // Method 2: Try to trigger external app with delay
        setTimeout(() => {
          try {
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
            window.location.replace(currentUrl);
          } catch (error) {
            console.error('Error replacing location:', error);
          }
        }, 1500);
      }
    }
  }, []);

  return null; // This component doesn't render anything
};
