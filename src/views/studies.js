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
    const [selectedData, setselectedData] = useState();

    useEffect(() => {
        getStudies((data) => { setDataTable(data) })
    }, []);

    const handleSelection = (data) => {
        setselectedData(data)
    }
    return (
        <>
            <NavBar />

            <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#ModalEdit">
                Editar
            </button>
            <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#ModalCreate">
                Crear
            </button>
            <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#ModalDelete">
                Borrar
            </button>

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


function ModalEdit(props) {
    const [studieNameInput, setstudieNameInput] = useState("");
    const [idEmployeeInput, setidEmployeeInput] = useState("");

    return (
        <>
            <div className="modal fade" id="ModalEdit" tabindex="-1" aria-labelledby="ModalEditLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalEditLabel">Editar Carrera</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                (function () {
                                    if (props.dataToEdit !== undefined) {

                                        return (
                                            <>
                                                <div className="mb-3">
                                                    <label for="studieNameInput" className="form-label">Carrera</label>
                                                    <input onChange={(e) => { setstudieNameInput(e.target.value) }} value={studieNameInput} className="form-control" id="studieNameInput" placeholder={props.dataToEdit[2]} />
                                                </div>
                                                <div className="mb-3">
                                                    <label for="idEmployeeInput" className="form-label">Id de Empleado</label>
                                                    <input onChange={(e) => { setidEmployeeInput(e.target.value) }} value={idEmployeeInput} className="form-control" id="idEmployeeInput" placeholder={props.dataToEdit[1]} />
                                                </div>
                                            </>
                                        )
                                    } else {
                                        return <p>Por favor seleccione un departamento primero</p>

                                    }
                                })()
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { editStudies(props.dataToEdit[0], studieNameInput, idEmployeeInput) }}>Actualizar departamento</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


function ModalCreate(props) {
    const [studieName, setstudieName] = useState("");
    const [IdEmployee, setIdEmployee] = useState("");
    
    const preventMinusande = (e) => {
        if (e.code === 'Minus') {
            e.preventDefault();
        }
        if (e.key === 'e') {
            e.preventDefault();
        }
        if (e.key === '.') {
            e.preventDefault();
        }
    };
    const preventPasteNegative = (e) => {
        const clipboardData = e.clipboardData;
        const pastedData = parseFloat(clipboardData.getData('text'));

        if (pastedData < 0) {
            e.preventDefault();
        }
    };

    return (
        <>
            <div className="modal fade" id="ModalCreate" tabindex="-1" aria-labelledby="ModalCreateLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalCreateLabel">Crear Estudio</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Nombre de Estudio</label>
                                <input onChange={(e) => { setstudieName(e.target.value) }} value={studieName} className="form-control" id="exampleFormControlInput1" placeholder="Nombre del Departamento" />
                            </div>
                            <div className="mb-3">
                                <label for="IdEmployee" className="form-label">ID De Empleado</label>
                                <input onChange={(e) => { setIdEmployee(e.target.value) }} type="number" onPaste={preventPasteNegative} onKeyPress={preventMinusande} value={IdEmployee} className="form-control" id="IdEmployee" placeholder="ID De Empleado" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { createStudie(IdEmployee, studieName) }}>Crear Estudio</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

async function createStudie(employeeid, studiename) {
    /* CREATE Studie Data  */
    var url = "http://128.199.11.216/api/studies?"
    if (employeeid !== "") {
        url += "&employeeid=" + employeeid
    }
    if (studiename !== "") {
        url += "&studiename=" + studiename
    }
    await fetch(url, {
        "method": "POST",
    })
        .then(response => {
            if(response.ok){
                alert("Carrera añadida")
            } else {

                alert("No se pudo añadir la carrera")
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
                            <h5 className="modal-title" id="ModalDeleteLabel">Borrar Estudio</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                (function () {
                                    if (props.dataToDelete !== undefined) {

                                        return (
                                            <p>Seguro que desea eliminar este carrera?</p>
                                        )
                                    } else {
                                        return <p>Por favor seleccione una carrera primero</p>

                                    }
                                })()
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { deleteStudie(props.dataToDelete[0]) }}>Borrar estudio</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

async function deleteStudie(id) {
    /* DELETE Deparment */
    await fetch("http://128.199.11.216/api/studies/" + id, {
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

async function editStudies(id, name, employeeid) {

    var url = "http://128.199.11.216/api/studies/" + id + "?"
    if (name !== "") {
        url += "&studiename=" + name
    }
    if (employeeid !== "") {
        url += "&employeeid=" + employeeid
    }
    /* REQUEST Deparment Data  */
    await fetch(url, {
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
async function getStudies(call) {
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