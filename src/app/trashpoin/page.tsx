"use client";

import { DialogFooter } from "@/components/ui/dialog";

import { useState } from "react";
import Image from "next/image";
import { Gift, Search, Info, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLeaderboard } from "./hooks/useLeaderboard";

const userPoints = 1200; // Poin pengguna, bisa diambil dari state atau context
const userRank = 5; // Peringkat pengguna, bisa diambil dari state atau

// Data hadiah reward
const rewards = [
  {
    id: 1,
    title: "Voucher Belanja Rp 50.000",
    points: 500,
    image: "/placeholder.svg?height=200&width=200",
    category: "Voucher",
    expiry: "30 hari setelah penukaran",
    description:
      "Voucher belanja senilai Rp 50.000 yang dapat digunakan di marketplace Bank Sampah.",
    stock: 50,
  },
  {
    id: 2,
    title: "Tas Belanja Ramah Lingkungan",
    points: 300,
    image: "/placeholder.svg?height=200&width=200",
    category: "Produk",
    expiry: "Tidak ada",
    description:
      "Tas belanja ramah lingkungan yang terbuat dari bahan daur ulang.",
    stock: 25,
  },
  {
    id: 3,
    title: "Tumbler Eco-Friendly",
    points: 450,
    image: "/placeholder.svg?height=200&width=200",
    category: "Produk",
    expiry: "Tidak ada",
    description:
      "Tumbler ramah lingkungan dengan desain eksklusif Bank Sampah.",
    stock: 30,
  },
  {
    id: 4,
    title: "Diskon 20% untuk Pembelian Berikutnya",
    points: 200,
    image: "/placeholder.svg?height=200&width=200",
    category: "Diskon",
    expiry: "14 hari setelah penukaran",
    description:
      "Kupon diskon 20% untuk pembelian produk di marketplace Bank Sampah.",
    stock: 100,
  },
  {
    id: 5,
    title: "Bibit Tanaman",
    points: 150,
    image: "/placeholder.svg?height=200&width=200",
    category: "Produk",
    expiry: "Tidak ada",
    description:
      "Bibit tanaman untuk ditanam di rumah atau lingkungan sekitar.",
    stock: 40,
  },
  {
    id: 6,
    title: "Donasi untuk Penanaman Pohon",
    points: 250,
    image: "/placeholder.svg?height=200&width=200",
    category: "Donasi",
    expiry: "Tidak ada",
    description: "Donasi untuk program penanaman pohon di area kritis.",
    stock: 999,
  },
];

