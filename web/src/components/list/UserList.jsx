import React from "react";
import { Link } from 'react-router-dom';

class UserListItem extends React.Component {
    render() {
      
      let id = this.props.user.id

      return (
        <tr>
          <td>{id}</td>
          <td>{this.props.user.username}</td>
          <td>{this.props.user.email}</td>
          <td>{this.props.user.first_name}</td>
          <td>{this.props.user.last_name}</td>
          <td>{this.props.user.role}</td>
          <td>
              <Link to={`users/${id}/edit`}>
                <button className="btn btn-primary mr-1"><i class="fas fa-pencil-alt"></i></button>
              </Link>
              <button onClick={this.props.handlerDelete.bind(this,id)} className="btn btn-danger ml-1"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      );
    }
  }

  function UserList(props) {
    const user = props.user;
    return (
      <table className="table table-hover text-nowrap">
        <thead>
            <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Role</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
          {user.map(user => {
            return(
              <UserListItem 
              user={user} 
              handlerDelete={props.handlerDelete}
              />
            );
          })}
        </tbody>
        </table>
    );
  }
  
  export default UserList;