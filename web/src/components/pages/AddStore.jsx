import React  from "react";
import Swal from 'sweetalert2'

import PageLoading from "../shared/PageLoading";
import StoreForm from "../forms/StoreForm";

class AddStore extends React.Component{
    
    constructor(props){
        super(props); 
        this.state = {
            loading: true,
            error: null,
            
            data:{
                "name":"",
                "location":""
            }
        }
    }

    handlerChange = (e)=>{
        this.setState({ 
            data:{
                ...this.state.data,
                [e.target.name]:e.target.value
            }
        })
    }

    handlerSubmit = (e)=>{
        e.preventDefault();
        console.log(this.state.articleData)
        fetch("http://127.0.0.1:8000/api/storehouse/",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.data)
        })
        .then(response => {
            if (response.ok){
                Swal.fire({
                    title: 'Registrado',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
            else{
                let err = new Error("HTTP status code: " + response.status)
                err.response = response
                err.status = response.status
                console.log(response.data)
                throw err
            }
        })
        .catch((error)=>{
            console.log(error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text:'Algo salio mal!',
                confirmButtonText: 'Entendido'
            })
        });
    }

    render(){
        return (
            <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-center">Añadir Tienda</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body mr-4 ml-4">
                        <StoreForm 
                        data={this.state.data} 
                        handlerChange={this.handlerChange}
                        handlerSubmit={this.handlerSubmit}
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

export default AddStore;