"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  Info,
  Trash2,
  Search,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";

export default function TPATerdekatPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"distance" | "name">("distance");
  const [selectedTPA, setSelectedTPA] = useState<number | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      "AIzaSyAsMgD7L2M54sa1tAZk0dEN2zuP-EOccr8",
    libraries: ["places"],
  });

  // Mendapatkan lokasi pengguna saat komponen dimuat
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError(
            "Tidak dapat mengakses lokasi. Pastikan GPS aktif dan izin diberikan."
          );
          setIsLoading(false);
        }
      );
    } else {
      setLocationError("Browser Anda tidak mendukung geolokasi.");
      setIsLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   let filteredTPA = [...tpaData];

  //   // Filter berdasarkan pencarian
  //   if (searchQuery) {
  //     filteredTPA = filteredTPA.filter(
  //       (tpa) =>
  //         tpa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         tpa.address.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   }

  //   // Urutkan berdasarkan jarak atau nama
  //   filteredTPA.sort((a, b) => {
  //     if (sortBy === "distance") {
  //       return a.distance - b.distance;
  //     } else {
  //       return a.name.localeCompare(b.name);
  //     }
  //   });

  //   setTpaList(filteredTPA);
  // }, [searchQuery, sortBy]);

  const refreshLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      setLocationError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError(
            "Tidak dapat mengakses lokasi Anda. Pastikan GPS diaktifkan dan izin lokasi diberikan."
          );
          setIsLoading(false);
        }
      );
    }
  };

  const mapCenter = useMemo(
    () => location || { lat: -6.2088, lng: 106.8456 },
    [location]
  );

  if (loadError) {
    return (
      <Alert variant="destructive" className="m-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Kesalahan Peta</AlertTitle>
        <AlertDescription>
          Gagal memuat Google Maps. Pastikan API Key valid dan koneksi internet
          stabil.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">TrashRadar</h1>
        <p className="text-muted-foreground">
          Gunakan lokasi GPS Anda untuk menemukan Tempat Pembuangan Akhir (TPA)
          terdekat
        </p>
      </div>

      {locationError && (
        <Alert variant="destructive" className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Kesalahan Lokasi</AlertTitle>
          <AlertDescription>{locationError}</AlertDescription>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshLocation}
            className="mt-2"
          >
            Coba Lagi
          </Button>
        </Alert>
      )}

      <div className="flex flex-col md:flex-row items-stretch gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Cari TPA berdasarkan nama atau alamat..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <select
            className="px-3 py-2 rounded-md border border-input bg-background"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "distance" | "name")}
          >
            <option value="distance">Urutkan: Terdekat</option>
            <option value="name">Urutkan: Nama</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
          <h3 className="text-lg font-medium">Mendapatkan Lokasi Anda...</h3>
          <p className="text-muted-foreground">Harap tunggu sebentar</p>
        </div>
      ) : (
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="list">
              <Trash2 className="h-4 w-4 mr-2" />
              Daftar TPA
            </TabsTrigger>
            <TabsTrigger value="map">
              <MapPin className="h-4 w-4 mr-2" />
              Peta
            </TabsTrigger>
          </TabsList>

          {/* <TabsContent value="list">
            {tpaList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tpaList.map((tpa) => (
                  <Card
                    key={tpa.id}
                    className={`overflow-hidden transition-all hover:shadow-md ${
                      selectedTPA === tpa.id ? "ring-2 ring-green-600" : ""
                    }`}
                    onClick={() => setSelectedTPA(tpa.id)}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{tpa.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            {tpa.address}
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-600">
                          {tpa.distance} km
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{tpa.operationalHours}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{tpa.phone}</span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600"
                          >
                            <Phone className="h-3.5 w-3.5 mr-1.5" />
                            Hubungi
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Navigation className="h-3.5 w-3.5 mr-1.5" />
                            Petunjuk Arah
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">
                  Tidak ada TPA yang ditemukan
                </h3>
              </div>
            )}
          </TabsContent> */}

          <TabsContent value="map">
            <Card>
              <CardContent className="p-0">
                <div className="relative w-full h-[500px] bg-muted rounded-md overflow-hidden">
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerClassName="w-full h-full"
                      center={mapCenter}
                      zoom={14}
                    >
                      {location && (
                        <MarkerF
                          position={location}
                          icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                          }}
                        />
                      )}
                    </GoogleMap>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
