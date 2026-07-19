import { Fraunces, Inter, Tiro_Bangla, Hind_Siliguri } from "next/font/google";

export const fontDisplay = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const fontDisplayBn = Tiro_Bangla({
  subsets: ["bengali"],
  weight: ["400"],
  variable: "--font-display-bn",
  display: "swap",
});

export const fontBodyBn = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-bn",
  display: "swap",
});

export const fontVariables = [
  fontDisplay.variable,
  fontBody.variable,
  fontDisplayBn.variable,
  fontBodyBn.variable,
].join(" ");
