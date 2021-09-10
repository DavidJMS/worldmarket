import React  from "react";
import moment from "moment";
import Swal from 'sweetalert2';

import PageLoading from "../shared/PageLoading";
import EntryArticleForm from "../forms/EntryArticleForm";

class AddEntryArticle extends React.Component{

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
            
            articleData: undefined,
            
            storehouseData:undefined,
            
            disable_storehouse_input: disable,
            entryArticleData:{
                "article":0,
                "quantity":0,
                "purchase_price":0,
                "storehouse":storehouse,
                "due_date": moment().format("YYYY-MM-DD")
            }
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = async () =>{
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
                    this.setState({loading2:false, articleData:data});
                });
        }
        catch (error) {
            this.setState({loading2:false, error})
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
        let value = null
        if (e.target.name === "due_date"){
            value = moment(e.target.value).format("YYYY-MM-DD")
        }
        if (e.target.name != "due_date"){
            value = parseInt(e.target.value)
        }
        this.setState({ 
            entryArticleData:{
                ...this.state.entryArticleData,
                [e.target.name]: value
            }
        })
    }

    handlerSubmit = (e)=>{
        e.preventDefault();
        let idArticle = this.state.entryArticleData.article
        let due_data = moment(this.state.entryArticleData.due_date).format("YYYY-MM-DD[T]HH:mm:ss")
        this.state.entryArticleData.due_date = due_data
        
        fetch(`http://127.0.0.1:8000/api/article/${idArticle}/entry/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.entryArticleData)
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
                text:'Algo salio mal!',
                confirmButtonText: 'Entendido'
            })
        })
    }

    render(){

        if (this.state.loading1 === true && !this.state.articleData || this.state.loading2 === true && !this.state.storehouseData){
            return <PageLoading />
        }

        return (
            <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-center">Añadir Compra</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body mr-4 ml-4">
                    <EntryArticleForm 
                    entryArticleData={this.state.entryArticleData}
                    articleData={this.state.articleData}
                    disabled={this.state.disable_storehouse_input}
                    storehouseData={this.state.storehouseData}
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

export default AddEntryArticle;