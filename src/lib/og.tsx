import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

type OgCardProps = {
  kicker: string;
  title: string;
  subtitle: string;
  body: string;
  /** Data URI of a transparent portrait, rendered on the right. */
  portrait?: string;
};

export async function loadPortraitDataUri() {
  const file = await readFile(join(process.cwd(), "public", site.portrait.src));
  return `data:image/png;base64,${file.toString("base64")}`;
}

export function renderOgCard({ kicker, title, subtitle, body, portrait }: OgCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#ffffff",
          color: "#0f172a",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {portrait ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={portrait}
            alt=""
            width={540}
            height={540}
            style={{ position: "absolute", right: 0, bottom: 0 }}
          />
        ) : null}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#0f172a",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            AH
          </div>
          <div style={{ fontSize: 26, color: "#475569" }}>{kicker}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 42, color: "#1e40af", marginTop: 8 }}>{subtitle}</div>
          <div style={{ fontSize: 28, color: "#475569", marginTop: 28, maxWidth: portrait ? 560 : 1000, lineHeight: 1.4 }}>{body}</div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#1e40af", borderRadius: 3 }} />
      </div>
    ),
    ogSize,
  );
}

export const defaultOgCard = {
  kicker: "Android  ·  Kotlin  ·  Flutter  ·  IoT  ·  Automotive",
  title: site.name,
  subtitle: site.title,
  body: "Production Android and Flutter apps and connected-device solutions over BLE, CAN Bus and MQTT.",
};
