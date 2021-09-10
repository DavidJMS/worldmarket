import React from "react";

function EntryArticleForm(props){

    const articleData = props.articleData;
    const storehouseData = props.storehouseData;

    return(
        <form>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Articulo</label>
                <select className="form-control" id="type_article" value={props.entryArticleData["article"]} name="article" onChange={props.handlerChange}>
                    <option value="0">Seleccione</option>
                    {articleData.map(article => {
                        return(
                        <option value={article.id}>{article.type_article.name} {article.brand.name}</option>
                        );
                    })}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="storehouse">Tienda</label>
                <select className="form-control" id="storehouse" disabled={props.disabled} value={props.entryArticleData["storehouse"]} name="storehouse" onChange={props.handlerChange}>
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
                <input className="form-control" type="number" value={props.entryArticleData["quantity"]} name="quantity" onChange={props.handlerChange} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Precio $</label>
                <input className="form-control" type="number" value={props.entryArticleData["purchase_price"]} name="purchase_price" onChange={props.handlerChange} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Fecha de vencimiento</label>
                <input className="form-control" type="date" value={props.entryArticleData["due_date"]} name="due_date" onChange={props.handlerChange}></input>
            </div>
            <button onClick={props.handlerSubmit} className="btn btn-success">Registrar</button>
        </form>
    );
}

export default EntryArticleForm;