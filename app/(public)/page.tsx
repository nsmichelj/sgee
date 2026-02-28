import {
  Contact,
  Gallery,
  Hero,
  Leadership,
  MisionVision,
} from "@/components/public/home";

export default function Home() {
  return (
    <>
      <Hero />
      <MisionVision />
      <Leadership />
      <Gallery />
      <Contact />
    </>
  );
}
