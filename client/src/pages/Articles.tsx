import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

interface Article {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
  author?: string;
  category?: string;
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch all articles (assuming there's an endpoint for all articles, or use the same one if it returns all)
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles`);
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data: Article[] = await response.json();
      // Ensure data is an array, if not set it to empty array
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Gagal memuat berita. Silakan coba lagi nanti.");
      setArticles([]); // Clear articles on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const renderArticleCard = (article: Article) => (
    <Card key={article.id} className="rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={article.image_url || "https://via.placeholder.com/400x250?text=Media+Esashaka"}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {article.category && (
            <span className="capitalize px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold tracking-wider">
              {article.category === "student" ? "Siswa" : article.category === "teacher" ? "Guru" : article.category}
            </span>
          )}
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
            {formatDate(article.created_at)}
          </span>
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {article.title}
        </CardTitle>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-600">{article.author || "Admin"}</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
          {article.content.replace(/[#*`]/g, "")}
        </p>
        <Link
          href={`/article/${article.id}`}
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
        >
          Baca Selengkapnya &rarr;
        </Link>
      </CardContent>
    </Card>
  );

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Skeleton className="w-full h-48" />
          <div className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Berita & Artikel</h1>
            <p className="text-blue-100 mt-2">Informasi terbaru seputar kegiatan dan prestasi SMPN 17 Malang</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading && renderSkeleton()}
            {error && (
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-500 text-lg font-semibold mb-2">Gagal Memuat Berita</p>
                <p className="text-gray-600 text-sm mb-6">Terjadi kesalahan saat memuat data. Silakan periksa koneksi internet Anda dan coba lagi.</p>
                <button 
                  onClick={() => fetchArticles()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            )}
            {!loading && !error && articles.length === 0 && (
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v4m6 0a2 2 0 01-2-2v-4a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2zm0 0V5m0 16H9m0 0v-4" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg font-semibold mb-2">Belum Ada Berita</p>
                <p className="text-gray-500 text-sm">Saat ini belum ada artikel yang diterbitkan. Silakan kembali lagi nanti untuk melihat berita terbaru.</p>
              </div>
            )}
            {!loading && !error && articles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.map(renderArticleCard)}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
