import React from "react";

const HeadmasterSection: React.FC = () => {
  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4 md:mb-12">
          Sambutan <br className="block md:hidden"/>Kepala Sekolah
        </h2>
        <div className="flex flex-col md:flex-row items-center bg-white p-2 md:p-8 rounded-xl shadow-lg">
          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
            <img
              src="headmaster.jpg"
              alt="Kepala Sekolah"
              className="w-80 h-100 object-cover rounded-lg shadow-xl"
            />
          </div>
          <div className="md:w-2/3 md:pl-12">
            <blockquote className="text-base md:text-xl italic text-gray-700 border-l-4 border-blue-600 pl-4 mb-6">
              "Sebagai Kepala Sekolah, saya merasa bangga memimpin lembaga pendidikan ini yang tumbuh dan berkembang bersama para siswa yang berdedikasi dan berpotensi. Website ini dirancang untuk menjadi jendela interaktif yang menghadirkan informasi penting seputar kegiatan akademis, ekstrakurikuler, dan berbagai prestasi sekolah."
            </blockquote>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Assalamu'alaikum Warahmatullahi Wabarakatuh.
            </p>
            <p className="text-sm md:text-base text-gray-700 mb-4">
              Salam hormat untuk seluruh pengunjung website ini, terutama para siswa, orang tua, guru, dan semua anggota komunitas pendidikan SMPN 17 Malang. Kami berkomitmen untuk memberikan layanan pendidikan terbaik, memotivasi siswa untuk mencapai prestasi tinggi, dan menciptakan lingkungan belajar yang kondusif. Melalui website ini, kami berharap dapat memperkuat komunikasi antara sekolah, siswa, dan orang tua guna mendukung proses pembelajaran yang holistik.
            </p>
            <p className="text-sm md:text-base text-gray-700 mb-6">
              Jangan ragu untuk menjelajahi setiap bagian website ini dan manfaatkan informasi yang tersedia. Kami juga menghargai masukan dan saran yang dapat meningkatkan kualitas layanan kami. Terima kasih atas kepercayaan dan dukungan Anda terhadap SMPN 17 Malang. Mari bersama-sama menciptakan masa depan cerah bagi generasi penerus kita.
            </p>
            <p className="text-sm md:text-base mb-4">
              Wassalamualaikum warahmatullahi wabarakatuh<br />Hormat kami,
            </p>
            <p className="text-base md:text-lg font-semibold text-gray-800">
              Saiful Arif,M.Pd
            </p>
            <p className="text-sm md:text-base text-blue-600">
              Kepala Sekolah SMPN Negeri 17 Malang
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadmasterSection;
