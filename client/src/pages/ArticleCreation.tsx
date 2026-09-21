import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import { useAdminAuth, logoutAdmin } from "../hooks/useAdminAuth";
import { useLocation } from "wouter";
import { LogOut, FileText } from "lucide-react";

export default function ArticleCreation() {
  const { isAuthenticated, hasChecked } = useAdminAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("student");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [, setLocation] = useLocation();

  if (!hasChecked) {
    return null;
  }

  if (!isAuthenticated) {
    // The useAdminAuth hook will handle the redirect to login
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!title.trim() || !content.trim() || !author.trim()) {
      toast.error("Title, content, and author name are required");
      return;
    }
    
    setLoading(true);

    // For simplicity, we'll re-send the admin credentials with the article data
    // In a real application, a JWT from the login would be used for authorization
    const username = localStorage.getItem("ADMIN_USERNAME") || "admin";
    const password = localStorage.getItem("ADMIN_PASSWORD") || "password";

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          image_url: imageUrl,
          category,
          author,
          username,
          password,
        }),
      });

      if (response.ok) {
        toast.success("Article created successfully!");
        setTitle("");
        setContent("");
        setImageUrl("");
        setCategory("student");
        setAuthor("");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create article.");
      }
    } catch (error) {
      console.error("Article creation error:", error);
      toast.error("An error occurred while creating the article.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    toast.info("Logged out successfully.");
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
  
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText size={28} />
              Tulis Artikel Baru
            </CardTitle>
            <p className="text-blue-100 text-sm mt-3">Isi form dibawah untuk membuat artikel baru</p>
          </CardHeader>
          <CardContent className="pt-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700 font-semibold">
                  Judul Artikel <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Masukkan judul artikel"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Author and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Author Field */}
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-gray-700 font-semibold">
                    Nama Penulis <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="author"
                    type="text"
                    placeholder="Masukkan Nama Penulis"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Category Field */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-700 font-semibold">
                    Kategori <span className="text-red-500">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Siswa</SelectItem>
                      <SelectItem value="teacher">Guru</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Content Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content" className="text-gray-700 font-semibold">
                    Konten Artikel <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewMode(false)}
                      className={!previewMode ? "bg-blue-100 text-blue-700" : ""}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewMode(true)}
                      className={previewMode ? "bg-blue-100 text-blue-700" : ""}
                    >
                      Preview
                    </Button>
                  </div>
                </div>
                
                {!previewMode ? (
                  <Textarea
                    id="content"
                    placeholder="Masukkan konten artikel (Markdown supported)"
                    required
                    rows={12}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                  />
                ) : (
                  <div className="border border-gray-300 rounded-md p-4 min-h-[300px] bg-white prose max-w-none overflow-auto">
                    <ReactMarkdown>{content || "*Belum ada konten*"}</ReactMarkdown>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Tip: Kamu bisa menggunakan format Markdown seperti h1-h6 atau yang lain untuk styling yang lebih baik
                </p>
              </div>

              {/* Image URL Field */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-gray-700 font-semibold">
                  URL Gambar <span className="text-gray-400 text-sm">(Opsional)</span>
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Masukkan url yang mengarah langsung ke gambar jika ingin menggunakan gambar cover 
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg transition-all transform hover:scale-105" 
                  disabled={loading}
                >
                  {loading ? "Membuat..." : "Buat Artikel"}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className="px-6 border-gray-300 hover:bg-gray-50"
                  onClick={() => {
                    setTitle("");
                    setContent("");
                    setImageUrl("");
                    setCategory("student");
                    setAuthor("");
                  }}
                  disabled={loading}
                >
                  Hapus
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