export default function RewardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("points-low");
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    leaderboard,
    loading: loadingLeaderboard,
    error: leaderboardError,
  } = useLeaderboard();

  // Filter dan urutkan rewards
  const filteredRewards = rewards
    .filter((reward) => {
      // Filter berdasarkan pencarian
      const matchesSearch = reward.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Filter berdasarkan kategori
      const matchesCategory =
        selectedCategory === "all" || reward.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Urutkan berdasarkan poin atau nama
      if (sortBy === "points-low") {
        return a.points - b.points;
      } else if (sortBy === "points-high") {
        return b.points - a.points;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  // Fungsi untuk menukarkan poin
  const redeemPoints = (rewardId: number) => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) return;

    setSelectedReward(rewardId);
    setIsDialogOpen(true);
  };

  // Fungsi untuk konfirmasi penukaran poin
  const confirmRedemption = () => {
    // Logika penukaran poin akan ditambahkan di sini
    setIsDialogOpen(false);
    alert("Penukaran poin berhasil! Hadiah akan segera diproses.");
  };

  // Fungsi untuk mendapatkan badge warna berdasarkan peringkat
  const getRankBadgeColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-yellow-500 text-yellow-950";
      case 1:
        return "bg-gray-300 text-gray-950";
      case 2:
        return "bg-amber-600 text-amber-950";
      default:
        return "bg-green-100 text-green-950";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">TrashPoin</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Kumpulkan poin dari aktivitas dan tukarkan dengan berbagai hadiah
          menarik
        </p>
      </div>

      <div className="bg-green-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Gift className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-800">Poin Anda</h2>
              <p className="text-3xl font-bold text-green-600">
                {userPoints} poin
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-800">
                Peringkat Anda
              </h2>
              <p className="text-3xl font-bold text-green-600">{userRank}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="rewards" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="rewards" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            Katalog Hadiah
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rewards">
          <div className="flex flex-col md:flex-row items-stretch gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari hadiah..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="points-low">
                    Poin: Rendah ke Tinggi
                  </SelectItem>
                  <SelectItem value="points-high">
                    Poin: Tinggi ke Rendah
                  </SelectItem>
                  <SelectItem value="name">Nama</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="Voucher">Voucher</SelectItem>
                  <SelectItem value="Produk">Produk</SelectItem>
                  <SelectItem value="Diskon">Diskon</SelectItem>
                  <SelectItem value="Donasi">Donasi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredRewards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden">
                  <div className="relative h-48 w-full bg-muted flex items-center justify-center">
                    <Image
                      src={reward.image || "/placeholder.svg"}
                      alt={reward.title}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600">
                      {reward.points} poin
                    </Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{reward.category}</Badge>
                    </div>
                    <CardTitle className="text-xl">{reward.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Stok: {reward.stock} • Berlaku: {reward.expiry}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-muted-foreground">
                      {reward.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      className={`w-full ${
                        userPoints >= reward.points
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                      disabled={userPoints < reward.points}
                      onClick={() => redeemPoints(reward.id)}
                    >
                      {userPoints >= reward.points
                        ? "Tukarkan Poin"
                        : "Poin Tidak Cukup"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">
                Tidak ada hadiah yang ditemukan
              </h3>
              <p className="text-muted-foreground mb-4">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Reset Filter
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="leaderboard">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold">Leaderboard Pengguna</h2>
                <p className="text-sm text-muted-foreground">
                  Pengguna dengan poin tertinggi dari aktivitas daur ulang
                </p>
              </div>
            </div>

            {/* Top 3 Leaderboard */}
            <div className="p-6 bg-green-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {leaderboard.slice(0, 3).map((user, index) => (
                  <Card
                    key={user.rank}
                    className={`${
                      index === 0
                        ? "md:order-2"
                        : index === 1
                        ? "md:order-1"
                        : "md:order-3"
                    }`}
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${getRankBadgeColor(
                          user.rank - 1
                        )}`}
                      >
                        {user.rank - 1 === 0 ? (
                          <Trophy className="h-6 w-6" />
                        ) : (
                          <span className="text-lg font-bold">{user.rank}</span>
                        )}
                      </div>
                      <Avatar className="h-20 w-20 mb-4">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.username}
                        />
                        <AvatarFallback>
                          {user.firstname.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg">
                        {user.firstname} {user.lastname}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        @{user.username}
                      </p>
                      <p className="text-3xl font-bold text-green-600 mb-2">
                        {user.points.toLocaleString()} poin
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Peringkat</th>
                    <th className="text-left p-4 font-medium">Pengguna</th>
                    <th className="text-left p-4 font-medium">Poin</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user, index) => (
                    <tr
                      key={user.username}
                      className="border-b hover:bg-muted/50"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              user.rank - 1 < 3
                                ? getRankBadgeColor(user.rank - 1)
                                : "bg-muted"
                            }`}
                          >
                            {user.rank}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.username}
                            />
                            <AvatarFallback>
                              {user.firstname.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {user.firstname} {user.lastname}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-medium">
                        {user.points.toLocaleString()} poin
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Total {leaderboard.length} pengguna
                  </span>
                </div>
                <Button variant="outline" size="sm" className="text-sm">
                  Lihat Semua
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog konfirmasi penukaran poin */}
      {selectedReward && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Konfirmasi Penukaran Poin</DialogTitle>
              <DialogDescription>
                Anda akan menukarkan poin dengan hadiah berikut:
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-4 py-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                <Image
                  src={
                    rewards.find((r) => r.id === selectedReward)?.image ||
                    "/placeholder.svg"
                  }
                  alt={
                    rewards.find((r) => r.id === selectedReward)?.title || ""
                  }
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">
                  {rewards.find((r) => r.id === selectedReward)?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {rewards.find((r) => r.id === selectedReward)?.points} poin
                </p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 text-sm flex items-start gap-2">
              <Info className="h-5 w-5 flex-shrink-0 text-amber-500" />
              <p>
                Penukaran poin tidak dapat dibatalkan. Pastikan Anda telah
                memilih hadiah yang tepat.
              </p>
            </div>
            <DialogFooter className="flex gap-2 sm:justify-between">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={confirmRedemption}
              >
                Konfirmasi Penukaran
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
