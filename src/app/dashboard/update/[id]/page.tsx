"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { useToast } from "@/components/ui/use-toast";
import { useProduct } from "./hooks/useProduct";

export default function UpdateProductPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const productId = params.id as string;

  const { product, loading, error, updateProduct } = useProduct(productId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const newImageFile = useRef<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    if (product) {
      console.log("SELECT VALUE DARI BACKEND:", product.data.category);
      setFormData({
        title: product.data.name || "",
        category: product.data.category || "",
        quantity: product.data.quantity?.toString() || "",
        price: product.data.price?.toString() || "",
      });

      setPreviewImage(product.data.image || null);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      newImageFile.current = file;
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    newImageFile.current = null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const result = await updateProduct({
        name: formData.title,
        category: formData.category,
        quantity: parseInt(formData.quantity || "0"),
        price: parseInt(formData.price || "0"),
        image: newImageFile.current || undefined,
      });

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
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menambahkan produk",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Memuat data produk...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <p>{error}</p>
        <Button onClick={() => router.push("/dashboard")} className="mt-4">
          Kembali ke Dashboard
        </Button>
      </div>
    );
  }

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
              Perbarui Produk
            </CardTitle>
            <CardDescription>
              Ubah informasi produk sesuai kebutuhan untuk menjaga keakuratan
              dan kemudahan pembeli dalam menemukan produk Anda
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
                      {formData.category !== "" ? (
                        <Select
                          value={formData.category}
                          onValueChange={handleSelectChange}
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
                      ) : (
                        <div className="h-10 bg-gray-100 rounded animate-pulse mt-1.5"></div>
                      )}
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
                      <Label className="text-base mb-3 block">
                        Foto Produk
                      </Label>
                      <div className="flex gap-4 items-start">
                        {previewImage && (
                          <div className="relative aspect-square w-32 rounded-lg overflow-hidden border">
                            <Image
                              src={previewImage}
                              alt="Pratinjau produk"
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
                        )}
                        <label className="aspect-square w-32 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                          <Upload className="h-6 w-6 text-gray-400 mb-1" />
                          <span className="text-xs text-center text-gray-500">
                            {previewImage ? "Ganti Foto" : "Upload Foto"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Biarkan kosong jika tidak ingin mengganti foto.
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      <span>Simpan Perubahan</span>
                    </>
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
