import React  from "react";
import Swal from 'sweetalert2';

import BrandForm from "../forms/BrandForm";

class EditBrand extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            loading: true, 
            error: null,
            
            idBrand: this.props.match.params.brandId,

            brandData:{
                "name":""
            }
        }
    }

    componentDidMount(){
        this.fetchBrand();
    }

    fetchBrand = async => {

        this.setState({loading:true, error:null});

        fetch(`http://127.0.0.1:8000/api/brand/${this.state.idBrand}/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    loading:false,
                    brandData:{
                        "name": data.name
                    }
                })
            })
            .catch(error => {
                this.setState({error, loading:false})
        });
    }

    handlerChange = (e)=>{
        this.setState({ 
            brandData:{
                ...this.state.brandData,
                [e.target.name]: e.target.value
            }
        })
    }

    handlerSubmit = (e)=>{
        e.preventDefault();
        
        fetch(`http://127.0.0.1:8000/api/brand/${this.state.idBrand}/`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.brandData)
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
                        <h3 className="text-center">A??adir Marca</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body mr-4 ml-4">
                    <BrandForm 
                    brandData={this.state.brandData}
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

export default EditBrand;