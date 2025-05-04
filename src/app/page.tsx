import Image from "next/image";
import styles from "./page.module.css";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
    </div>
  );
}
