"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

interface UseHashNavigationOptions {
    /**
     * Delay before scrolling (in ms) - useful when page has animations or loading states
     */
    scrollDelay?: number
    /**
     * Offset from top when scrolling to element (in pixels)
     */
    offset?: number
    /**
     * Callback fired when hash navigation occurs
     */
    onHashNavigation?: (hash: string) => void
    /**
     * Whether to enable debug logging
     */
    debug?: boolean
}

/**
 * Generic hook for handling hash-based navigation and smooth scrolling
 * Works with any page that has sections with IDs matching the hash
 */
export function useHashNavigation(options: UseHashNavigationOptions = {}) {
    const { scrollDelay = 0, offset = 0, onHashNavigation, debug = false } = options

    const pathname = usePathname()
    const [isPageReady, setIsPageReady] = useState(false)
    const hasProcessedPendingScroll = useRef(false)

    const scrollToElement = (elementId: string, smooth = true) => {
        if (debug) console.log("🎯 Attempting to scroll to:", elementId)

        // Remove the # if it's included
        const targetId = elementId.startsWith("#") ? elementId.substring(1) : elementId

        // Find the element
        const element = document.getElementById(targetId)

        if (element) {
            if (debug) console.log("✅ Element found, scrolling smoothly...")

            // Calculate position with offset (now 0 by default)
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = Math.max(0, elementPosition - offset)

            if (smooth) {
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                })
            } else {
                window.scrollTo(0, offsetPosition)
            }

            // Fire callback
            onHashNavigation?.(elementId)

            return true
        } else {
            if (debug) console.log("❌ Element not found:", targetId)
            return false
        }
    }

    // Handle page readiness and check for pending scroll targets
    useEffect(() => {
        if (debug) console.log("🔄 Page loading, setting up readiness timer...")

        const timer = setTimeout(() => {
            setIsPageReady(true)
            if (debug) console.log("✅ Page marked as ready")
        }, scrollDelay)

        return () => clearTimeout(timer)
    }, [pathname, scrollDelay, debug])

    // Check for pending scroll targets when page is ready
    useEffect(() => {
        if (!isPageReady || hasProcessedPendingScroll.current) return

        if (debug) console.log("🔍 Checking for pending scroll targets...")

        // Check sessionStorage for pending scroll target
        const pendingScrollTarget = sessionStorage.getItem("pendingScrollTarget")
        const pendingScrollPath = sessionStorage.getItem("pendingScrollPath")

        if (pendingScrollTarget && pendingScrollPath === pathname) {
            if (debug) console.log("📍 Found pending scroll target:", pendingScrollTarget)

            // Clear the pending target
            sessionStorage.removeItem("pendingScrollTarget")
            sessionStorage.removeItem("pendingScrollPath")

            // Mark as processed
            hasProcessedPendingScroll.current = true

            // Scroll to the target
            setTimeout(() => {
                const success = scrollToElement(pendingScrollTarget, true)

                // If element not found, try again after a longer delay
                if (!success) {
                    setTimeout(() => {
                        if (debug) console.log("🔄 Retrying scroll to:", pendingScrollTarget)
                        scrollToElement(pendingScrollTarget, true)
                    }, 1000)
                }
            }, 100)
        } else {
            // Check for hash in URL (for direct navigation or refresh)
            const hash = window.location.hash
            if (hash) {
                if (debug) console.log("🔗 Found hash in URL:", hash)

                // Remove hash from URL to prevent browser's default scroll
                window.history.replaceState(null, "", window.location.pathname + window.location.search)

                // Mark as processed
                hasProcessedPendingScroll.current = true

                // Scroll to the target
                setTimeout(() => {
                    const success = scrollToElement(hash, true)

                    // If element not found, try again
                    if (!success) {
                        setTimeout(() => {
                            scrollToElement(hash, true)
                        }, 1000)
                    }
                }, 100)
            }
        }
    }, [isPageReady, pathname, debug])

    // Handle hash changes (browser back/forward)
    useEffect(() => {
        const handleHashChange = () => {
            if (debug) console.log("🔄 Hash change detected")

            const hash = window.location.hash
            if (hash) {
                // Remove hash from URL
                window.history.replaceState(null, "", window.location.pathname + window.location.search)

                // Scroll to target
                setTimeout(() => {
                    scrollToElement(hash, true)
                }, 100)
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
        }

        window.addEventListener("hashchange", handleHashChange)

        return () => {
            window.removeEventListener("hashchange", handleHashChange)
        }
    }, [debug])

    // Reset state when pathname changes
    useEffect(() => {
        hasProcessedPendingScroll.current = false
        setIsPageReady(false)
        if (debug) console.log("🔄 Pathname changed, resetting state")
    }, [pathname, debug])

    // Return utility functions for manual use
    return {
        scrollToElement: (elementId: string) => scrollToElement(elementId, true),
        isPageReady,
    }
}
