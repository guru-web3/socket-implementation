"use client";
import dynamic from "next/dynamic";
const WrapEthCard = dynamic(
  () =>
    import("./components/templates/WrapEth").then((module) => module.default),
  { ssr: false },
);

export default function Home() {
  return <WrapEthCard />;
}
