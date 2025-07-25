"use client";

import type React from "react";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Upload, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useAddProduct } from "./hooks/useAddProduct";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

export default function AddProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const fileRef = useRef<File | null>(null);
  const { addProduct, loading } = useAddProduct();
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      fileRef.current = e.target.files[0];

      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImage(imageUrl);
    }
  };

  const removeImage = () => {
    setImage(null);
    fileRef.current = null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileRef.current) {
      toast({
        title: "Error",
        description: "Harap upload gambar produk",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await addProduct(
        formData.title,
        formData.category,
        parseInt(formData.quantity || "0"),
        parseInt(formData.price || "0"),
        formData.description,
        fileRef.current
      );

      if (result.success) {
        toast({
          title: "Berhasil",
          description: result.message || "Produk berhasil ditambahkan",
          variant: "default",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Gagal",
          description: result.message || "Gagal menambahkan produk",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menambahkan produk",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/dashboard"
        className="flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Kembali ke Dashboard
      </Link>

      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b pb-6">
            <CardTitle className="text-2xl font-bold">
              Tambah Produk Baru
            </CardTitle>
            <CardDescription>
              Isi informasi produk dengan lengkap untuk memudahkan pembeli
              menemukan produk Anda
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="w-full">
              <CardContent className="p-6 pt-2">
                <TabsContent value="basic" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-base">
                        Nama Produk <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Masukkan nama produk"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1.5"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-base">
                        Kategori <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleSelectChange("category", value)
                        }
                        required
                      >
                        <SelectTrigger id="category" className="mt-1.5">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Produk Olahan">
                            Produk Olahan
                          </SelectItem>
                          <SelectItem value="Sampah Mentah">
                            Sampah Mentah
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price" className="text-base">
                          Harga (Rp) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          placeholder="0"
                          value={formData.price}
                          onChange={handleChange}
                          className="mt-1.5"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="quantity" className="text-base">
                          Jumlah <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          type="number"
                          placeholder="0"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="mt-1.5"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-base">
                        Deskripsi
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        placeholder="Deskripsikan produk Anda secara singkat"
                        className="mt-1.5"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Label className="text-base mb-3 block">
                        Foto Produk <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex space-x-4">
                        {image ? (
                          <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                            <Image
                              src={image}
                              alt="Product image"
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-white"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="w-32 h-32 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                            <Upload className="h-6 w-6 text-gray-400 mb-1" />
                            <span className="text-xs text-gray-500">
                              Upload
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </label>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Unggah satu foto produk. Format: JPG, PNG. Ukuran maks:
                        2MB.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>

              <CardFooter className="flex justify-between p-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 min-w-[120px]"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Menyimpan...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      <span>Simpan</span>
                    </div>
                  )}
                </Button>
              </CardFooter>
            </Tabs>
          </form>
        </Card>
      </div>
    </div>
  );
}
