import { useTranslations } from "next-intl";
import { useRef } from "react";

const MobileLogoAnimation = () => {
  const t = useTranslations("LogoAnimation");
  const pinRef = useRef<HTMLDivElement | null>(null);

  const containerLogoRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const rRef = useRef<HTMLImageElement | null>(null);
  const bRef = useRef<HTMLImageElement | null>(null);
  const lRef = useRef<HTMLImageElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative hidden md:block h-[100vh]" ref={sectionRef}>
      <div className="grid grid-cols-2 relative py-[16rem] z-[10]">
        <div>
          <div
            ref={containerLogoRef}
            className="flex items-center justify-center w-full h-full"
          >
            <div
              ref={pinRef}
              className="relative w-full h-full logo-animation z-[20]"
            >
              <img
                ref={rRef}
                src="/logo-animation/logo-part-1.svg"
                alt="r"
                className="absolute top-1/2 left-1/2 w-full h-full opacity-60 object-contain transform -translate-x-1/2 -translate-y-1/2 z-[99]"
              />
              <img
                ref={lRef}
                src="/logo-animation/logo-part-2.png"
                alt="l"
                className="absolute top-1/2 left-1/2 w-full h-full opacity-60 object-contain transform -translate-x-1/2 -translate-y-1/2 z-20"
              />
              <img
                ref={bRef}
                src="/logo-animation/logo-part-3.svg"
                alt="b"
                className="absolute top-1/2 left-1/2 w-full h-full opacity-60 object-contain transform -translate-x-1/2 -translate-y-1/2 z-10"
              />
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-center flex-col gap-y-[1rem] pe-[6rem] z-[5]"
          ref={textContainerRef}
        >
          <h2 className="text-[3.6rem] text-[var(--header-text)] font-normal">
            {t("heading")}
            <span className="font-semibold"> {t("subHeading")} </span>
          </h2>
          <p className="text-[var(--header-text)]/60">{t("content")}</p>
        </div>
      </div>
    </div>
  );
};

export default MobileLogoAnimation;
