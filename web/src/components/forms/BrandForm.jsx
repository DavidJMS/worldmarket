import React from "react";

function BrandForm(props){
    return(
        <form>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Nombre</label>
                <input className="form-control" type="text"  name="name" value={props.brandData.name} onChange={props.handlerChange} />
            </div>
            <button onClick={props.handlerSubmit} className="btn btn-success">Registrar</button>
        </form>
    );
}

export default BrandForm;