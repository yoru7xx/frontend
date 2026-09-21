import React from "react";

const WhySMPN17: React.FC = () => {
  const videoId = "4MII4kdm1Mw"; // YouTube video ID from the user's request
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4 md:mb-12">
          Kenapa Harus<br className="block md:hidden"/> SMPN 17?
        </h2>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl aspect-video shadow-2xl rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={embedUrl}
              title="Kenapa Harus SMPN 17?"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <p className="text-center text-gray-600 mt-8 max-w-4xl mx-auto">
          Tonton video ini untuk mengetahui lebih lanjut tentang keunggulan dan lingkungan belajar yang kami tawarkan.
        </p>
      </div>
    </section>
  );
};

export default WhySMPN17;
