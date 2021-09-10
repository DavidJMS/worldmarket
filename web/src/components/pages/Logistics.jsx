import React from 'react';
import { Link } from "react-router-dom";
import moment from "moment";

import PageLoading from "../shared/PageLoading";
import SelecArticle from '../forms/SelectArticle';
import LineLogistic from '../shared/LineLogistic';

class Logistics extends React.Component {

    constructor(props){
        super(props); 
        this.state = {
            loading:true,
            loading2:true,
            articles:undefined,

            storehouse:0,

            year: moment().format("YYYY"),
            sales: undefined,
            shopping: undefined,
        }
    }

    componentDidMount(){
        this.fetchArticle();
    }

    fetchArticle = async () =>{
        fetch("http://127.0.0.1:8000/api/article/",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                this.setState({loading:false, articles:data});
        });
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

    handlerArticle = (e)=>{
        this.fetchData(e);
        this.fetchData2(e);
    }

    handlerStore = (e)=>{
        this.setState({storehouse:e.target.value});
    }

    fetchData = async (e) => {
        let data = {
            "year":this.state.year,
            "storehouse":this.state.storehouse
        }
        fetch(`http://127.0.0.1:8000/api/article/logistics/${e.target.value}/sales/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
                },
            body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                this.setState({loading:false,sales:data});
        });
    }
     
    fetchData2 = async (e) => {
        let data = {
            "year":this.state.year,
            "storehouse":this.state.storehouse
        }
        fetch(`http://127.0.0.1:8000/api/article/logistics/${e.target.value}/shopping/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
                },
            body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                this.setState({loading:false,shopping:data});
        });
    }

    handlerYear = (e)=>{
        this.setState({year:e.target.value})
    }

    render(){

      if(this.state.loading == true || this.state.loading2 == true){
        return <PageLoading />
      }

        return(
            <div className="container">
                <div className="row m-2">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Logistica</h3>
                            </div>
                            <div className="card-body ">
                                <SelecArticle 
                                handlerYear={this.handlerYear}
                                year={this.state.year}
                                handlerArticle={this.handlerArticle}
                                storehouseData={this.state.storehouseData}
                                storehouse={this.state.storehouse}
                                handlerStore = {this.handlerStore}
                                articles={this.state.articles}
                                />
                                <LineLogistic 
                                sales={this.state.sales} 
                                shopping={this.state.shopping}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Logistics;