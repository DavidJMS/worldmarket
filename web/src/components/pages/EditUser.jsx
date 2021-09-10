import React  from "react";
import Swal from 'sweetalert2';

import UserForm from "../forms/UserForm";
import PageLoading from "../shared/PageLoading";

class EditUser extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            loading: true, 
            loading2: true, 
            error: null,
            storeData:undefined,
            idUser: this.props.match.params.userId,

            data:{
                "username":"",
                "first_name":"",
                "last_name":"",
                "email":"",
                "password":"",
                "password_confirmation":"",
                "role":"",
                "store_house":0,
                "disabled_store_input":false
            }
        }
    }

    componentDidMount(){
        this.fetchStore();
        this.fetchData();
    }

    fetchStore = async () =>{
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
                    this.setState({loading2:false, storeData:data});
                });
        }
        catch (error) {
            this.setState({loading2:false, error:error})
        }

    }

    fetchData = async => {
        let id = this.state.idUser;
        fetch(`http://127.0.0.1:8000/api/accounts/${id}/`,{
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
                        "username":data.username,
                        "first_name":data.first_name,
                        "last_name":data.last_name,
                        "email":data.email,
                        "role":data.role,
                        "store_house":data.store_house,
                        "disabled_store_input":data.multi_store_house
                    }
                })
            })
            .catch(error => {
                this.setState({error, loading:false})
        });
    }

    handlerChange = (e)=>{
        if (e.target.name=="role" && e.target.value=="admin"){
            this.state.data.disabled_store_input = true;
            this.state.data.store_house = 0;
        }
        if(e.target.name=="role" && e.target.value!="admin"){
            this.state.data.disabled_store_input = false;
            this.state.data.store_house = 0;
        }
        this.setState({ 
            data:{
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })
    }

    handlerSubmit = (e)=>{
        e.preventDefault();
        let id = this.state.idUser;
        this.state.loading = true;
        fetch(`http://127.0.0.1:8000/api/accounts/${id}/`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.data)
        })
        .then(response => {
            this.state.loading=false;
            if (response.ok){
                Swal.fire({
                    title: 'Editado',
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
        if(this.state.loading===true || this.state.loading2===true){
            return <PageLoading />
        }
        return (
            <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-center">Editar Usuario</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body mr-4 ml-4">
                    <UserForm 
                    data={this.state.data}
                    stores={this.state.storeData}
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

export default EditUser;