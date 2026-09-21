import React from "react";
import { Trophy, Award } from "lucide-react";

const awards = [
  {
    year: 2023,
    title: "Miranda Syahputri",
    description: "Juara 2 Seni tunggal senjata putri Kejuaraan Pencak Silat Piala Kepala Dinas Kabupaten Malang tahun 2023",
  },
];

const AwardSection: React.FC = () => {
  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4 md:mb-12">
          Prestasi & Penghargaan
        </h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {awards.map((award, index) => (
            <div
              key={index}
              className="flex items-start p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex-shrink-0 mr-6">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                  <Trophy className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-600 mb-1">
                  Tahun {award.year}
                </p>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {award.title}
                </h3>
                <p className="text-gray-700">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="text-center mt-12">
          <button className="border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition-colors">
            Lihat Semua Prestasi
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default AwardSection;
