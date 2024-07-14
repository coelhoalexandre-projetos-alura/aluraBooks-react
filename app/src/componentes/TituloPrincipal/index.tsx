import "./TituloPrincipal.css";

interface TituloPrincipalProps {
  children: string;
}
const TituloPrincipal = ({ children }: TituloPrincipalProps) => {
  return <h1 className="TituloPrincipal">{children}</h1>;
};

export default TituloPrincipal;
