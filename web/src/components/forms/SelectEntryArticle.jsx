import React from "react";
import moment from "moment";

function SelecEntryArticle(props) {

    const entryArticles = props.entryArticles;

    return(
        <form className="row">
            <div className="form-group col-12 col-md-5">
                <select className="form-control" onChange={props.handlerEntryArticle}>
                <option value="0">Seleccione</option>
                {entryArticles.map(entry => {
                    let name=`${entry.article.type_article.name} ${entry.article.brand.name}`;
                    let date=moment(entry.created).format("YYYY-MM-DD")
                    return(
                    <option value={entry.id}>{name}, Comprado el {date}</option>
                    );
                })}
                </select>
            </div>
            { props.storehouseData && 
            <div className="form-group col-12 col-md-3">
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

export default SelecEntryArticle;