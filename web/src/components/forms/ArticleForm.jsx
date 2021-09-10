import React from "react";

function ArticleForm(props) {

    const typArticles = props.typeArticles;
    const brand = props.brands;

    return(
        <form>
            <div className="form-group">
                <label htmlFor="type_article">Tipo de articulo</label>
                <select className="form-control" id="type_article" value={props.articleData["type_article"]} name="type_article" onChange={props.handlerChange}>
                <option value="0">Seleccione</option>
                {typArticles.map(typeArticle => {
                    return(
                    <option value={typeArticle.id}>{typeArticle.name}</option>
                    );
                })}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">Marca</label>
                <select className="form-control"  id="brand" value={props.articleData["brand"]} name="brand" onChange={props.handlerChange}>
                <input className="form-control" type="text" />
                <option value="0">Seleccione</option>
                {brand.map(brand => {
                    return(
                    <option value={brand.id}>{brand.name}</option>
                    );
                })}
                </select>
            </div>
            <button  onClick={props.handlerSubmit} className="btn btn-success">Registrar</button>
        </form>
    );
}

export default ArticleForm;