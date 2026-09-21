import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Akademik() {
  const programs = [
    {
      name: "Kelas 7",
      icon: "📘",
      description: "Masa transisi dan pengenalan lingkungan sekolah menengah dengan fokus pada karakter dan dasar akademik.",
    },
    {
      name: "Kelas 8",
      icon: "📖",
      description: "Pengembangan kompetensi diri dan eksplorasi minat melalui berbagai mata pelajaran dan kegiatan.",
    },
    {
      name: "Kelas 9",
      icon: "🎓",
      description: "Persiapan matang untuk kelulusan dan pemantapan materi untuk jenjang pendidikan selanjutnya.",
    },
  ];

  const subjects = [
    "Pendidikan Agama",
    "Pendidikan Pancasila",
    "Bahasa Indonesia",
    "Matematika",
    "IPA (Sains)",
    "IPS (Sosial)",
    "Bahasa Inggris",
    "Seni Budaya",
    "PJOK",
    "Informatika",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Program Akademik</h1>
            <p className="text-blue-100 mt-2">Kurikulum Merdeka untuk Generasi Cerdas & Berkarakter</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Programs */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Jenjang Pendidikan SMP</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 gsap-reveal">
              {programs.map((program, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow"
                >
                  <div className="text-5xl mb-4">{program.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{program.name}</h3>
                  <p className="text-gray-600">{program.description}</p>
                </div>
              ))}
            </div>

            {/* Subjects */}
            <div className="bg-gray-50 p-8 rounded-xl mb-16 gsap-reveal">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Mata Pelajaran Utama</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg text-center border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <p className="text-gray-700 font-medium">{subject}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching Methods */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Metode Pembelajaran</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gsap-reveal">
              {[
                {
                  icon: "👥",
                  title: "Pembelajaran Interaktif",
                  description: "Mendorong siswa aktif berdiskusi dan berkolaborasi dalam memecahkan masalah.",
                },
                {
                  icon: "🔬",
                  title: "Berbasis Proyek (P5)",
                  description: "Implementasi Projek Penguatan Profil Pelajar Pancasila untuk mengasah kreativitas.",
                },
                {
                  icon: "💻",
                  title: "Literasi Digital",
                  description: "Pemanfaatan teknologi informasi sebagai media pembelajaran yang modern dan efektif.",
                },
              ].map((method, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-5xl mb-4">{method.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{method.title}</h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
