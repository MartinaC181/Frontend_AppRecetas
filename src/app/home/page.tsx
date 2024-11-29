
import Navbar from "@/components/navbar/navbar";
import DataCarousel from "@/components/recipe/data/dataCarousel";
import Image from "next/image";

export default function HomePage() {

  return (
    <div>
      <Navbar />

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-8">Bienvenido a la página de recetas</h1>

        {/* Sección principal con carrusel e imagen */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <DataCarousel />
          <div className="flex-shrink-0 h-full w-full max-w-md md:max-w-lg lg:max-w-xl">
            <Image 
              src="/images/imagenHome.jpg" 
              alt="Image next to form" 
              className="w-full h-full rounded-lg shadow-lg object-cover" 
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
