import NavBar from "../components/navbar/navbar"
import Table from "../components/table"
import { useEffect, useState } from "react"


const TableTittle = [
    "ID",
    "Nombres",
    "Apellidos",
    "ID Departamento",
    "Sexo",
    "Cédula",
    "Dirección",
    "Télefono Casa",
    "Télefono mobil",
    "Salario Base",
    "Descuento",
    "Salario Neto",
    "Fecha de Creación",
    "Fecha de Actualización",
]
export default function Employees() {
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
                TableTittle={TableTittle}
                TableData={DataTable}
            />

        </>
    )
}
function ModalEdit(props) {
    const [deparmentName, setdeparmentName] = useState("");

    return (
        <>
            <div class="modal fade" id="ModalEdit" tabindex="-1" aria-labelledby="ModalEditLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalEditLabel">Editar Departamento</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {
                                (function () {
                                    if (props.dataToEdit !== undefined) {

                                        return (
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label">Nombre</label>
                                                <input onChange={(e) => { setdeparmentName(e.target.value) }} value={deparmentName} class="form-control" id="exampleFormControlInput1" placeholder={props.dataToEdit[1]} />
                                            </div>
                                        )
                                    } else {
                                        return <p>Por favor seleccione un departamento primero</p>

                                    }
                                })()
                            }
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => { editDepartaments(props.dataToEdit[0], deparmentName) }}>Actualizar departamento</button>
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
            if(data["Registro actualizado satisfactoriamente"]==true){
                alert("Cambios Realizados")
            }else{
                
                alert("No se puto realizar los cambios")
            }

        });

}
async function getDepartament(call) {
    var row = [];

    /* REQUEST Deparment Data */
    await fetch("http://128.199.11.216/api/employees", {
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