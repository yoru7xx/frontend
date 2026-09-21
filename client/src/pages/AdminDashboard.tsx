import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { useAdminAuth, logoutAdmin } from "../hooks/useAdminAuth";
import { useLocation } from "wouter";
import {
  LogOut,
  Plus,
  Edit2,
  Trash2,
  FileText,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface Article {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  category: string;
  author: string;
  created_at: string;
}

export default function AdminDashboard() {
  const { isAuthenticated, hasChecked } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
    image_url: "",
    category: "student",
    author: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (hasChecked && isAuthenticated) {
      fetchArticles();
    }
  }, [hasChecked, isAuthenticated]);

  if (!hasChecked) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/articles`
      );
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        toast.error("Failed to fetch articles");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("An error occurred while fetching articles");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    toast.info("Logged out successfully.");
    setLocation("/admin/login");
  };

  const handleEditClick = (article: Article) => {
    setSelectedArticle(article);
    setEditFormData({
      title: article.title,
      content: article.content,
      image_url: article.image_url || "",
      category: article.category,
      author: article.author,
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (article: Article) => {
    setSelectedArticle(article);
    setDeleteDialogOpen(true);
  };

  const handleUpdateArticle = async () => {
    if (!selectedArticle) return;

    if (
      !editFormData.title.trim() ||
      !editFormData.content.trim() ||
      !editFormData.author.trim()
    ) {
      toast.error("Title, content, and author are required");
      return;
    }

    setEditLoading(true);

    const username = localStorage.getItem("ADMIN_USERNAME") || "admin";
    const password = localStorage.getItem("ADMIN_PASSWORD") || "password";

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/articles/${selectedArticle.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editFormData,
            username,
            password,
          }),
        }
      );

      if (response.ok) {
        toast.success("Article updated successfully!");
        setEditDialogOpen(false);
        fetchArticles();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update article");
      }
    } catch (error) {
      console.error("Error updating article:", error);
      toast.error("An error occurred while updating the article");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteArticle = async () => {
    if (!selectedArticle) return;

    setDeleteLoading(true);

    const username = localStorage.getItem("ADMIN_USERNAME") || "admin";
    const password = localStorage.getItem("ADMIN_PASSWORD") || "password";

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/articles/${selectedArticle.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (response.ok) {
        toast.success("Article deleted successfully!");
        setDeleteDialogOpen(false);
        fetchArticles();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("An error occurred while deleting the article");
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={32} />
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-white text-blue-600 hover:bg-gray-100 border-0"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Plus size={24} />
                Buat Artikel
              </CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <p className="text-gray-600 mb-4">
                Buat artikel baru untuk ditampilkan di halaman berita
              </p>
              <Button
                onClick={() => setLocation("/admin/create-article")}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              >
                Buat Artikel Baru
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <FileText size={24} />
                Daftar Artikel
              </CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <p className="text-gray-600 mb-4">
                Lihat, edit, dan hapus artikel yang sudah dibuat
              </p>
              <p className="text-sm font-semibold text-blue-600">
                Total: {articles.length} artikel
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <FileText size={24} />
                Statistik
              </CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <p className="text-gray-600 mb-4">
                Lihat statistik dan informasi artikel
              </p>
              <div className="text-sm space-y-2">
                <p>
                  Siswa:{" "}
                  <span className="font-semibold">
                    {articles.filter((a) => a.category === "student").length}
                  </span>
                </p>
                <p>
                  Guru:{" "}
                  <span className="font-semibold">
                    {articles.filter((a) => a.category === "teacher").length}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Article List */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6">
            <CardTitle className="text-2xl">Daftar Artikel</CardTitle>
            <p className="text-blue-100 text-sm mt-2">
              Kelola semua artikel yang telah dibuat
            </p>
          </CardHeader>
          <CardContent className="py-6">
            {/* Search Bar */}
            <div className="mb-6">
              <Input
                placeholder="Cari artikel berdasarkan judul atau penulis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Table */}
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Memuat artikel...</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {articles.length === 0
                    ? "Belum ada artikel. Buat artikel baru untuk memulai."
                    : "Tidak ada artikel yang cocok dengan pencarian."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul</TableHead>
                      <TableHead>Penulis</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredArticles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium max-w-xs truncate">
                          {article.title}
                        </TableCell>
                        <TableCell>{article.author}</TableCell>
                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              article.category === "student"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {article.category === "student" ? "Siswa" : "Guru"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(article.created_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog
                              open={
                                editDialogOpen &&
                                selectedArticle?.id === article.id
                              }
                              onOpenChange={(open) => {
                                if (!open) {
                                  setEditDialogOpen(false);
                                  setSelectedArticle(null);
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditClick(article)}
                                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                >
                                  <Edit2 size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Edit Artikel</DialogTitle>
                                  <DialogDescription>
                                    Ubah informasi artikel di bawah ini
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4">
                                  {/* Title Field */}
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-title">
                                      Judul Artikel{" "}
                                      <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                      id="edit-title"
                                      value={editFormData.title}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          title: e.target.value,
                                        })
                                      }
                                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>

                                  {/* Author and Category Row */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-author">
                                        Nama Penulis{" "}
                                        <span className="text-red-500">*</span>
                                      </Label>
                                      <Input
                                        id="edit-author"
                                        value={editFormData.author}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            author: e.target.value,
                                          })
                                        }
                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-category">
                                        Kategori{" "}
                                        <span className="text-red-500">*</span>
                                      </Label>
                                      <Select
                                        value={editFormData.category}
                                        onValueChange={(value) =>
                                          setEditFormData({
                                            ...editFormData,
                                            category: value,
                                          })
                                        }
                                      >
                                        <SelectTrigger
                                          id="edit-category"
                                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        >
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="student">
                                            Siswa
                                          </SelectItem>
                                          <SelectItem value="teacher">
                                            Guru
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  {/* Content Field */}
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-content">
                                      Konten Artikel{" "}
                                      <span className="text-red-500">*</span>
                                    </Label>
                                    <Textarea
                                      id="edit-content"
                                      value={editFormData.content}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          content: e.target.value,
                                        })
                                      }
                                      rows={10}
                                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                                    />
                                  </div>

                                  {/* Image URL Field */}
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-imageUrl">
                                      URL Gambar{" "}
                                      <span className="text-gray-400 text-sm">
                                        (Opsional)
                                      </span>
                                    </Label>
                                    <Input
                                      id="edit-imageUrl"
                                      type="url"
                                      value={editFormData.image_url}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          image_url: e.target.value,
                                        })
                                      }
                                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>

                                  {/* Buttons */}
                                  <div className="flex gap-3 pt-4">
                                    <Button
                                      onClick={handleUpdateArticle}
                                      disabled={editLoading}
                                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                                    >
                                      {editLoading ? "Menyimpan..." : "Simpan"}
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => {
                                        setEditDialogOpen(false);
                                        setSelectedArticle(null);
                                      }}
                                      disabled={editLoading}
                                    >
                                      Batal
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog
                              open={
                                deleteDialogOpen &&
                                selectedArticle?.id === article.id
                              }
                              onOpenChange={(open) => {
                                if (!open) {
                                  setDeleteDialogOpen(false);
                                  setSelectedArticle(null);
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteClick(article)}
                                  className="border-red-300 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Hapus Artikel</DialogTitle>
                                  <DialogDescription>
                                    Apakah Anda yakin ingin menghapus artikel
                                    "{article.title}"? Tindakan ini tidak dapat
                                    dibatalkan.
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="flex gap-3">
                                  <Button
                                    onClick={handleDeleteArticle}
                                    disabled={deleteLoading}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                  >
                                    {deleteLoading ? "Menghapus..." : "Hapus"}
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                      setDeleteDialogOpen(false);
                                      setSelectedArticle(null);
                                    }}
                                    disabled={deleteLoading}
                                  >
                                    Batal
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
