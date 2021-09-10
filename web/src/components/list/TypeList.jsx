import React from "react";
import { Link } from 'react-router-dom';

class TypeArticleListItem extends React.Component {
    render() {
      
      let id = this.props.typeArticle.id;

      return (
        <tr>
          <td>{id}</td>
          <td>{this.props.typeArticle.name}</td>
          <td>{this.props.typeArticle.description}</td>
          <td>
              <Link to={`type/${id}/edit`}>
                <button className="btn btn-primary mr-1"><i class="fas fa-pencil-alt"></i></button>
              </Link>
              <button onClick={this.props.handlerDelete.bind(this,id)} className="btn btn-danger ml-1"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      );
    }
  }

  function ArticleList(props) {
    const TypeArticle = props.TypeArticle;
    return (
      <table className="table table-hover text-nowrap">
        <thead>
            <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            </tr>
        </thead>
        <tbody>
          {TypeArticle.map(typeArticle => {
            return(
              <TypeArticleListItem 
              typeArticle={typeArticle} 
              handlerDelete={props.handlerDelete}
              />
            );
          })}
        </tbody>
        </table>
    );
  }
  
  export default ArticleList;