"use client";

import { useEffect } from "react";

export const AutoOpenBrowser = () => {
  useEffect(() => {
    // Detect Facebook WebView
    const userAgent = navigator.userAgent;
    const isFB = /FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent);
    
    if (isFB) {
      const currentUrl = window.location.href;
      
      // More aggressive redirect attempts
      const redirectMethods = [
        // Method 1: Direct location change
        () => {
          window.location.href = currentUrl;
        },
        
        // Method 2: window.open
        () => {
          window.open(currentUrl, '_blank');
        },
        
        // Method 3: location.replace
        () => {
          window.location.replace(currentUrl);
        },
        
        // Method 4: Create and click link
        () => {
          const link = document.createElement('a');
          link.href = currentUrl;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        
        // Method 5: Try to trigger external app with iframe
        () => {
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = currentUrl;
          document.body.appendChild(iframe);
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        },
        
        // Method 6: Try to trigger external app with form
        () => {
          const form = document.createElement('form');
          form.method = 'GET';
          form.action = currentUrl;
          form.target = '_blank';
          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);
        }
      ];
      
      // Execute all methods with different delays
      redirectMethods.forEach((method, index) => {
        setTimeout(() => {
          try {
            method();
          } catch (error) {
            console.error(`Redirect method ${index + 1} failed:`, error);
          }
        }, index * 200);
      });
      
      // Additional aggressive attempts
      setTimeout(() => {
        try {
          // Try to trigger external app by changing document title
          document.title = 'Opening in browser...';
          window.location.href = currentUrl;
        } catch (error) {
          console.error('Additional redirect failed:', error);
        }
      }, 2000);
    }
  }, []);

  return null; // This component doesn't render anything
};