import "./styles.css"
import Header from "../../components/Header"
import Sidebar from "../../components/SideBar"
import { Box } from "@mui/material"
import ClientData from "../../components/Tables/ClientData"
import ClientCharges from "../../components/Tables/ClientCharges"

export default function ClientDetails() {

    return (
        <div className="main-detalhar-cliente">
            <Sidebar />
            <main className="container-main">
                <div className='container-header'>
                    <Header />
                </div>
                <div className="container-detalhes-cliente ">
                    <ClientData />
                    <div className="table-client-details">
                        <ClientCharges />
                    </div>
                </div>
            </main>
        </div >
    )
}