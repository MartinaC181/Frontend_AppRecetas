import { CardWithForm } from "@/components/form/addRecipeForm";
import Navbar from "@/components/navbar/navbar";
import DataCarousel from "@/components/recipe/data/dataCarousel";

export default function HomePage() {
<<<<<<< HEAD
  return (
    <div>
      <Navbar />

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-8">Bienvenido a la página de recetas</h1>

        {/* Sección principal con carrusel e imagen */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <DataCarousel />
          <div className="flex-shrink-0 h-full w-full max-w-md md:max-w-lg lg:max-w-xl">
            <img 
              src="https://content.clara.es/medio/2021/02/11/100-recetas-saludables-con-5-ingredientes-pescado_819c7ea7_1280x720.jpg" 
              alt="Image next to form" 
              className="w-full h-full rounded-lg shadow-lg object-cover" 
            />
          </div>
        </div>

        {/* Sección de formulario */}
        <div className="flex flex-col md:flex-row justify-center items-center">
          <CardWithForm />
        </div>
      </div>
    </div>
  );
=======
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="flex flex-col justify-between items-center flex-1 p-8">
                <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
                    <DataCarousel />
                    <div className="flex-shrink-0 h-full w-full max-w-md md:max-w-lg lg:max-w-xl">
                        <img src="https://content.clara.es/medio/2021/02/11/100-recetas-saludables-con-5-ingredientes-pescado_819c7ea7_1280x720.jpg" 
                        alt="Image next to form" 
                        className="w-full h-full rounded-lg shadow-lg object-cover" />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center">
                    <CardWithForm />
                </div>
            </div>
        </div>
    );
>>>>>>> develop
}
