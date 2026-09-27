import { ImageResponse } from "next/og";
import { CORE_PATH } from "@/lib/content";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 100 100">
          <path d={CORE_PATH} fill="#F2F0EA" />
        </svg>
      </div>
    ),
    size,
  );
}
