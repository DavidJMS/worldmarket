import React from "react";

function StoreForm(props){
    return(
        <form>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Nombre</label>
                <input className="form-control" type="text"  name="name" value={props.data.name} onChange={props.handlerChange} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Direccion</label>
                <input className="form-control" type="text"  name="location" value={props.data.location} onChange={props.handlerChange} />
            </div>
            <button onClick={props.handlerSubmit} className="btn btn-success">Registrar</button>
        </form>
    );
}

export default StoreForm;