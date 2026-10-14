import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import CaseStudies from "@/components/CaseStudies";
import GlobalExperience from "@/components/GlobalExperience";

import LeadershipRecognition from "@/components/LeadershipRecognition";
import CommunityVolunteering from "@/components/CommunityVolunteering";

import LetsConnect from "@/components/LetsConnect";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="hero-dark-curve" aria-hidden="true">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" focusable="false">
          <path d="M-2 140Q720 -100 1442 140V144H-2Z" fill="#1B1B1D" />
        </svg>
      </div>
      <div className="dark-editorial-flow">
      <About />
      <Experience />
      <CaseStudies />
      </div>
      <GlobalExperience />
      <LeadershipRecognition />
      <CommunityVolunteering />
      <LetsConnect />
    </main>
  );
}
