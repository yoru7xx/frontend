import { Instagram, Facebook, Twitter, Music, Youtube } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com",
    color: "hover:text-pink-600",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com",
    color: "hover:text-blue-600",
  },
  {
    name: "X (Twitter)",
    icon: Twitter,
    href: "https://twitter.com",
    color: "hover:text-gray-700",
  },
  {
    name: "TikTok",
    icon: Music,
    href: "https://tiktok.com",
    color: "hover:text-gray-900",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com",
    color: "hover:text-red-600",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <img  src="/logo.webp" alt="Logo SMPN 17 Malang" className="w-full h-full object-contain" 
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800">SMPN 17 Malang</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Menyediakan pendidikan berkualitas untuk membangun generasi masa depan yang cerdas, berkarakter, dan berwawasan global.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Menu Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/profil" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Profil Sekolah
                </a>
              </li>
              <li>
                <a href="/akademik" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Program Akademik
                </a>
              </li>
              <li>
                <a href="/perpustakaan" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Perpustakaan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Hubungi Kami</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📍 Jl. Pelabuhan Tanjung Priok No.170, Bakalankrajan, Kec. Sukun, Kota Malang, Jawa Timur 65148</p>
              <p>📞 (0341) 837036</p>
              <p>✉️ info@smpn17malang.sch.id</p>
              <p>🕐 Senin - Jumat: 07:00 - 15:00</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mb-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors ${social.color}`}
                  title={social.name}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {currentYear} SMPN 17 Malang. Semua hak dilindungi.</p>
            <p className="mt-2">
              Dikembangkan dengan ❤️ untuk pendidikan yang lebih baik
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
