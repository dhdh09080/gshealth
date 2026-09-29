import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GS Health Check",
  description: "GS건설 건강진단 서류 수집·검증 프로토타입",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
