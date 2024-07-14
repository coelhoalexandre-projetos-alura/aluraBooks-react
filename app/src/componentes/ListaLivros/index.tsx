import "./ListaLivros.css";
import { useQuery } from "@tanstack/react-query";
import { ICategoria } from "../../interfaces/ICategoria";
import { obterLivros } from "../../http";
import CardLivro from "../CardLivro";

interface ListaLivrosProps {
  categoria: ICategoria;
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const { data: produtos } = useQuery({
    queryKey: ["buscaLivrosPorCategoria", categoria],
    queryFn: () => obterLivros(categoria.id),
  });

  return (
    <section className="livros">
      {produtos?.map((livro) => (
        <CardLivro livro={livro} key={livro.id} />
      ))}
    </section>
  );
};

export default ListaLivros;
