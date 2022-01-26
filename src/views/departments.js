import NavBar from "../components/navbar/navbar"
import Table from "../components/table"
import { useEffect, useState } from "react"

/* This is to define the titles on the table */
const TableTittle = [
    "ID",
    "Departamento",
    "Fecha de Creación",
    "Fecha de Actualización",
]


export default function ViewDepartments() {
    const [DataTable, setDataTable] = useState([]);

    useEffect(() => {
        getDepartament((data)=>{setDataTable(data)})
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
                TableTittle={TableTittle}
                TableData={DataTable}
            />

        </>
    )
}

async function getDepartament(call) {
    var row = [];

    /* REQUEST Deparment Data */
    await fetch("http://128.199.11.216/api/departments", {
        "method": "GET",
    })
    .then(response => response.json())
    .then(data => {
        data.forEach((element, index) => {
            row.push(Object.values(element))
        });
        call(row);

    });

}