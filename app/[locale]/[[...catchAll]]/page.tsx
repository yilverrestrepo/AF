import { notFound } from "next/navigation"

export default function CatchAllPage({ params }: { params: { catchAll: string[] } }) {
  // Puedes usar params.catchAll para acceder a los segmentos capturados
  console.log(params.catchAll);
  
  // Normalmente redirigimos a 404 para rutas no encontradas
  notFound();
}
