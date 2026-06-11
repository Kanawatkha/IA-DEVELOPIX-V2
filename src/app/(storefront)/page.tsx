import React from 'react';
import {
  HeroSection,
  FleetSection,
  AwardsSection,
  DeploymentGallery,
  TechStackSection
} from '@/src/features/home';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col bg-canvas text-primary">
      <HeroSection />
      <FleetSection />
      <AwardsSection />
      <section className="w-full border-b border-hairline bg-[#000000]">
        <DeploymentGallery />
      </section>
      <TechStackSection />
    </div>
  );
}