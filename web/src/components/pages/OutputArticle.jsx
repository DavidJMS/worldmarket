import React from 'react';
import Swal from 'sweetalert2'

import { Link } from "react-router-dom";

import PageLoading from "../shared/PageLoading";
import OutputArticleList from '../list/OutputArticleList';
import SelecEntryArticle from '../forms/SelectEntryArticle';

class OutputArticle extends React.Component {

    constructor(props){
        super(props);

        let storehouse = 0;
        let disable = false;
        if(props.user.role === "operator"){
            storehouse = props.user.store_house
            disable = true
        };

        this.state = {
            loading1: true,
            loading2: false,
            loading3: false,
            error: null,
            data: undefined,

            disabled:disable,
            storehouseData:undefined,
            storehouse:storehouse,

            entryArticles: undefined,
            entryId:0,

            outputId:0,
        }
    }

    componentDidMount(){
        this.fetchEntryArticles();
        this.intervalId = setInterval(this.fetchData, 3000); 
    }

    componentWillUnmount(){
        clearTimeout(this.intervalId);
    }

    fetchData = async () =>{
        // Inicializamos todo en los valores iniciales
        this.setState({loading2:true, error:null});
        const id = this.state.entryId;
        try{
            fetch(`http://127.0.0.1:8000/api/article/${id}/output/`,{
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
                    this.setState({loading3:false, storehouseData:data});
                });
        }
        catch (error) {
            this.setState({loading3:false, error})
        }
    }

    handlerEntryArticle = (e)=>{
        this.setState({entryId:e.target.value},
            this.fetchData)
    }
    
    handlerStore = (e)=>{
        this.setState({storehouse:e.target.value});
    }

    fetchEntryArticles = async () =>{
        try{
            fetch("http://127.0.0.1:8000/api/article/entry/all/",{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Token ${this.props.token}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    this.setState({loading1:false, entryArticles:data});
                });
        }
        catch (error) {
            this.setState({loading1:false, error:error})
        }

    }

    handlerDelete = (e) =>{
        this.setState({outputId:e},
            this.fetchDelete);
    }

    fetchDelete = async () =>{
        const idEntry = this.state.entryId;
        const idOutput = this.state.outputId;
        this.setState({loading:true});

        fetch(`http://127.0.0.1:8000/api/article/${idEntry}/output/${idOutput}`,{
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
            if (response.status == 403){
                err.message = "Sin autorización para realizar esta acción";
            }
            throw err}
        })
        .catch((error)=>{
            console.log(error)
            Swal.fire({
                title: 'Error',
                icon:'error',
                text: error.message,
                confirmButtonText: 'Entendido'
                })
        });
    }
    
    render(){

        if (this.state.loading1 === true && !this.state.entryArticles || this.state.loading3 === true && !this.state.storehouseData ){
            return <PageLoading />;
        }

        return(
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Ventas</h3>
                            <Link to={"output/new"}>
                                <button className="btn btn-success btn-add-success"><span><i className="fas fa-plus-square"></i></span></button>
                            </Link>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <SelecEntryArticle 
                            handlerEntryArticle={this.handlerEntryArticle}
                            entryArticles={this.state.entryArticles}
                            storehouseData={this.state.storehouseData}
                            storehouse={this.state.storehouse}
                            disabled={this.state.disabled}
                            handlerStore = {this.handlerStore}
                            />
                            <div className="table-responsive p-0">
                                <OutputArticleList 
                                OutputArticle={this.state.data} 
                                loading={this.state.loading2}
                            storehouse={this.state.storehouse}
                                handlerDelete={this.handlerDelete}
                                />
                            </div>
                        </div>
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>
            </div>
        )
    }
}

export default OutputArticle;