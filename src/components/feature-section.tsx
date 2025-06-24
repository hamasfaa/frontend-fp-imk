import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  BookOpenText,
  Gift,
  ArrowRight,
} from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      name: "TrashGallery",
      icon: <ShoppingBag className="h-6 w-6" />,
      description: "Temukan nilai dari limbah!",
      href: "/trashgallery",
    },
    {
      name: "TrashRadar",
      icon: <Trash2 className="h-6 w-6" />,
      description: "Cari TPA terdekat sekarang!",
      href: "/trashradar",
    },
    {
      name: "TrashEdu",
      icon: <BookOpenText className="h-6 w-6" />,
      description: "Yuk, olah sampah jadi karya!",
      href: "/trashedu",
    },
    {
      name: "TrashPoin",
      icon: <Gift className="h-6 w-6" />,
      description: "Tukarkan poin, dapatkan hadiah!",
      href: "/trashpoin",
    },
  ];

  return (
    <section id="fitur" className="my-16 relative md:px-32">
      <div className="text-center mb-12 relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 inline-block relative elegant-underline">
          <span className="subtle-gradient-text">Fitur</span> Utama
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Jelajahi dan gunakan fitur-fitur yang tersedia untuk mendukung
          aktivitas Anda
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.name}
            href={feature.href}
            className="group relative hover-scale"
          >
            <div className="elegant-card p-6 h-full flex flex-col items-center text-center transition-all duration-300">
              <div className="p-4 rounded-2xl bg-green-50 mb-4 group-hover:scale-105 transition-transform duration-300 border border-green-200">
                <div className="text-green-600">{feature.icon}</div>
              </div>

              <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                {feature.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>

              <div className="mt-4 w-6 h-6 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100 shadow-sm">
                <ArrowRight className="h-3 w-3 text-green-600" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
