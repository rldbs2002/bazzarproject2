import { Metadata } from "next";
import LandingPage from "./components/project/LandingPage";

export const metadata: Metadata = {
  title: "Kgoods | Ship Worldwide | Free Korean Address",
  description:
    "Buy KPOP, Korean skincare, and any products from Korean shopping sites. Use our free Korean address, consolidation, forwarding, and personal shopper!",
  openGraph: {
    title: "Kgoods | Ship Worldwide",
    description:
      "Buy products from Korean shopping sites. Use our free Korean address, consolidation, forwarding, and personal shopper!",
  },
};

export default function Home() {
  return (
    <>
      <LandingPage />
    </>
  );
}
