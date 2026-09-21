import React from "react";
// import { Calendar, Users, Zap } from "lucide-react";

const activities = [
  {
    // icon: Calendar,
    title: "Perkemahan Sabtu Minggu",
    description: "Mengadakan upacara dan berbagai lomba untuk memperingati hari-hari penting nasional.",
    image: "pramuka.webp",
  },
  {
    // icon: Users,
    title: "Maulid Nabi 1445 H",
    description: "Kegiatan rutin untuk menumbuhkan rasa kepedulian sosial siswa terhadap lingkungan sekitar.",
    image: "maulid.webp",
  },
  {
    // icon: Zap,
    title: "HUT SMPN 17 Malang",
    description: "Ajang pameran bakat dan kreativitas siswa dari berbagai bidang seni dan akademik.",
    image: "hut.webp",
  },
];

const ActivitySection: React.FC = () => {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4 md:mb-12">
          Kegiatan - Kegiatan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                {/* <activity.icon className="w-10 h-10 text-blue-600 mb-4" /> */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {activity.title}
                </h3>
                <p className="text-gray-700">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitySection;
