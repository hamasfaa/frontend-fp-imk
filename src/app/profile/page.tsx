"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Star, Award, Edit3, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useMe } from "./hooks/useMe";

export default function ProfilePage() {
  const { user, loading, error } = useMe();

  if (loading) {
    return <div className="text-center text-gray-500">Memuat profil...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Terjadi kesalahan: {error}</div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Profil Saya
            </h1>
            <p className="text-gray-600">
              Kelola informasi profil dan aktivitas akun Anda
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info Card */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage
                        src="/placeholder.svg?height=96&width=96"
                        alt="Profile"
                      />
                      <AvatarFallback className="text-xl bg-green-100 text-green-700">
                        BS
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-green-600 text-white p-1.5 rounded-full">
                      <Camera className="h-3 w-3" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-gray-800">
                    {user?.firstName} {user?.lastName}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    @{user?.username}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{user?.phone}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{user?.address}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-2">
                    <Button
                      asChild
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Link
                        href="/profile/edit"
                        className="flex items-center justify-center"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profil
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Rank & Points Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 text-white mx-auto mb-4" />
                    <p className="text-3xl font-bold mb-2">Peringkat</p>
                    <p className="text-green-100 mb-4 text-3xl">{user?.rank}</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
                  <CardContent className="p-6 text-center">
                    <Star className="h-12 w-12 text-white mx-auto mb-4" />
                    <p className="text-3xl font-bold mb-2">{user?.points}</p>
                    <p className="text-yellow-100 mb-4">Total Poin Reward</p>
                  </CardContent>
                </Card>
              </div>

              {/* Motivational Messages */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Terus Semangat, Eco Hero! 🚀
                  </h3>
                  <p className="text-lg mb-4">
                    "Setiap sampah yang Anda kelola adalah langkah kecil menuju
                    bumi yang lebih bersih dan sehat."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
