"use client";

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
import { useArticles } from "./hooks/useArticles";
import { useVideos } from "./hooks/useVideos";

export default function BeritaPage() {
  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
  } = useArticles();
  const {
    videos,
    loading: videosLoading,
    error: videosError,
  } = useVideos("Daur ulang sampah");

  if (articlesLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Memuat artikel...</p>
      </div>
    );
  }

  if (articlesError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <p>Error: {articlesError}. Gagal memuat artikel.</p>
      </div>
    );
  }

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
                  <Link
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
          {videosLoading ? (
            <div className="text-center py-12">
              <p>Memuat video...</p>
            </div>
          ) : videosError ? (
            <div className="text-center py-12 text-red-500">
              <p>Error: {videosError}. Gagal memuat video.</p>
            </div>
          ) : (
            <>
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
                      <p className="text-muted-foreground line-clamp-2">
                        {video.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link
                        href={video.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
