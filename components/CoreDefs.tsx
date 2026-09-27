import { CORE_PATH } from "@/lib/content";

/**
 * Shared SVG symbol + gradients for the "Core" mark. Rendered once near the
 * root (see app/layout.tsx) so every <CoreMark> / <CoreBackdrop> instance
 * can reference #core, url(#chrome), url(#chrome-warm) and url(#ember)
 * without re-declaring them.
 */
export default function CoreDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute", pointerEvents: "none" }}>
      <defs>
        <symbol id="core" viewBox="0 0 100 100">
          <path d={CORE_PATH} />
        </symbol>
        <linearGradient id="chrome" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#FDFDFD" />
          <stop offset="11%" stopColor="#9A9FA5" />
          <stop offset="23%" stopColor="#EDEFF1" />
          <stop offset="37%" stopColor="#63686E" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#8E949A" />
          <stop offset="70%" stopColor="#C9B4AC" />
          <stop offset="82%" stopColor="#E6E8EA" />
          <stop offset="92%" stopColor="#585D63" />
          <stop offset="100%" stopColor="#C4C8CC" />
        </linearGradient>
        <linearGradient id="chrome-warm" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="18%" stopColor="#C9B4AC" />
          <stop offset="34%" stopColor="#F4F2EE" />
          <stop offset="52%" stopColor="#7D7570" />
          <stop offset="68%" stopColor="#FFF8F4" />
          <stop offset="86%" stopColor="#A3A8AE" />
          <stop offset="100%" stopColor="#E8E4DE" />
        </linearGradient>
        <linearGradient id="ember" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF7A55" />
          <stop offset="46%" stopColor="#FF3B22" />
          <stop offset="100%" stopColor="#8C1A08" />
        </linearGradient>
      </defs>
    </svg>
  );
}
