import React from "react";
import { Link } from 'react-router-dom';

import PageLoading from "../shared/PageLoading";

class EntryArticleListItem extends React.Component {
    render() {
      
      let articleName = `${this.props.entry.article.type_article.name} ${this.props.entry.article.brand.name}`;
      let id = this.props.entry.id;
      return (
        <tr>
          <td>{articleName}</td>
          <td>{this.props.entry.storehouse.name}</td>
          <td><span className="tag tag-success">{this.props.entry.registered_by.username}</span></td>
          <td>{this.props.entry.quantity}</td>
          <td>{this.props.entry.rest_quantity}</td>
          <td>{this.props.entry.purchase_price}$</td>
          <td>
              {/* <button className="btn btn-primary mr-1"><i class="fas fa-pencil-alt"></i></button> */}
              <button onClick={this.props.handlerDelete.bind(this,id)} className="btn btn-danger ml-1"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      );
    }
  }

  function EntryArticleList(props) {
    var EntryArticle = props.EntryArticle;

    if (props.loading === true && !EntryArticle){
      return <PageLoading />
    } 
    
    if (props.loading === false && !EntryArticle){
      return null;
    }

    if(props.storehouse !=0){
      EntryArticle = props.EntryArticle.filter(Entry => Entry.storehouse.id == props.storehouse)
    }
    
    return (
      <table className="table table-hover text-nowrap">
        <thead>
            <tr>
            <th>Articulo</th>
            <th>Tienda</th>
            <th>Registrado Por</th>
            <th>Cantidad</th>
            <th>Cantidad Restante</th>
            <th>Precio</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
          {EntryArticle.map(entry => {
            return(
              <EntryArticleListItem 
              entry={entry} 
              handlerDelete={props.handlerDelete}
              />
            );
          })}
        </tbody>
        </table>
    );
  }
  
  export default EntryArticleList;