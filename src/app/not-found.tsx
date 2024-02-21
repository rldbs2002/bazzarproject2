import { Metadata } from "next";
import { NotFoundPageView } from "./page-sections/not-found.tsx";

export const metadata: Metadata = {
  title: "404 - Kgoods | Ship Worldwide | Free Korean Address",
  description: "Bazaar Not Found Page View",
};

export default function NotFound() {
  return <NotFoundPageView />;
}
