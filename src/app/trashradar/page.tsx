"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
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
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useMemo } from "react";

interface TPA {
  id: string;
  name: string;
  address: string;
  distance: number | null;
  coordinates: { lat: number; lng: number };
}

const getDistance = (
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
) => {
  const R = 6371; // Radius bumi dalam km
  const dLat = (to.lat - from.lat) * (Math.PI / 180);
  const dLng = (to.lng - from.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(from.lat * (Math.PI / 180)) *
      Math.cos(to.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function TPATerdekatPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTPA, setIsLoadingTPA] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"distance" | "name">("distance");
  const [allTpa, setAllTpa] = useState<TPA[]>([]);
  const [filteredTpa, setFilteredTpa] = useState<TPA[]>([]);
  const [selectedTPA, setSelectedTPA] = useState<number | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

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

  useEffect(() => {
    if (isLoaded && location) {
      setIsLoadingTPA(true);
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );

      const request = {
        location: location,
        radius: 10000, // 10km
        keyword: "Tempat Pembuangan Akhir, TPA, Bank Sampah, Pusat Daur Ulang",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const tpaResults: TPA[] = results.map((place) => ({
            id: place.place_id || new Date().toISOString(),
            name: place.name || "Nama tidak tersedia",
            address: place.vicinity || "Alamat tidak tersedia",
            coordinates: {
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
            },
            distance: place.geometry?.location
              ? parseFloat(
                  getDistance(location, {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  }).toFixed(1)
                )
              : null,
          }));
          setAllTpa(tpaResults);
        } else {
          console.error("Places API search failed:", status);
        }
        setIsLoadingTPA(false);
      });
    }
  }, [isLoaded, location]);

  useEffect(() => {
    let results = [...allTpa];

    if (searchQuery) {
      results = results.filter(
        (tpa) =>
          tpa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tpa.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    results.sort((a, b) => {
      if (sortBy === "distance") {
        return (a.distance || 999) - (b.distance || 999);
      }
      return a.name.localeCompare(b.name);
    });

    setFilteredTpa(results);
  }, [searchQuery, sortBy, allTpa]);

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

  const handleMarkerClick = (tpaId: string) => {
    setSelectedTPA(tpaId);
  };

  const handleDirectionsClick = (coords: { lat: number; lng: number }) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`;
    window.open(url, "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
          <h3 className="text-lg font-medium">Mendapatkan Lokasi Anda...</h3>
          <p className="text-muted-foreground">Harap tunggu sebentar</p>
        </div>
      </div>
    );
  }

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

          <TabsContent value="list">
            {isLoadingTPA ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-medium">Mencari TPA Terdekat...</h3>
              </div>
            ) : filteredTpa.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTpa.map((tpa) => (
                  <Card
                    key={tpa.id}
                    className={`overflow-hidden transition-all hover:shadow-lg cursor-pointer ${
                      selectedTPA === tpa.id ? "ring-2 ring-green-600" : ""
                    }`}
                    onClick={() => handleMarkerClick(tpa.id)}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{tpa.name}</CardTitle>
                        {tpa.distance !== null && (
                          <Badge className="bg-green-600 shrink-0 ml-2">
                            {tpa.distance} km
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-start pt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-muted-foreground shrink-0" />
                        <span className="break-words">{tpa.address}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="pt-2 flex justify-end">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDirectionsClick(tpa.coordinates);
                          }}
                        >
                          <Navigation className="h-3.5 w-3.5 mr-1.5" />
                          Petunjuk Arah
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">
                  Tidak ada TPA ditemukan
                </h3>
                <p className="text-muted-foreground">
                  Coba perlebar area pencarian atau gunakan kata kunci lain.
                </p>
              </div>
            )}
          </TabsContent>

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

                      {filteredTpa.map((tpa) => (
                        <MarkerF
                          key={tpa.id}
                          position={tpa.coordinates}
                          onClick={() => handleMarkerClick(tpa.id)}
                        >
                          {selectedTPA === tpa.id && (
                            <InfoWindowF
                              position={tpa.coordinates}
                              onCloseClick={() => setSelectedTPA(null)}
                            >
                              <div className="p-1">
                                <h4 className="font-bold">{tpa.name}</h4>
                                <p>{tpa.address}</p>
                                <p className="font-semibold">
                                  {tpa.distance} km
                                </p>
                              </div>
                            </InfoWindowF>
                          )}
                        </MarkerF>
                      ))}
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
