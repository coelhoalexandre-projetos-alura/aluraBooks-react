import { AbBotao } from "ds-alurabooks";
import { useEffect, useState } from "react";
import { IPedido } from "../../interfaces/IPedido";
import { useObterToken } from "../../hooks/tokenHooks";
import http from "../../http";
import "./Pedidos.css";
import TituloPrincipal from "../../componentes/TituloPrincipal";

const Pedidos = () => {
  const formatador = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const [pedidos, setPedidos] = useState<IPedido[]>([]);

  const token = useObterToken();

  useEffect(() => {
    http
      .get<IPedido[]>("pedidos")
      .then((resposta) => setPedidos(resposta.data))
      .catch((erro) => console.log(erro));
  }, [token]);

  const excluir = (pedido: IPedido) => {
    http
      .delete("pedidos/" + pedido.id)
      .then(() => {
        setPedidos(pedidos.filter((p) => p.id !== pedido.id));
      })
      .catch((erro) => console.log(erro));
  };

  return (
    <section className="pedidos">
      <TituloPrincipal>Meus Pedidos</TituloPrincipal>
      {pedidos.map((pedido) => (
        <div className="pedido" key={pedido.id}>
          <ul>
            <li>
              Pedido: <strong>{pedido.id}</strong>
            </li>
            <li>
              Data do pedido:
              <strong>{new Date(pedido.data).toLocaleDateString()}</strong>
            </li>
            <li>
              Valor total: <strong>{formatador.format(pedido.total)}</strong>
            </li>
            <li>
              Entrega realizada em:
              <strong>{new Date(pedido.entrega).toLocaleDateString()}</strong>
            </li>
            <li>
              <AbBotao texto="Excluir" onClick={() => excluir(pedido)} />
            </li>
          </ul>
          <AbBotao texto="Detalhes" />
        </div>
      ))}
    </section>
  );
};

export default Pedidos;
