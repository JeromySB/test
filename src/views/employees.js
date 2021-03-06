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
    const [selectedData, setselectedData] = useState();

    useEffect(() => {
        getDepartament((data) => { setDataTable(data) })
    }, []);

    const handleSelection = (data) => {
        setselectedData(data)
        console.log(data);
    }
    return (
        <>
            <NavBar />
            <button type="button" className="btn btn-outline-primary">Primary</button>
            <button type="button" className="btn btn-outline-secondary">Secondary</button>
            <button type="button" className="btn btn-outline-success">Success</button>
            <button type="button" className="btn btn-outline-danger">Danger</button>
            <button type="button" className="btn btn-outline-warning">Warning</button>

            <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#ModalEdit">
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
    const [nameInput, setnameInput] = useState("");
    const [lastnameInput, setlastnameInput] = useState("");
    const [idDeparmentInput, setidDeparmentInput] = useState("");
    const [sexInput, setsexInput] = useState("");
    const [idNumberCardInput, setidNumberCardInput] = useState("");
    const [adressInput, setadressInput] = useState("");
    const [phoneHomeNumberInput, setphoneHomeNumberInput] = useState("");
    const [phoneNumberInput, setphoneNumberInput] = useState("");
    const [baseSalryInput, setbaseSalryInput] = useState("");
    const [netSalaryInput, setnetSalaryInput] = useState("");
    const [discountInput, setdiscountInput] = useState("");

    const preparedata = () => {
        //editEmployee(props.dataToEdit[0])
        var data = {
            "id": props.dataToEdit[0],
            "name": nameInput,
            "lastname": lastnameInput,
            "idDeparment": idDeparmentInput,
            "sex": sexInput,
            "idNumberCard": idNumberCardInput,
            "adress": adressInput,
            "phoneHomeNumber": phoneHomeNumberInput,
            "phoneNumber": phoneNumberInput,
            "baseSalry": baseSalryInput,
            "netSalary": netSalaryInput,
            "discount": discountInput,
        }

        editEmployee(data)



    }
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
            <div className="modal fade" id="ModalEdit" tabIndex="-1" aria-labelledby="ModalEditLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalEditLabel">Editar Empleado</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                (function () {
                                    if (props.dataToEdit !== undefined) {

                                        return (
                                            <>

                                                <div class="row">
                                                    <div class="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="InputName" className="form-label">Nombre</label>
                                                            <input onChange={(e) => { setnameInput(e.target.value) }} value={nameInput} className="form-control" id="InputName" placeholder={props.dataToEdit[1]} />
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastnameInput" className="form-label">Apellido</label>
                                                            <input onChange={(e) => { setlastnameInput(e.target.value) }} value={lastnameInput} className="form-control" id="lastnameInput" placeholder={props.dataToEdit[2]} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="idDeparmentInput" className="form-label">Id Departamento</label>
                                                            <input onChange={(e) => { setidDeparmentInput(e.target.value) }} type="number" onPaste={preventPasteNegative} onKeyPress={preventMinusande} value={idDeparmentInput} className="form-control" id="idDeparmentInput" placeholder={props.dataToEdit[3]} />
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="sexInput" className="form-label">Sexo</label>
                                                            <select className="form-select" value={sexInput} onChange={(e) => { setsexInput(e.target.value) }} id="sexInput" aria-label="Default select example">
                                                                <option value="M">Masculino</option>
                                                                <option value="F">Femenino</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="idNumberCardInput" className="form-label">Cedula</label>
                                                            <input onChange={(e) => { setidNumberCardInput(e.target.value) }} type="number" onPaste={preventPasteNegative} onKeyPress={preventMinusande} value={idNumberCardInput} className="form-control" id="idNumberCardInput" placeholder={props.dataToEdit[5]} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="adressInput" className="form-label">Direccion</label>
                                                            <input onChange={(e) => { setadressInput(e.target.value) }} value={adressInput} className="form-control" id="adressInput" placeholder={props.dataToEdit[6]} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="phoneHomeNumberInput" className="form-label">Numero de Telefono de Casa</label>
                                                            <input onChange={(e) => { setphoneHomeNumberInput(e.target.value) }} type="number" onPaste={preventPasteNegative} onKeyPress={preventMinusande} value={phoneHomeNumberInput} className="form-control" id="phoneHomeNumberInput" placeholder={props.dataToEdit[7]} />
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="phoneNumberInput" className="form-label">Numero de celular</label>
                                                            <input onChange={(e) => { setphoneNumberInput(e.target.value) }} type="number" onPaste={preventPasteNegative} onKeyPress={preventMinusande} value={phoneNumberInput} className="form-control" id="phoneNumberInput" placeholder={props.dataToEdit[8]} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="baseSalryInput" className="form-label">Salario base</label>
                                                            <input onChange={(e) => { setbaseSalryInput(e.target.value) }} type="number" onPaste={preventPasteNegative} onKeyPress={preventMinusande} value={baseSalryInput} className="form-control" id="baseSalryInput" placeholder={props.dataToEdit[9]} />
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="discountInput" className="form-label">Descuento</label>
                                                            <input onChange={(e) => { setdiscountInput(e.target.value) }} type="number" onPaste={preventPasteNegative} onKeyPress={preventMinusande} value={discountInput} className="form-control" id="discountInput" placeholder={props.dataToEdit[10]} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="netSalaryInput" className="form-label">Salario neto</label>
                                                            <input onChange={(e) => { setnetSalaryInput(e.target.value) }} type="number" onPaste={preventPasteNegative} onKeyPress={preventMinusande} value={netSalaryInput} className="form-control" id="netSalaryInput" placeholder={props.dataToEdit[11]} />

                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    } else {
                                        return <p>Por favor seleccione un empleado primero</p>

                                    }
                                })()
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={preparedata}>Actualizar empleado</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

async function editEmployee(data) {
    var url = "http://128.199.11.216/api/employees/" + data.id + "?"
    if (data.id !== "") {
        url += "&nombres=" + data.id
    }
    if (data.name !== "") {
        url += "&nombres=" + data.name
    }
    if (data.lastname !== "") {
        url += "&apellidos=" + data.lastname
    }
    if (data.idDeparment !== "") {
        url += "&deptoid=" + data.idDeparment
    }
    if (data.sex !== "") {
        url += "&sexo=" + data.sex
    }
    if (data.idNumberCard !== "") {
        url += "&cedula=" + data.idNumberCard
    }
    if (data.adress !== "") {
        url += "&direccion=" + data.adress
    }
    if (data.phoneHomeNumber !== "") {
        url += "&telcasa=" + data.phoneHomeNumber
    }
    if (data.phoneNumber !== "") {
        url += "&telmobil=" + data.phoneNumber
    }
    if (data.baseSalry !== "") {
        url += "&salariobase=" + data.baseSalry
    }
    if (data.netSalary !== "") {
        url += "&salarioneto=" + data.netSalary
    }
    if (data.discount !== "") {
        url += "&descuento=" + data.discount
    }
    /* REQUEST Deparment Data  */
    await fetch(url, {
        "method": "PUT",
        "body": "DeptoName=Manolo 37",
    })
        .then(response => response.json())
        .then(data => {
            if (data["Registro actualizado satisfactoriamente"] == true) {
                alert("Cambios Realizados")
            } else {

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