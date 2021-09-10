import React from "react";
import { Link } from 'react-router-dom';

class ArticleListItem extends React.Component {
    render() {
      
      let id = this.props.article.id

      return (
        <tr>
          <td>{id}</td>
          <td>{this.props.article.type_article.name}</td>
          <td>{this.props.article.brand.name}</td>
          <td><span className="tag tag-success">{this.props.article.registered_by.username}</span></td>
          <td>200</td>
          <td>
              <Link to={`article/${id}/edit`}>
                <button className="btn btn-primary mr-1"><i class="fas fa-pencil-alt"></i></button>
              </Link>
              <button onClick={this.props.handlerDelete.bind(this,id)} className="btn btn-danger ml-1"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      );
    }
  }

  function ArticleList(props) {
    const Article = props.Article;
    return (
      <table className="table table-hover text-nowrap">
        <thead>
            <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Registrado Por</th>
            <th>Cantidad</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
          {Article.map(article => {
            return(
              <ArticleListItem 
              article={article} 
              handlerDelete={props.handlerDelete}
              />
            );
          })}
        </tbody>
        </table>
    );
  }
  
  export default ArticleList;