import React  from "react";
import Swal from 'sweetalert2'

import PageLoading from "../shared/PageLoading";
import ArticleForm from "../forms/ArticleForm";

class AddArticle extends React.Component{
    
    constructor(props){
        super(props); 
        this.state = {
            loading1: true, 
            loading2: true,
            error: null,
            
            typeArticleData: undefined,
            brandData: undefined,
            
            articleData:{
                "type_article":0,
                "brand":0
            }
        }
    }

    componentDidMount(){
        this.fetchTypeArticle();
        this.fetchBrand();
    }

    fetchTypeArticle = async () =>{
        // Inicializamos todo en los valores iniciales
        this.setState({loading1:true, error:null});

        // Realizamos la peticion con manejo de errores
        try{
            fetch("http://127.0.0.1:8000/api/type/article/",{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Token ${this.props.token}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    this.setState({loading1:false, typeArticleData:data});
                });
        }
        catch (error) {
            this.setState({loading1:false, error:error})
        }

    }

    fetchBrand = async () =>{
        
        this.setState({loading2:true, error:null});

        try{
            fetch("http://127.0.0.1:8000/api/brand/",{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Token ${this.props.token}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    this.setState({loading2:false, brandData:data});
                });
        }
        catch (error) {
            this.setState({loading2:false, error:error})
        }

    }

    handlerChange = (e)=>{
        console.log({[e.target.name]:e.target.value})
        this.setState({ 
            articleData:{
                ...this.state.articleData,
                [e.target.name]: parseInt(e.target.value)
            }
        })
    }

    handlerSubmit = (e)=>{
        e.preventDefault();
        console.log(this.state.articleData)
        fetch("http://127.0.0.1:8000/api/article/",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.articleData)
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

        if (this.state.loading1 === true && !this.state.typeArticleData || this.state.loading2 === true && !this.state.brandData){
            return <PageLoading />;
        }

        return (
            <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-center">Añadir Articulo</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body mr-4 ml-4">
                        <ArticleForm 
                        typeArticles = {this.state.typeArticleData}
                        brands = {this.state.brandData}

                        articleData={this.state.articleData} 
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

export default AddArticle;