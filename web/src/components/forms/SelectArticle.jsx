import React from "react";

function SelecArticle(props) {

    const articles = props.articles;

    return(
        <form className="row">
            <div className="form-group col-12 col-md-4">
                <select className="form-control" onChange={props.handlerArticle}>
                <option value="0">Seleccione</option>
                {articles.map(article => {
                    let name=`${article.type_article.name} ${article.brand.name}`
                    return(
                    <option value={article.id}>{name}</option>
                    );
                })}
                </select>
            </div>
            { props.year && 
            <div className="form-group col-12 col-md-3">
                <input className="form-control" onChange={props.handlerYear} type="number" step="1" value={props.year}/>
            </div> 
            }
            { props.storehouseData && 
            <div className="form-group">
                <select className="form-control" id="storehouse" disabled={props.disabled} value={props.storehouse} name="storehouse" onChange={props.handlerStore}>
                    <option value="0">Todas</option>
                    {props.storehouseData.map(storehouse => {
                        return(
                        <option value={storehouse.id}>{storehouse.name}</option>
                        );
                    })}
                </select>
            </div>
            }
        </form>
    );
}

export default SelecArticle;