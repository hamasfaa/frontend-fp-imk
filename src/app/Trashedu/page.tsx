import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Newspaper, Video, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
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

// Mock data for articles
const articles = [
  {
    id: 1,
    title: "Indonesia Berhasil Kurangi Sampah Plastik 30% dalam 2 Tahun",
    excerpt:
      "Program nasional pengurangan sampah plastik menunjukkan hasil positif dengan penurunan signifikan dalam dua tahun terakhir.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Nasional",
    date: "10 April 2024",
    readTime: "5 menit",
  },
  {
    id: 2,
    title: "Inovasi Baru: Plastik yang Dapat Terurai dalam 6 Bulan",
    excerpt:
      "Peneliti Indonesia berhasil mengembangkan plastik ramah lingkungan yang dapat terurai sempurna dalam waktu 6 bulan.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Teknologi",
    date: "5 April 2024",
    readTime: "8 menit",
  },
  {
    id: 3,
    title: "Bank Sampah Jakarta Kumpulkan 100 Ton Sampah Daur Ulang",
    excerpt:
      "Bank Sampah di Jakarta berhasil mengumpulkan 100 ton sampah yang berpotensi didaur ulang dalam program terbaru mereka.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Lokal",
    date: "1 April 2024",
    readTime: "6 menit",
  },
  {
    id: 4,
    title: "Pemerintah Luncurkan Kebijakan Baru Pengelolaan Sampah",
    excerpt:
      "Kementerian Lingkungan Hidup dan Kehutanan meluncurkan kebijakan baru untuk mendorong pengelolaan sampah yang lebih baik.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Kebijakan",
    date: "28 Maret 2024",
    readTime: "7 menit",
  },
  {
    id: 5,
    title: "Komunitas Peduli Sampah Bersihkan Pantai Kuta",
    excerpt:
      "Ratusan relawan dari komunitas peduli sampah melakukan aksi bersih-bersih di Pantai Kuta, Bali.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Komunitas",
    date: "25 Maret 2024",
    readTime: "4 menit",
  },
  {
    id: 6,
    title: "Studi: 70% Sampah di Laut Indonesia Berasal dari Daratan",
    excerpt:
      "Penelitian terbaru mengungkapkan bahwa mayoritas sampah di laut Indonesia berasal dari aktivitas di daratan.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Penelitian",
    date: "20 Maret 2024",
    readTime: "9 menit",
  },
];

// Mock data for videos
const videos = [
  {
    id: 1,
    title: "Investigasi: Aliran Sampah Plastik dari Kota ke Laut",
    excerpt:
      "Dokumenter investigasi yang mengikuti perjalanan sampah plastik dari kota-kota besar hingga berakhir di laut.",
    thumbnail: "/placeholder.svg?height=200&width=400",
    duration: "15:24",
    date: "12 April 2024",
  },
  {
    id: 2,
    title: "Wawancara Eksklusif dengan Menteri LHK tentang Kebijakan Sampah",
    excerpt:
      "Menteri Lingkungan Hidup dan Kehutanan berbicara tentang kebijakan pengelolaan sampah terbaru.",
    thumbnail: "/placeholder.svg?height=200&width=400",
    duration: "10:15",
    date: "8 April 2024",
  },
  {
    id: 3,
    title: "Liputan Khusus: TPA Bantar Gebang dari Udara",
    excerpt:
      "Melihat kondisi terkini TPA terbesar di Indonesia dari pandangan udara dengan drone.",
    thumbnail: "/placeholder.svg?height=200&width=400",
    duration: "12:30",
    date: "3 April 2024",
  },
];

export default function BeritaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">TrashEdu</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Dapatkan informasi terbaru seputar pengelolaan sampah dan inovasi daur
          ulang
        </p>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            Artikel
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Video
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{article.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {article.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-muted-foreground">{article.excerpt}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/berita/articles/${article.id}`}>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-green-600 hover:text-green-700"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline">Lihat Semua Berita</Button>
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="relative h-48 w-full group">
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                      <Video className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xl">{video.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {video.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-muted-foreground">{video.excerpt}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/berita/videos/${video.id}`}>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-green-600 hover:text-green-700"
                    >
                      Tonton Video
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline">Lihat Semua Video</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
