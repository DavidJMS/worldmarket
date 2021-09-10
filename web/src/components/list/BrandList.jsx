import React from "react";
import { Link } from 'react-router-dom';

class BrandListItem extends React.Component {
    render() {
      let id = this.props.brand.id
      return (
        <tr>
          <td>{id}</td>
          <td>{this.props.brand.name}</td>
          <td>
              <Link to={`brand/${id}/edit`}>
                <button className="btn btn-primary mr-1"><i class="fas fa-pencil-alt"></i></button>
              </Link>
              <button onClick={this.props.handlerDelete.bind(this,id)} className="btn btn-danger ml-1"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      );
    }
  }

  function BrandList(props) {
    const Brand = props.Brand;
    return (
      <table className="table table-hover text-nowrap">
        <thead>
            <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
          {Brand.map(brand => {
            return(
              <BrandListItem 
              brand={brand} 
              handlerDelete={props.handlerDelete}
              />
            );
          })}
        </tbody>
        </table>
    );
  }
  
  export default BrandList;