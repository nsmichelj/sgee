import {
  Contact,
  Gallery,
  Hero,
  Leadership,
  MisionVision,
  RecentNews,
} from "@/components/public/home";

export default function Home() {
  return (
    <>
      <Hero />
      <MisionVision />
      <Leadership />
      <RecentNews />
      <Gallery />
      <Contact />
    </>
  );
}
