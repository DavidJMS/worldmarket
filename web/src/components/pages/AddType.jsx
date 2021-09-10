import React  from "react";
import Swal from 'sweetalert2'

import TypeForm from "../forms/TypeForm";

class Addtype extends React.Component{

    constructor(props){
        super(props); 
        this.state = {
            loading: true, 
            error: null,
            
            typeArticleData:{
                "name":"",
                "description":""
            }
        }
    }

    handlerChange = (e)=>{
        this.setState({ 
            typeArticleData:{
                ...this.state.typeArticleData,
                [e.target.name]: e.target.value
            }
        })
    }

    handlerSubmit = (e)=>{
        e.preventDefault();
        console.log(this.state.articleData)
        fetch("http://127.0.0.1:8000/api/type/article/",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.typeArticleData)
        })
        .then(response => {
            if (response.ok){
                return response.json()
            }
            let err = new Error("HTTP status code: " + response.status)
            console.log(response.data)
            console.log(response.status)
            err.response = response
            err.status = response.status
            throw err
        })
        .then(data => {
            Swal.fire({
                title: 'Completado',
                icon: 'success',
                confirmButtonText: 'Entendido'
              })
        })
        .catch((error)=>{
            Swal.fire({
                title: 'Error!',
                text: 'Algo salio mal',
                icon: 'error',
                confirmButtonText: 'Entendido'
              })
            console.log(error);
            console.log(error.data);
        });
    }

    render(){
        return (
            <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-center">Añadir Tipo De Articulo</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body mr-4 ml-4">
                    <TypeForm
                    typeArticleData={this.state.typeArticleData}
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

export default Addtype;