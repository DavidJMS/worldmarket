import React from "react";

function TypeForm(props){

    return(
        <form>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Nombre</label>
                <input className="form-control" type="text" name="name" value={props.typeArticleData.name} onChange={props.handlerChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">Descripcion</label>
                <input className="form-control" type="text" name="description" value={props.typeArticleData.description} onChange={props.handlerChange}/>
            </div>
            <button onClick={props.handlerSubmit} className="btn btn-success">Registrar</button>
        </form>
    );
}

export default TypeForm;