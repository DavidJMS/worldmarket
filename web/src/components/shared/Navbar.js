import React, {useState} from 'react';
import { Link, NavLink } from "react-router-dom";
import md5 from "md5";

import "../styles/navbar.css";

class Navbar extends React.Component {

    constructor(props){
        super(props);
        if(props.user){
            const email = md5(props.user.email);
            this.state = {
                avatarUrl : `https://www.gravatar.com/avatar/${email}?d=identicon`,
                role : props.user.role
            }
        }
    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    handlerLogout =  (e)=> {

        fetch("http://127.0.0.1:8000/api/accounts/logout/",{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
            }
        })
        .then((response)=>{
            
            if (!response.ok){
                console.log(response.statusText)
            }
            else{
                localStorage.clear();
                this.props.history.push('/')
            }
        })
        .catch(function() {
            console.log("error");
        });
    }

    render(){

        return (
            <React.Fragment>
                {/* Navbar */}
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                    <Link to='logistics' className="nav-link">Home</Link>
                    </li>
                </ul>
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    {/* Navbar Search */}
                    <li className="nav-item">
                    <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                        <i className="fas fa-search" />
                    </a>
                    <div className="navbar-search-block">
                        <form className="form-inline">
                        <div className="input-group input-group-sm">
                            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                            <button className="btn btn-navbar" type="submit">
                                <i className="fas fa-search" />
                            </button>
                            <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                <i className="fas fa-times" />
                            </button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt" />
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                        <i className="fas fa-th-large" />
                    </a>
                    </li>
                </ul>
                </nav>
                {/* /.navbar */}

                {/* Main Sidebar Container */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link text-center">
                    {/* <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} /> */}
                    <span>World Market</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={this.state.avatarUrl} className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <p className="user"> {this.props.user.first_name} {this.props.user.last_name}</p>
                    </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class
                        with font-awesome or any other icon font library */}
                        <li className="nav-item menu-closed">
                        <a href="#" className="nav-link">
                            <i class="nav-icon fas fa-dolly-flatbed"></i>
                            <p>
                            Inventario
                            <i className="right fas fa-angle-left" />
                            </p>
                        </a>
                        <ul className="nav nav-treeview">
                            <li className="nav-item">
                            <NavLink to="/home/article/entry" activeClassName="active" className="nav-link ">
                                <i className="far fa-circle nav-icon" />
                                <p>Compras</p>
                            </NavLink>
                            <NavLink to="/home/article/output" activeClassName="active" className="nav-link ">
                                <i className="far fa-circle nav-icon" />
                                <p>Ventas</p>
                            </NavLink>
                            </li>
                        </ul>
                        </li>
                        {this.state.role === "admin" &&
                            <React.Fragment>
                                <li className="nav-item menu-closed">
                        <a className="nav-link">
                            <i className="nav-icon fas fa-clipboard" />
                            <p>
                            Administracion
                            <i className="right fas fa-angle-left" />
                            </p>
                        </a>
                        <ul className="nav nav-treeview">
                            <li className="nav-item">
                            </li>
                            <li className="nav-item">
                            <NavLink to="/home/init" activeClassName="active"  className="nav-link">
                                <i className="far fa-circle nav-icon" />
                                <p>Articulos</p>
                            </NavLink>
                            <NavLink to="/home/type" activeClassName="active" className="nav-link">
                                <i className="far fa-circle nav-icon" />
                                <p>Tipos De Articulos</p>
                            </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink to="/home/brand" activeClassName="active" className="nav-link ">
                                <i className="far fa-circle nav-icon" />
                                <p>Marcas</p>
                            </NavLink>
                            </li>
                        </ul>
                        </li>
                        <li className="nav-item menu-closed">
                        <a className="nav-link">
                            <i class="nav-icon fas fa-clipboard-check"></i>
                            <p>
                            Logistica
                            <i className="right fas fa-angle-left" />
                            </p>
                        </a>
                        <ul className="nav nav-treeview">
                            <li className="nav-item">
                            </li>
                            <li className="nav-item">
                            <NavLink exact to="/home/logistics" activeClassName="active" className="nav-link">
                                <i className="far fa-circle nav-icon" />
                                <p>Reportes</p>
                            </NavLink>
                            <NavLink to="/home/logistics/best" activeClassName="active" className="nav-link">
                                <i className="far fa-circle nav-icon" />
                                <p>Lo mejor</p>
                            </NavLink>
                            </li>
                        </ul>
                        </li>
                        <li className="nav-item">
                        <NavLink to="/home/store" activeClassName="active" className="nav-link">
                            <i className="nav-icon fas fa-warehouse" />
                            <p>
                            Tiendas
                            </p>
                        </NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to="/home/users" activeClassName="active" className="nav-link">
                            <i class="nav-icon fas fa-users"></i>
                            <p>
                            Usuarios
                            </p>
                        </NavLink>
                        </li>
                            </React.Fragment>
                        }
                        <li className="nav-item">
                        <a href="#" className="nav-link" onClick={this.handlerLogout}>
                            <i class="nav-icon fas fa-sign-out-alt"></i>
                            <p>
                            Salir
                            </p>
                        </a>
                        </li>
                    </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
                </aside>
            </React.Fragment>
        );
    }
}

export default Navbar;