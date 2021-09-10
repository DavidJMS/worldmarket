import React from 'react';
import Swal from 'sweetalert2'

import { Link } from "react-router-dom";

import PageLoading from "../shared/PageLoading";
import StoreList from '../list/StoreList';

class Store extends React.Component {

    constructor(props){
        super(props); 
        this.state = {
            loading: true,
            error: null,
            data: undefined,
            storeId: 0
        }
    }

    componentDidMount(){
        this.fetchData();
        this.intervalId = setInterval(this.fetchData, 2000);
    }

    componentWillUnmount(){
        clearTimeout(this.intervalId);
    }

    fetchData = async () =>{
        this.setState({loading:true, error:null});
        try{
            fetch("http://127.0.0.1:8000/api/storehouse/",{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Token ${this.props.token}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    this.setState({loading:false, data:data});
                });
        }
        catch (error) {
            this.setState({loading:false, error:error})
        }

    }

    handlerDelete = (elemento) =>{
        this.setState({StoreId:elemento},
            this.fetchDelete);
    }

    fetchDelete = async () =>{
        const id = this.state.StoreId
        this.setState({loading:true});

        fetch(`http://127.0.0.1:8000/api/storehouse/${id}/`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
                }
            })
        .then(response => {
            if (response.ok){
                this.setState({loading:false});
                Swal.fire({
                    title: 'Eliminado',
                    icon: 'success',
                    confirmButtonText: 'Entendido'
                })
            }
            else{
            let err = new Error("HTTP status code: " + response.status)
            err.response = response
            err.status = response.status
            throw err}
        })
        .catch((error)=>{
            console.log(error)
            Swal.fire({
                title: 'Error',
                icon: 'Algo salio mal!',
                confirmButtonText: 'Entendido'
                })
        });
    }

    render(){

        if (this.state.loading === true && !this.state.data){
            return <PageLoading />;
        }

        return(
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Tiendas</h3>
                            <Link to={"new"}>
                                <button className="btn btn-success btn-add-success"><span><i className="fas fa-plus-square"></i></span></button>
                            </Link>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body table-responsive p-0">
                            <StoreList 
                            Store={this.state.data}
                            handlerDelete={this.handlerDelete}
                            />
                        </div>
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>
            </div>
        )
    }
}

export default Store;