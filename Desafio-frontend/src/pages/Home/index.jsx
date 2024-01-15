import "./styles.css"
import DelinquentClients from "../../components/Tables/DelinquentClients"
import Siderbar from "../../components/SideBar"
import Header from "../../components/Header"
import UpdatedClients from "../../components/Tables/UpdatedClients"
import PaidCharges from "../../components/Tables/PaidCharges"
import ExpectedCharges from "../../components/Tables/ExpectedCharges"
import OverdueCharges from "../../components/Tables/OverdueCharges"


export default function Home() {
    return (
        <div className="main-home">
            <Siderbar />
            <main className="container-main">
                <div className='container-header'>
                    <Header />
                </div>
                <div className='home-tables' >
                    <div className="container-charges-tables" >
                        <PaidCharges />
                        <OverdueCharges />
                        <ExpectedCharges />
                    </div >
                    <div className="container-clients-tablet">
                        <DelinquentClients />
                        <UpdatedClients />
                    </div>
                </div>
            </main>
        </div >
    )
}