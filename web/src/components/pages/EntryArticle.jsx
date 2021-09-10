import React from 'react';
import Swal from 'sweetalert2'

import { Link } from "react-router-dom";

import EntryArticleList from '../list/EntryArticleList';
import SelecArticle from '../forms/SelectArticle';
import PageLoading from "../shared/PageLoading";

class EntryArticle extends React.Component {

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
            articleId:0,
            articles:undefined,
            entryArticleId:0
        }
    }

    componentDidMount(){
        this.fetchArticle();
        this.intervalId = setInterval(this.fetchData, 2000); 
    }

    componentWillUnmount(){
        clearTimeout(this.intervalId);
    }

    fetchData = async () =>{
        // Inicializamos todo en los valores iniciales
        this.setState({loading2:true, error:null});
        const id = this.state.articleId;
        try{
            fetch(`http://127.0.0.1:8000/api/article/${id}/entry/`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Token ${this.props.token}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    
                    console.log(data)
                    this.setState({loading2:false, data:data});
                });
        }
        catch (error) {
            this.setState({loading2:false, error:error})
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

    handlerArticle = (e)=>{
        this.setState({articleId:e.target.value},
            this.fetchData
            )
    }

    fetchArticle = async () =>{
        this.setState({loading1:true, error:null});
        try{
            fetch("http://127.0.0.1:8000/api/article/",{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Token ${this.props.token}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    this.setState({loading1:false, articles:data});
                });
        }
        catch (error) {
            this.setState({loading1:false, error:error})
        }

    }

    handlerDelete = (elemento) =>{
        this.setState({entryArticleId:elemento},
            this.fetchDelete);
    }

    handlerStore = (e)=>{
        this.setState({storehouse:e.target.value});
    }

    fetchDelete = async () =>{
        const idArticle = this.state.articleId;
        const idEntryArticle = this.state.entryArticleId;
        this.setState({loading:true});

        fetch(`http://127.0.0.1:8000/api/article/${idArticle}/entry/${idEntryArticle}`,{
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
        if (this.state.loading1 === true && !this.state.data || this.state.loading3 === true && !this.state.storehouseData){
            return <PageLoading />;
        }
        return(
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Compras</h3>
                            <Link to={"entry/new"}>
                                <button className="btn btn-success btn-add-success"><span><i className="fas fa-plus-square"></i></span></button>
                            </Link>
                        </div>
                        <div className="card-body ">
                            <SelecArticle 
                            handlerArticle={this.handlerArticle}
                            articles={this.state.articles}
                            storehouseData={this.state.storehouseData}
                            storehouse={this.state.storehouse}
                            disabled={this.state.disabled}
                            handlerStore = {this.handlerStore}
                            />
                            <div className="table-responsive p-0">
                                <EntryArticleList 
                                EntryArticle={this.state.data} 
                                storehouse={this.state.storehouse}
                                handlerDelete={this.handlerDelete}
                                loading={this.state.loading2}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EntryArticle;