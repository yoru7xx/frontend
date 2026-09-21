import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Ekstrakurikuler() {
  const activities = [
    {
      icon: "⚽",
      name: "Olahraga",
      description: "Berbagai cabang olahraga termasuk sepak bola, bola voli, basket, dan badminton.",
    },
    {
      icon: "🎨",
      name: "Seni Rupa",
      description: "Mengembangkan kreativitas melalui melukis, menggambar, dan kerajinan tangan.",
    },
    {
      icon: "🎵",
      name: "Musik",
      description: "Belajar bermain alat musik dan bernyanyi dalam berbagai genre musik.",
    },
    {
      icon: "🎭",
      name: "Teater",
      description: "Mengembangkan kemampuan akting dan ekspresi diri melalui pertunjukan teater.",
    },
    {
      icon: "🤖",
      name: "Robotika",
      description: "Belajar programming dan desain robot untuk kompetisi tingkat nasional.",
    },
    {
      icon: "📰",
      name: "Jurnalistik",
      description: "Mengembangkan keterampilan menulis dan fotografi melalui media sekolah.",
    },
    {
      icon: "🌍",
      name: "Pramuka",
      description: "Kegiatan kepanduan untuk mengembangkan karakter dan kepemimpinan.",
    },
    {
      icon: "💻",
      name: "Coding Club",
      description: "Belajar pemrograman dan pengembangan aplikasi web dan mobile.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Ekstrakurikuler</h1>
            <p className="text-blue-100 mt-2">Mengembangkan bakat dan minat di luar akademik</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-16 gsap-reveal">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Program Ekstrakurikuler Kami</h2>
              <p className="text-gray-600 text-lg">
                Kami menyediakan berbagai kegiatan ekstrakurikuler untuk mengembangkan potensi siswa di bidang olahraga, seni, teknologi, dan kepemimpinan. Setiap siswa didorong untuk mengikuti minimal satu kegiatan ekstrakurikuler.
              </p>
            </div>

            {/* Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 gsap-reveal">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-600 transition-all"
                >
                  <div className="text-5xl mb-4">{activity.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{activity.name}</h3>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="bg-blue-50 p-8 rounded-xl mb-16 gsap-reveal">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Manfaat Mengikuti Ekstrakurikuler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Mengembangkan bakat dan minat khusus",
                  "Meningkatkan rasa percaya diri",
                  "Belajar bekerja sama dalam tim",
                  "Melatih kepemimpinan dan tanggung jawab",
                  "Memperluas jaringan pertemanan",
                  "Mengikuti kompetisi tingkat nasional dan internasional",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-2xl text-blue-600">✓</div>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Jadwal */}
            <div className="bg-white border border-gray-200 p-8 rounded-xl gsap-reveal">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Jadwal Kegiatan</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-bold text-gray-800">Kegiatan</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-800">Hari</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-800">Jam</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-800">Lokasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { activity: "Sepak Bola", day: "Senin & Rabu", time: "15:30 - 17:00", location: "Lapangan" },
                      { activity: "Musik", day: "Selasa & Kamis", time: "15:30 - 17:00", location: "Ruang Musik" },
                      { activity: "Robotika", day: "Rabu & Jumat", time: "15:30 - 17:00", location: "Lab Komputer" },
                      { activity: "Teater", day: "Senin & Kamis", time: "16:00 - 17:30", location: "Aula" },
                    ].map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">{item.activity}</td>
                        <td className="py-3 px-4 text-gray-700">{item.day}</td>
                        <td className="py-3 px-4 text-gray-700">{item.time}</td>
                        <td className="py-3 px-4 text-gray-700">{item.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
