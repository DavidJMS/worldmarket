import React from "react";
import moment from "moment";

function OutputArticleForm(props){
    
    const entryArticleData = props.entryArticleData;
    const storehouseData = props.storehouseData;

    return(
        <form>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Lote de compra</label>
                <select className="form-control" value={props.outputArticleData["lote_article"]} name="lote_article" onChange={props.handlerChange}>
                    <option value="0">Seleccione</option>
                    {entryArticleData.map(entryArticle => {
                        const name = `${entryArticle.article.type_article.name} ${entryArticle.article.brand.name}`
                        const date = moment(entryArticle.created).format("YYYY-MM-DD")
                        const rest = entryArticle.rest_quantity
                        return(
                        <option value={entryArticle.id}>{name}, registrado el {date}, en stock {rest} </option>
                        );
                    })}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="storehouse">Tienda</label>
                <select className="form-control" id="storehouse" disabled={props.disabled} value={props.outputArticleData["storehouse"]} name="storehouse" onChange={props.handlerChange}>
                    <option value="0">Seleccione</option>
                    {storehouseData.map(storehouse => {
                        return(
                        <option value={storehouse.id}>{storehouse.name}</option>
                        );
                    })}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Cantidad</label>
                <input className="form-control" type="number" value={props.outputArticleData["quantity"]} name="quantity" onChange={props.handlerChange} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Precio $</label>
                <input className="form-control" type="number" value={props.outputArticleData["sale_price"]} name="sale_price" onChange={props.handlerChange} />
            </div>
            <button onClick={props.handlerSubmit} className="btn btn-success">Registrar</button>
        </form>
    );
}

export default OutputArticleForm;