import React from "react";

function SelecDateRange(props) {
    return(
        <form className="row">
            <div className="form-group col-12 col-md-3">
                <label htmlFor="from_date">Desde</label>
                <input className="form-control" type="date" id="from_date" onChange={props.handlerChange} name="from_date" value={props.data.from_date}></input>
            </div>
            <div className="form-group col-12 col-md-3">
                <label htmlFor="to_date">Hasta</label>
                <input className="form-control" type="date" id="to_date" onChange={props.handlerChange} name="to_date" value={props.data.to_date}></input>
            </div> 
            <div className="form-group">
                <label htmlFor="to_date">Tienda</label>
                <select className="form-control" id="storehouse" value={props.data.storehouse} name="storehouse" onChange={props.handlerStore}>
                    <option value="0">Todas</option>
                    {props.storehouseData.map(storehouse => {
                        return(
                        <option value={storehouse.id}>{storehouse.name}</option>
                        );
                    })}
                </select>
            </div>
            <div className="form-group col-12 col-md-4 d-flex flex-row-reverse">
                <div className="p-2">
                    <button onClick={props.handlerSubmit} className="btn btn-success">Enviar</button>
                </div>
            </div>
            <div className="form-group col-12">
                <div className="form-check" >
                    <input type="checkbox" className="form-check-input" onChange={props.handlerChange} name="all" id="all"/>
                    <label htmlFor="all">Todos</label>
                </div>
            </div>
        </form>
    );
}

export default SelecDateRange;