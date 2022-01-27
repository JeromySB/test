import NavBar from "../components/navbar/navbar"
import Table from "../components/table"
import { useEffect, useState } from "react"
import OptionsBar from "../components/optionsbar"
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

            <OptionsBar/>

            <ModalEdit
                dataToEdit={selectedData}

            />
            <ModalDelete 
                dataToDelete={selectedData}/>
            <ModalCreate />
            <Table
                tableTittle={TableTittle}
                tableData={DataTable}
                selected={handleSelection}
            />

        </>
    )
}


function ModalCreate(props) {
    const [deparmentName, setdeparmentName] = useState("");

    return (
        <>
            <div className="modal fade" id="ModalCreate" tabindex="-1" aria-labelledby="ModalCreateLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalCreateLabel">Crear Departamento</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Nombre</label>
                                <input onChange={(e) => { setdeparmentName(e.target.value) }} value={deparmentName} className="form-control" id="exampleFormControlInput1" placeholder="Nombre del Departamento" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { createDeparment(deparmentName) }}>Crear departamento</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

async function createDeparment(name) {
    /* CREATE Deparment Data  */
    await fetch("http://128.199.11.216/api/departments?DeptoName=" + name, {
        "method": "POST",
    })
        .then(response => {
            if(response.ok){
                alert("Departamento añadido")
            } else {

                alert("No se añadir el Departamento")
            }
        })
        
}


function ModalDelete(props) {

    return (
        <>
            <div className="modal fade" id="ModalDelete" tabindex="-1" aria-labelledby="ModalDeleteLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalDeleteLabel">Borrar Departamento</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                (function () {
                                    if (props.dataToDelete !== undefined) {

                                        return (
                                            <p>Seguro que desea eliminar este departamento?</p>
                                        )
                                    } else {
                                        return <p>Por favor seleccione un departamento primero</p>

                                    }
                                })()
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { deleteDeparment(props.dataToDelete[0]) }}>Borrar departamento</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

async function deleteDeparment(id) {
    /* DELETE Deparment */
    await fetch("http://128.199.11.216/api/departments/" + id, {
        "method": "DELETE",
    })
        .then(response => response.json())
        .then(data => {
            if (data["Registro borrado satisfactoriamente"] === true) {
                alert("Registro borrado satisfactoriamente")
            } else {

                alert("No se pudo borrar el registro")
            }

        });
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

    /* EDIT Deparment Data  */
    await fetch("http://128.199.11.216/api/departments/" + id + "?DeptoName=" + name, {
        "method": "PUT",
    })
        .then(response => response.json())
        .then(data => {
            if (data["Registro actualizado satisfactoriamente"] === true) {
                alert("Cambios Realizados")
            } else {

                alert("No se pudo realizar los cambios")
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

