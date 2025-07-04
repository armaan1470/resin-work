/**
 * Utility function to handle smooth scrolling to an element
 * @param elementId - The ID of the element to scroll to
 */
export const scrollToElement = (elementId: string): void => {
    // Remove the # if it's included
    const targetId = elementId.startsWith("#") ? elementId.substring(1) : elementId

    // Find the element
    const element = document.getElementById(targetId)

    if (element) {
        // Scroll to the element with smooth behavior
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }
}

/**
 * Utility function to handle hash-based navigation
 * This can be called on page load or route change
 */
export const handleHashNavigation = (): void => {
    // Get the hash from the URL
    const hash = window.location.hash

    if (hash) {
        // Use a small timeout to ensure the page is fully loaded
        setTimeout(() => {
            scrollToElement(hash)
        }, 300)
    } else {
        // If no hash, scroll to top
        window.scrollTo(0, 0)
    }
}
