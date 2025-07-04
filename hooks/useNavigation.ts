"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"

interface NavigationOptions {
    /**
     * Whether to enable debug logging
     */
    debug?: boolean
}

/**
 * Generic hook for handling navigation with hash support
 * Uses a two-step approach for cross-page navigation:
 * 1. Navigate to page (loads at top)
 * 2. Store target section for smooth scrolling after page loads
 */
export function useNavigation(options: NavigationOptions = {}) {
    const { debug = false } = options
    const router = useRouter()
    const pathname = usePathname()
    const [isNavigating, setIsNavigating] = useState(false)

    /**
     * Handle navigation to a page with optional hash
     * For cross-page navigation, we use a two-step process:
     * 1. Store the target section in sessionStorage
     * 2. Navigate to the page (without hash) - page loads at top
     * 3. Page's useHashNavigation hook picks up the stored target and scrolls
     */
    const navigateToSection = async (
        href: string,
        hash?: string,
        onNavigationStart?: () => void,
        onNavigationEnd?: () => void,
    ) => {
        if (debug) {
            console.log("🚀 Navigation requested:", { href, hash, currentPath: pathname })
        }

        setIsNavigating(true)
        onNavigationStart?.()

        // Check if we're already on the target page
        const targetPath = href.split("#")[0]
        const isCurrentPage = pathname === targetPath

        if (isCurrentPage && hash) {
            // We're on the same page, just scroll to the element
            if (debug) console.log("📍 Same page navigation, scrolling to element")

            const element = document.getElementById(hash)
            if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = Math.max(0, elementPosition) // Removed the -80 offset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                })

                // Update URL with hash
                window.history.pushState(null, "", `${href}#${hash}`)
            }
        } else {
            // Cross-page navigation
            if (debug) console.log("🌐 Cross-page navigation")

            if (hash) {
                // Store the target section for the destination page
                sessionStorage.setItem("pendingScrollTarget", hash)
                sessionStorage.setItem("pendingScrollPath", targetPath)
                if (debug) console.log("💾 Stored pending scroll target:", hash, "for path:", targetPath)
            }

            // Navigate to the page WITHOUT hash (so it loads at top)
            router.push(targetPath)
        }

        // Reset navigation state
        setTimeout(() => {
            setIsNavigating(false)
            onNavigationEnd?.()
        }, 100)
    }

    /**
     * Handle product/section click from navbar
     */
    const handleSectionClick = (
        basePath: string,
        sectionId: string,
        onNavigationStart?: () => void,
        onNavigationEnd?: () => void,
    ) => {
        navigateToSection(basePath, sectionId, onNavigationStart, onNavigationEnd)
    }

    return {
        navigateToSection,
        handleSectionClick,
        isNavigating,
        currentPath: pathname,
    }
}
