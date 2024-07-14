import { Link, Outlet } from "react-router-dom";

import "./AreaLogada.css";
import TituloPrincipal from "../../componentes/TituloPrincipal";

const AreaLogada = () => {
  return (
    <>
      <TituloPrincipal>Minha conta</TituloPrincipal>
      <section className="AreaLogada">
        <div className="menu">
          <ul className="navegacao">
            <li>
              <Link to="/area-logada/pedidos">Pedidos</Link>
            </li>
            <li>
              <Link to="/area-logada/trocas">Trocas</Link>
            </li>
            <li>
              <Link to="/area-logada/cupons">Cupons</Link>
            </li>
            <li>
              <Link to="/area-logada/dados">Seus dados</Link>
            </li>
          </ul>
        </div>
        <div className="conteudo">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default AreaLogada;
