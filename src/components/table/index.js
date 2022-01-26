import React, { useState } from "react";
import "./index.css"

export default function Table(props) {
    const [Selected, setSelected] = useState();


    /* CheckBox Handler */
    function handleSelected(rowId) {

        if (rowId !== Selected) {
            setSelected(rowId);
            props.selected(props.tableData[rowId])
        } else {
            props.selected()
            setSelected();
        }
    }
    return (
        <table className="table table-hover">
            <thead>
                <tr>

                    <th className="colCheckBox">
                        <input className="form-check-input" checked={Selected >= 0} type="checkbox" value="" id={"flexCheckDefault"} />
                    </th>

                    {props.tableTittle.map((element, index) => {
                        return (
                            <th scope="col" key={index}>{element}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {

                    /* Function to generate each row */
                    props.tableData.map((row, index) => {
                        return (
                            <tr key={index} onClick={() => { handleSelected(index) }}>
                                <th className="colCheckBox">
                                    <input className="form-check-input" type="checkbox" checked={index === Selected} value="" id={"check" + index} />
                                </th>
                                {
                                    /* Function to generate the data of the row */
                                    row.map((data, index) => {



                                        /* Detects specifics columns for dates */

                                        if (
                                            (props.tableTittle[index] === "Fecha de Creación")
                                            || (props.tableTittle[index] === "Fecha de Actualización")
                                        ) {

                                            /* Checks if the data is a date and parse it to the machine time */
                                            var date = new Date(Date.parse(data));
                                            if (date.toLocaleDateString() !== "Invalid Date") {

                                                return (
                                                    <td key={index}>
                                                        <p>
                                                            {date.toLocaleDateString()}{" "}{date.toLocaleTimeString()}
                                                        </p>
                                                    </td>
                                                )

                                            } else {
                                                /* Checks if camp isn't null */
                                                if (data == null) {
                                                    return (
                                                        <td key={index}>
                                                            <p>Fecha Desconocida</p>
                                                        </td>
                                                    )

                                                } else {
                                                    return <td key={index}>{data}</td>
                                                }
                                            }

                                            /* just retrun the others camps */
                                        } else {
                                            return <td key={index}><p>{data}</p></td>
                                        }




                                    })
                                }

                            </tr>


                        )
                    })
                }
            </tbody>
        </table >
    )
}
