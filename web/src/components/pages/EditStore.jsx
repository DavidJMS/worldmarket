import React  from "react";
import Swal from 'sweetalert2';

import PageLoading from "../shared/PageLoading";

import StoreForm from "../forms/StoreForm";
import Store from "./Stores";

class EditStore extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            loading: true, 
            error: null,
            
            idStore: this.props.match.params.storedId,

            data:{
                "name":"",
                "location":""
            }
        }
    }

    componentDidMount(){
        this.fetchStore();
    }

    fetchStore = async => {

        this.setState({loading:true, error:null});

        fetch(`http://127.0.0.1:8000/api/storehouse/${this.state.idStore}/`,{
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
                    data:{
                        "name": data.name,
                        "location":data.location
                    }
                })
            })
            .catch(error => {
                this.setState({error, loading:false})
        });
    }

    handlerChange = (e)=>{
        this.setState({ 
            data:{
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })
    }

    handlerSubmit = (e)=>{
        e.preventDefault();
        
        fetch(`http://127.0.0.1:8000/api/storehouse/${this.state.idStore}/`,{
            method: 'PUT',
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
        if(this.state.loading === true ){
            return <PageLoading />
        }
        return (
            <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-center">Editar Tienda</h3>
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

export default EditStore;