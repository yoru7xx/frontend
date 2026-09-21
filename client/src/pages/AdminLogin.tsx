import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { Lock, User } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Simple authentication: store a flag in localStorage
        localStorage.setItem("isAdminAuthenticated", "true");
        toast.success("Login successful!");
        setLocation("/admin/dashboard");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 py-16">
      <div className="w-full max-w-md">
        {/* Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <p className="text-blue-100 text-sm text-center mt-3">Masuk ke panel administrasi</p>
          </CardHeader>
          <CardContent className="pt-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-semibold text-sm">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Masukkan username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 py-2.5 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-semibold text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 py-2.5 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg transition-all mt-4" 
                disabled={loading}
              >
                {loading ? "Sedang login..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
