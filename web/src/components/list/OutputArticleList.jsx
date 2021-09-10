import React from "react";
import { Link } from 'react-router-dom';
import PageLoading from "../shared/PageLoading";

class OutputArticleListItem extends React.Component {
    render() {
      
      let articleName = `${this.props.output.lote_article.article.type_article.name} ${this.props.output.lote_article.article.brand.name}`;
      let id = this.props.output.id;

      return (
        <tr>
          <td>{articleName}</td>
          <td>{this.props.output.lote_article.id}</td>
          <td>{this.props.output.storehouse.name}</td>
          <td><span className="tag tag-success">{this.props.output.registered_by.username}</span></td>
          <td>{this.props.output.quantity}</td>
          <td>{this.props.output.sale_price}$</td>
          <td>
              {/* <button className="btn btn-primary mr-1"><i class="fas fa-pencil-alt"></i></button> */}
              <button onClick={this.props.handlerDelete.bind(this,id)} className="btn btn-danger ml-1"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      );
    }
  }

  function OutputArticleList(props) {
    var OutputArticle = props.OutputArticle;

    if (props.loading === true && !OutputArticle){
      return <PageLoading />
    }
      
    if (props.loading === false && !OutputArticle){
      return null;
    }

    if(props.storehouse !=0){
      OutputArticle = props.OutputArticle.filter(Output => Output.storehouse.id == props.storehouse)
    }

    return (
      <table className="table table-hover text-nowrap">
        <thead>
            <tr>
            <th>Articulo</th>
            <th>Lote</th>
            <th>Tienda</th>
            <th>Registrado Por</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
          {OutputArticle.map(output => {
            return(
              <OutputArticleListItem 
              output={output} 
              handlerDelete={props.handlerDelete}
              />
            );
          })}
        </tbody>
        </table>
    );
  }
  
  export default OutputArticleList;