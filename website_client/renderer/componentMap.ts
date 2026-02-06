// renderer/componentMap.ts

import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Features } from "@/components/Features";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testinomials";
import { Contact } from "@/components/Contact";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

// Maps section type → React component
export const componentMap: Record<string, any> = {
  navbar: NavBar,
  hero: Hero,
  about: About,
  features: Features,
  gallery: Gallery,
  testimonials: Testimonials,
  contact: Contact,
  cta: CTA,
  footer: Footer,
};
