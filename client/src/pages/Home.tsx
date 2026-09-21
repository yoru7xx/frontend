import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useSplash } from "@/contexts/SplashContext";
import SplashScreen from "@/components/SplashScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroImageCarousel from "@/components/HeroImageCarousel";
import MediaEsashaka from "@/components/MediaEsashaka";
import WhySMPN17 from "@/components/WhySMPN17";
import HeadmasterSection from "@/components/HeadmasterSection";
import FacilitySection from "@/components/FacilitySection";
import AwardSection from "@/components/AwardSection";
import ActivitySection from "@/components/ActivitySection";

export default function Home() {
  const { showSplash, completeSplash } = useSplash();
  const [headerTransparent, setHeaderTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Change header style when scrolled past hero section
      // Using a small offset (50px) for a smoother transition
      setHeaderTransparent(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen
          onComplete={() => completeSplash()}
          duration={3000}
        />
      )}

      {/* 
        Sticky Header using 'fixed' - Only rendered when Splash Screen is hidden
        This ensures it floats ABOVE the content and doesn't take up space in the layout flow,
        allowing the Hero section to be exactly h-screen.
      */}
      {!showSplash && (
        <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
          <Header transparent={headerTransparent} />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section - Exactly h-screen, no interference from header */}
        <section className="relative w-full h-screen-fix overflow-hidden">
          {/* Blurred Background Carousel */}
          <div className="absolute inset-0">
            <HeroImageCarousel isBlurred />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative z-10 h-full mt-6 md:mt-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center">
                {/* Left Content */}
                <div className="gsap-hero-content order-2 md:order-none">
                    <div className="md:flex items-center mb-4">
                      <h1 className="text-3xl md:text-7xl text-center md:text-left font-bold text-white leading-tight">
                        Selamat Datang <br />di SMPN 17 Malang
                      </h1>
                    </div>
                  <p className="text-lg md:text-2xl text-center md:text-left text-white mb-8 opacity-90 max-w-2xl">
                    Membangun generasi masa depan yang cerdas, berkarakter, dan berwawasan global melalui pendidikan berkualitas.
                  </p>
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <Link href="/fasilitas">
                      <button className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-sm md:text-base text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 w-full">
                        Fasilitas Kami
                      </button>
                    </Link>
                    <Link href="/ekstrakurikuler">
                      <button className="flex justify-center items-center border-2 border-white text-sm md:text-base text-white bg-transparent hover:bg-white hover:text-blue-600 font-bold py-4 rounded-lg transition-all transform hover:scale-105 w-full">
                        Ekstrakurikuler
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Right Image Carousel */}
                <div className="order-1 md:order-none block w-full h-[200px] md:h-[500px] rounded-2xl shadow-2xl float-accent shadow-black/50 overflow-hidden gsap-hero-image">
                  <HeroImageCarousel />
                </div>
              </div>
            </div>
          </div>
          
        </section>

        {/* Media Esashaka Section */}
        <div className="gsap-reveal">
          <MediaEsashaka />
        </div>

        {/* Kenapa Harus SMPN 17 Section */}
        <div className="gsap-reveal">
          <WhySMPN17 />
        </div>

        {/* Sambutan Kepala Sekolah Section */}
        <div className="gsap-reveal">
          <HeadmasterSection />
        </div>

        {/* Fasilitas Sekolah Section */}
        <div className="gsap-reveal">
          <FacilitySection />
        </div>

        {/* Prestasi & Penghargaan Section */}
        <div className="gsap-reveal">
          <AwardSection />
        </div>

        {/* Kegiatan - Kegiatan Section */}
        <div className="gsap-reveal">
          <ActivitySection />
        </div>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 gsap-reveal">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bergabunglah dengan Kami
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
              Jadilah bagian dari komunitas pembelajaran yang dinamis dan inovatif untuk masa depan yang lebih gemilang.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-12 rounded-lg transition-all transform hover:scale-105 text-lg">
              Hubungi Kami
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
