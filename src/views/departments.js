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
    const [selectedData, setselectedData] = useState();

    useEffect(() => {
        getDepartament((data) => { setDataTable(data) })
    }, []);

    const handleSelection = (data) => {
        setselectedData(data)
    }
    return (
        <>
            <NavBar />
            <button type="button" className="btn btn-outline-primary">Primary</button>
            <button type="button" className="btn btn-outline-secondary">Secondary</button>
            <button type="button" className="btn btn-outline-success">Success</button>
            <button type="button" className="btn btn-outline-danger">Danger</button>

            <button type="button"className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#ModalEdit">
                Editar
            </button>

            <ModalEdit
                dataToEdit={selectedData}

            />
            <Table
                tableTittle={TableTittle}
                tableData={DataTable}
                selected={handleSelection}
            />

        </>
    )
}


function ModalEdit(props) {
    const [deparmentName, setdeparmentName] = useState("");

    return (
        <>
            <div className="modal fade" id="ModalEdit" tabindex="-1" aria-labelledby="ModalEditLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalEditLabel">Editar Departamento</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                (function () {
                                    if (props.dataToEdit !== undefined) {

                                        return (
                                            <div className="mb-3">
                                                <label for="exampleFormControlInput1" className="form-label">Nombre</label>
                                                <input onChange={(e) => { setdeparmentName(e.target.value) }} value={deparmentName} className="form-control" id="exampleFormControlInput1" placeholder={props.dataToEdit[1]} />
                                            </div>
                                        )
                                    } else {
                                        return <p>Por favor seleccione un departamento primero</p>

                                    }
                                })()
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { editDepartaments(props.dataToEdit[0], deparmentName) }}>Actualizar departamento</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

async function editDepartaments(id, name) {

    /* REQUEST Deparment Data  */
    await fetch("http://128.199.11.216/api/departments/" + id + "?DeptoName=" + name, {
        "method": "PUT",
        "body": "DeptoName=Manolo 37",
    })
        .then(response => response.json())
        .then(data => {
            if (data["Registro actualizado satisfactoriamente"] === true) {
                alert("Cambios Realizados")
            } else {

                alert("No se puto realizar los cambios")
            }

        });

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

