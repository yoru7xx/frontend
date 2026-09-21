import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Fasilitas() {
  const facilities = [
    {
      icon: "🏫",
      name: "Ruang Kelas Modern",
      description: "Ruang kelas yang dilengkapi dengan teknologi pembelajaran terkini dan AC.",
    },
    {
      icon: "🔬",
      name: "Laboratorium Sains",
      description: "Lab fisika, kimia, dan biologi dengan peralatan modern untuk praktikum.",
    },
    {
      icon: "💻",
      name: "Lab Komputer",
      description: "Ruang komputer dengan 40+ unit komputer dan software terbaru.",
    },
    {
      icon: "📚",
      name: "Perpustakaan",
      description: "",
    },
    {
      icon: "🏃",
      name: "Lapangan Olahraga",
      description: "Lapangan sepak bola, basket, voli, dan badminton yang lengkap.",
    },
    {
      icon: "🍽️",
      name: "Kantin Sekolah",
      description: "Kantin dengan menu makanan sehat dan bergizi untuk siswa.",
    },
    {
      icon: "🏥",
      name: "Ruang UKS",
      description: "Ruang kesehatan siswa dengan peralatan medis lengkap dan perawat.",
    },
    {
      icon: "🎨",
      name: "Studio Seni",
      description: "Ruang seni rupa, musik, dan teater dengan peralatan profesional.",
    },
    {
      icon: "🚌",
      name: "Transportasi",
      description: "Layanan bus sekolah yang aman dan nyaman untuk siswa.",
    },
    {
      icon: "📡",
      name: "WiFi & Internet",
      description: "Jaringan WiFi berkecepatan tinggi di seluruh area sekolah.",
    },
    {
      icon: "🔒",
      name: "Keamanan 24 Jam",
      description: "Sistem keamanan CCTV dan petugas keamanan sepanjang waktu.",
    },
    {
      icon: "🌳",
      name: "Taman & Ruang Hijau",
      description: "Area hijau untuk istirahat dan pembelajaran di alam terbuka.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Fasilitas Sekolah</h1>
            <p className="text-blue-100 mt-2">Sarana dan prasarana lengkap untuk mendukung pembelajaran</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-16 gsap-reveal">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Fasilitas Lengkap untuk Pembelajaran Optimal</h2>
              <p className="text-gray-600 text-lg">
                Sekolah Kami dilengkapi dengan berbagai fasilitas modern yang dirancang untuk mendukung proses pembelajaran yang efektif dan nyaman bagi semua siswa.
              </p>
            </div>

            {/* Facilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 gsap-reveal">
              {facilities.map((facility, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-600 transition-all"
                >
                  <div className="text-5xl mb-4">{facility.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{facility.name}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl border border-blue-100 mb-16 gsap-reveal">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Keunggulan Fasilitas Kami</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Teknologi Terkini",
                    description: "Semua fasilitas dilengkapi dengan teknologi terbaru untuk mendukung pembelajaran abad ke-21.",
                  },
                  {
                    title: "Kebersihan & Kenyamanan",
                    description: "Fasilitas dijaga dengan baik dan dibersihkan secara berkala untuk kenyamanan pengguna.",
                  },
                  {
                    title: "Aksesibilitas",
                    description: "Semua fasilitas dirancang untuk dapat diakses oleh semua siswa termasuk yang berkebutuhan khusus.",
                  },
                  {
                    title: "Keamanan",
                    description: "Fasilitas dilengkapi dengan sistem keamanan modern untuk menjaga keselamatan siswa.",
                  },
                ].map((highlight, index) => (
                  <div key={index}>
                    <h4 className="text-xl font-bold text-blue-600 mb-2">{highlight.title}</h4>
                    <p className="text-gray-700">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Virtual Tour */}
            <div className="bg-white border border-gray-200 p-8 rounded-xl text-center gsap-reveal">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Ingin Melihat Fasilitas Kami?</h2>
              <p className="text-gray-600 mb-6">
                Kunjungi sekolah kami secara langsung untuk melihat semua fasilitas yang kami tawarkan.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Jadwalkan Kunjungan
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
