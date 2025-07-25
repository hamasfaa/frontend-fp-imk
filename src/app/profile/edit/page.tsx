"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useUpdateProfile } from "./hooks/useEditProfile";
import { useToast } from "@/components/ui/use-toast";

export default function EditProfilePage() {
  const { user, loading, error, updateProfile } = useUpdateProfile();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const result = await updateProfile({
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
      });

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Profil berhasil diperbarui",
          variant: "default",
        });
      } else {
        toast({
          title: "Gagal",
          description: result.message || "Gagal memperbarui profil",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memperbarui profil",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-2"></div>
        <span>Memuat data profil...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/profile"
          className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Profil
        </Link>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Edit Profil
              </CardTitle>
              <CardDescription className="text-gray-600">
                Perbarui informasi profil Anda. Field yang tidak dapat diubah
                ditandai dengan ikon kunci.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                    <AvatarFallback className="text-2xl bg-green-100 text-green-700">
                      {user?.firstName?.substring(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <User className="h-4 w-4" />
                    Username
                    <Lock className="h-3 w-3 text-gray-400" />
                  </Label>
                  <div className="relative">
                    <Input
                      id="username"
                      value={user?.username || ""}
                      disabled
                      className="bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                    <Badge
                      variant="secondary"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                    >
                      Tidak dapat diubah
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <User className="h-4 w-4" />
                    Nama Depan
                    <Lock className="h-3 w-3 text-gray-400" />
                  </Label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      value={user?.firstName || ""}
                      disabled
                      className="bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                    <Badge
                      variant="secondary"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                    >
                      Tidak dapat diubah
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <User className="h-4 w-4" />
                    Nama Belakang
                    <Lock className="h-3 w-3 text-gray-400" />
                  </Label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      value={user?.lastName || ""}
                      disabled
                      className="bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                    <Badge
                      variant="secondary"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                    >
                      Tidak dapat diubah
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Masukkan email Anda"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Phone className="h-4 w-4" />
                    Nomor HP
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Masukkan nomor HP Anda"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <MapPin className="h-4 w-4" />
                    Alamat
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[100px]"
                    placeholder="Masukkan alamat lengkap Anda"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Lock className="h-4 w-4" />
                    Password
                    <Lock className="h-3 w-3 text-gray-400" />
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value="••••••••••••"
                      disabled
                      className="bg-gray-50 text-gray-500 cursor-not-allowed pr-20"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Badge variant="secondary" className="text-xs">
                        Tidak dapat diubah
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Untuk mengubah password, silakan hubungi{" "}
                    <Link
                      href="/contact"
                      className="text-green-600 hover:text-green-700 underline"
                    >
                      customer service
                    </Link>
                  </p>
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-blue-800">
                  <strong>Catatan:</strong> Beberapa informasi seperti username,
                  nama depan, dan password tidak dapat diubah untuk menjaga
                  keamanan akun Anda. Jika Anda perlu mengubah informasi
                  tersebut, silakan hubungi customer service.
                </AlertDescription>
              </Alert>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 hover:bg-gray-50"
                  asChild
                >
                  <Link href="/profile">Batal</Link>
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving || loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSaving ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Menyimpan...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Save className="h-4 w-4 mr-2" />
                      <span>Simpan Perubahan</span>
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
