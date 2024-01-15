import "./styles.css";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import IconHome from "../../assets/icon-home.svg";
import IconClientes from "../../assets/icon-clientes.svg";
import IconCobrancas from "../../assets/icon-cobrancas.svg";
import IconHomeActive from "../../assets/icon-home-active.svg";
import IconClientesActive from "../../assets/icon-clientes-active.svg";
import IconCobrancasActive from "../../assets/icon-cobrancas-active.svg";

export default function Sidebar() {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState("");
    const { id } = useParams()

    useEffect(() => {
        const pathname = location.pathname;

        if (pathname === "/home") {
            setActiveItem("home");
        } else if (pathname === "/clientes" || pathname === `/clientes/${id}`) {
            setActiveItem("clientes");
        } else if (pathname === "/cobrancas") {
            setActiveItem("cobrancas");
        } else {
            setActiveItem("");
        }
    }, [location]);

    return (
        <div className="main-sideBar">
            <div className="container-siderBar">
                <Link to="/home">
                    <div
                        onClick={() => setActiveItem("home")}
                        className={activeItem === "home" ? 'container-sidebar-active' : 'container-sidebar'}
                    >
                        <img
                            className="img-home"
                            src={activeItem === "home" ? IconHomeActive : IconHome}
                            alt="Ícone de casa"
                        />
                        <p>Home</p>
                    </div>
                </Link>
                <Link to="/clientes">
                    <div
                        onClick={() => setActiveItem("clientes")}
                        className={activeItem === "clientes" ? 'container-sidebar-active' : 'container-sidebar'}
                    >
                        <img
                            src={activeItem === "clientes" ? IconClientesActive : IconClientes}
                            alt="Ícone de clientes"
                        />
                        <p>Clientes</p>
                    </div>
                </Link>
                <Link to="/cobrancas">
                    <div onClick={() => setActiveItem("cobrancas")}
                        className={activeItem === "cobrancas" ? 'container-sidebar-active' : 'container-sidebar'}
                    >
                        <img src={activeItem === "cobrancas" ? IconCobrancasActive : IconCobrancas}
                            alt="Ícone de cobranças" />
                        <p>Cobranças</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
