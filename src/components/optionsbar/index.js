import "./index.css"

export default function OptionsBar(params) {
    return (
        <div id="optionsbarContainer">
            <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#ModalEdit">
                Editar
            </button>
            <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#ModalCreate">
                Crear
            </button>
            <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#ModalDelete">
                Borrar
            </button>
        </div>

    )
}