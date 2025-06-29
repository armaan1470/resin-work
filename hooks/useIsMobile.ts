"use client"

// hooks/useIsMobile.js
import { useEffect, useState } from 'react';

export function useIsMobile(MOBILE_BREAKPOINT = 768) {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        // Ensure this code only runs in the browser environment
        if (typeof window !== 'undefined') {
            const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

            const onChange = () => {
                setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
            };

            // Add event listener for changes in media query
            mql.addEventListener('change', onChange);

            // Set initial value
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

            // Cleanup event listener on unmount
            return () => {
                mql.removeEventListener('change', onChange);
            };
        }
    }, [MOBILE_BREAKPOINT]);

    return !!isMobile; // Return a boolean
}