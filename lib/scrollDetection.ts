// utils/scrollEndDetector.ts

type ScrollDirection = "up" | "down";

interface Options {
  /** How long (ms) to wait after the last wheel event before firing */

  debounceTime?: number;
}

/**

 * Calls your onScrollEnd callback once, after the user stops rolling the wheel.

 *

 * @param onScrollEnd Receives the final scrollY and direction ('up'|'down')

 * @param opts.debounceTime How many ms of “silence” to wait (default: 150ms)

 * @returns cleanup fn to remove the listener

 */

export function detectScrollEnd(
  onScrollEnd: (scrollY: number, direction: ScrollDirection) => void,

  { debounceTime = 150 }: Options = {}
): () => void {
  let timer: number | null = null;

  let lastDeltaY = 0;

  const handleWheel = (e: WheelEvent) => {
    lastDeltaY = e.deltaY;

    if (timer !== null) window.clearTimeout(timer);

    timer = window.setTimeout(() => {
      const direction: ScrollDirection = lastDeltaY > 0 ? "down" : "up";

      onScrollEnd(window.scrollY, direction);

      timer = null;
    }, debounceTime);
  };

  window.addEventListener("wheel", handleWheel, { passive: true });

  return () => {
    if (timer !== null) window.clearTimeout(timer);

    window.removeEventListener("wheel", handleWheel);
  };
}
