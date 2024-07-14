import TituloPrincipal from "../../componentes/TituloPrincipal";
import { obterCategoria } from "../../http";
import { useParams } from "react-router-dom";
import Loader from "../../componentes/Loader";
import { useQuery } from "@tanstack/react-query";
import ListaLivros from "../../componentes/ListaLivros";

const Categoria = () => {
  const params = useParams();

  const { data: categoria, isLoading } = useQuery({
    initialData: null,
    queryKey: ["categoriaPorSlug", params.slug],
    queryFn: () => obterCategoria(params.slug || ""),
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loader />
      </div>
    );
  }

  return (
    <section>
      <TituloPrincipal>{categoria?.nome ?? ""}</TituloPrincipal>
      <ListaLivros categoria={categoria!} />
    </section>
  );
};

export default Categoria;
