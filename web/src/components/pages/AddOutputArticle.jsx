import React  from "react";
import Swal from 'sweetalert2';

import PageLoading from "../shared/PageLoading";
import OutputArticleForm from "../forms/OutputArticleForm";

class AddOutputArticle extends React.Component{

    constructor(props){
        super(props);

        let storehouse = 0;
        let disable = false;
        if(props.user.role === "operator"){
            storehouse = props.user.store_house
            disable = true
        }

        this.state = {
            loading1: true,
            loading2: true,
            error: null,
            
            entryArticleData: undefined,
            storehouseData: undefined,
            
            disable_storehouse_input: disable,
            outputArticleData:{
                "sale_price":0,
                "quantity":0,
                "storehouse":storehouse,
                "lote_article":0,
            }
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = async () =>{
        // Inicializamos todo en los valores iniciales
        this.setState({loading:true, error:null});
        const articleId = this.props.match.params.articleId;  
        try{
            fetch(`http://127.0.0.1:8000/api/article/entry/all/`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Token ${this.props.token}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    this.setState({loading1:false, entryArticleData:data});
                });
        }
        catch (error) {
            this.setState({loading1:false, error})
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
                    this.setState({loading2:false, storehouseData:data});
                });
        }
        catch (error) {
            this.setState({loading2:false, error})
        }

    }

    handlerChange = (e)=>{
        this.setState({ 
            outputArticleData:{
                ...this.state.outputArticleData,
                [e.target.name]: parseInt(e.target.value)
            }
        })
    }

    handlerSubmit = (e)=>{
        e.preventDefault();
        let idEntryArticle = this.state.outputArticleData.lote_article
        
        fetch(`http://127.0.0.1:8000/api/article/${idEntryArticle}/output/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.outputArticleData)
        })
        .then(response => {
            if (response.ok){
                Swal.fire({
                    title: 'Registrado',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
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
                text:error.response.data,
                confirmButtonText: 'Entendido'
            })
        })
    }

    render(){
        if (this.state.loading1 === true && !this.state.articleData || this.state.loading12 === true && !this.state.storehouseData ){
            return <PageLoading />;
        }
        return (
            <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-center">Añadir Venta</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body mr-4 ml-4">
                    <OutputArticleForm
                    entryArticleData={this.state.entryArticleData}
                    storehouseData={this.state.storehouseData}
                    outputArticleData={this.state.outputArticleData}
                    disabled={this.state.disable_storehouse_input}
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

export default AddOutputArticle;