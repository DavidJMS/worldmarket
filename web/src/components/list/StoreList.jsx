import React from "react";
import { Link } from 'react-router-dom';

class StoreListItem extends React.Component {
    render() {
      
      let id = this.props.store.id

      return (
        <tr>
          <td>{id}</td>
          <td>{this.props.store.name}</td>
          <td>{this.props.store.location}</td>
          <td>
              <Link to={`${id}/edit`}>
                <button className="btn btn-primary mr-1"><i class="fas fa-pencil-alt"></i></button>
              </Link>
              <button onClick={this.props.handlerDelete.bind(this,id)} className="btn btn-danger ml-1"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      );
    }
  }

  function StoreList(props) {
    const Store = props.Store;
    return (
      <table className="table table-hover text-nowrap">
        <thead>
            <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Direccion</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
          {Store.map(store => {
            return(
              <StoreListItem 
              store={store} 
              handlerDelete={props.handlerDelete}
              />
            );
          })}
        </tbody>
        </table>
    );
  }
  
  export default StoreList;