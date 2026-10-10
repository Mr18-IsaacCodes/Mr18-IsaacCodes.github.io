import { ImageResponse } from "next/og";

export const alt = "Isaac Pandraju — Data, engineered for real impact.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 76px", background: "#0b1522", color: "#f2f6fa", fontFamily: "sans-serif" }}><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24 }}><span style={{ color: "#83d9f8", fontWeight: 700 }}>IP.</span><span style={{ fontSize: 18, letterSpacing: 3, color: "#9fafc1" }}>AZURE · DATABRICKS · GENAI</span></div><div style={{ display: "flex", flexDirection: "column" }}><span style={{ color: "#9fafc1", fontSize: 19, letterSpacing: 4, marginBottom: 26 }}>ISAAC PANDRAJU / SENIOR DATA ENGINEER</span><span style={{ fontSize: 78, letterSpacing: -4, lineHeight: 1.12 }}>Data, engineered</span><span style={{ color: "#83d9f8", fontSize: 78, letterSpacing: -4, lineHeight: 1.12 }}>for real impact.</span></div><div style={{ display: "flex", borderTop: "1px solid #2b3a4c", paddingTop: 24, color: "#afbdcd", fontSize: 19 }}>Reliable data platforms. Thoughtful engineering. Useful AI.</div></div>, { ...size });
}
