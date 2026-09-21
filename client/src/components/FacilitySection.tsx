import React from "react";
import { Laptop, BookOpen, Dribbble } from "lucide-react";

const facilities = [
  {
    icon: Laptop,
    title: "Lab. Komputer",
    description: "Dilengkapi dengan perangkat keras dan lunak terbaru untuk mendukung pembelajaran TIK",
    image: "computer.webp",
  },
  {
    icon: BookOpen,
    title: "Perpustakaan",
    description: "Koleksi buku yang lengkap, ruang baca yang nyaman untuk meningkatkan minat baca.",
    image: "library.webp",
  },
  {
    icon: Dribbble,
    title: "Lapangan Olahraga",
    description: "Fasilitas olahraga yang memadai untuk berbagai kegiatan seperti sepak bola, basket, dan voli.",
    image: "basketball.webp",
  },
];

const FacilitySection: React.FC = () => {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4 md:mb-12">
          Fasilitas Sekolah
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
            >
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <facility.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {facility.title}
                </h3>
                <p className="text-gray-700">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitySection;
