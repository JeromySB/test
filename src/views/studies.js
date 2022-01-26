import NavBar from "../components/navbar/navbar"
import Table from "../components/table"
import { useEffect, useState } from "react"

const TableTittle = [
    "ID",
    "ID Del empleado",
    "Carrera",
    "Fecha de Creación",
    "Fecha de Actualización",
]
export default function Studies() {
    const [DataTable, setDataTable] = useState([]);

    useEffect(() => {
        getDepartament((data) => { setDataTable(data) })
    }, []);
    return (
        <>
            <NavBar />
            <button type="button" className="btn btn-outline-primary">Primary</button>
            <button type="button" className="btn btn-outline-secondary">Secondary</button>
            <button type="button" className="btn btn-outline-success">Success</button>
            <button type="button" className="btn btn-outline-danger">Danger</button>
            <button type="button" className="btn btn-outline-warning">Warning</button>
            <Table
                tableTittle={TableTittle}
                tableData={DataTable}
            />

        </>
    )
}

async function getDepartament(call) {
    var row = [];

    /* REQUEST Deparment Data */
    await fetch("http://128.199.11.216/api/studies", {
        "method": "GET",
    })
        .then(response => response.json())
        .then(data => {
            data.forEach((element) => {
                row.push(Object.values(element))
            });
            call(row);

        });

}