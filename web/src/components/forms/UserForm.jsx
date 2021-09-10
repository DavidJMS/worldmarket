import React from "react";

function UserForm(props){
    const Stores = props.stores;
    return(
        <form>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Username</label>
                <input className="form-control" type="text"  name="username" value={props.data.username} onChange={props.handlerChange} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Nombres</label>
                <input className="form-control" type="text"  name="first_name" value={props.data.first_name} onChange={props.handlerChange} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Apellidos</label>
                <input className="form-control" type="text"  name="last_name" value={props.data.last_name} onChange={props.handlerChange} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Email</label>
                <input className="form-control" type="email"  name="email" value={props.data.email} onChange={props.handlerChange} />
            </div>
            {props.add &&
            <React.Fragment>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Password</label>
                <input className="form-control" type="password"  name="password" value={props.data.password} onChange={props.handlerChange} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Confirmar Password</label>
                <input className="form-control" type="password"  name="password_confirmation" value={props.data.password_confirmation} onChange={props.handlerChange} />
            </div>   
            </React.Fragment>
            
            }
            <div className="form-group">
                <label htmlFor="role">Rol</label>
                <select className="form-control" id="role" value={props.data.role} name="role" onChange={props.handlerChange}>
                <option value="0">Seleccione</option>
                <option value="admin">Administrador</option>
                <option value="operator">Operador</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="store">Tienda</label>
                <select className="form-control" id="store" disabled={props.data.disabled_store_input} value={props.data.store_house} name="store_house" onChange={props.handlerChange}>
                <option value="0">Seleccione</option>
                {Stores.map(store => {
                    return(
                    <option value={store.id}>{store.name}</option>
                    );
                })}
                </select>
            </div>
            <button onClick={props.handlerSubmit} className="btn btn-success">Registrar</button>
        </form>
    );
}

export default UserForm;