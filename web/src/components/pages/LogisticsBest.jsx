import React from 'react';
import moment from "moment";

import SelecDateRange from '../forms/SelectDateRange';
import BarLogistic from '../shared/BarLogistic';
import PageLoading from "../shared/PageLoading";

class LogisticsBest extends React.Component {

    constructor(props){
        super(props); 
        this.state = {
            loading1:true,
            loading2:true,
            loading3:true,
            dataShopping: undefined,
            dataSales: undefined,

            storehouseData:undefined,

            data:{
                "from_date":moment().format("YYYY-MM-DD"),
                "to_date":moment().format("YYYY-MM-DD"),
                "storehouse":0,
                "all":false,
            }
        }
    }

    componentDidMount(){
        this.fetchStore();
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
                    this.setState({loading3:false, storehouseData:data});
                });
        }
        catch (error) {
            this.setState({loading3:false, error})
        }
    }

    fetchData = async (e) => {
        fetch(`http://127.0.0.1:8000/api/article/logistics/16/max_shopping/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
                },
                body: JSON.stringify(this.state.data)
            })
            .then(response => response.json())
            .then(data => {
                this.setState({loading1:false,dataShopping:data});
        });
        fetch(`http://127.0.0.1:8000/api/article/logistics/16/max_sales/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Token ${this.props.token}`
                },
                body: JSON.stringify(this.state.data)
            })
            .then(response => response.json())
            .then(data => {
                this.setState({loading2:false,dataSales:data});
        });
    }

    handlerChange = (e)=>{
        if (e.target.name == "all"){
            let all = !this.state.data.all;
            this.setState({ 
                data:{
                    ...this.state.data,
                    all: all
                }
            }) 
        }
        else{
            this.setState({ 
                data:{
                    ...this.state.data,
                    [e.target.name]: e.target.value
                }
            })    
        }   
    };

    handlerSubmit = (e)=>{
        e.preventDefault();
        this.fetchData();
    }

    handlerStore = (e)=>{
        this.setState({
            data : {
                ...this.state.data,
                storehouse: e.target.value,
            }
        });
    }

    render(){
        if (this.state.loading3 === true && !this.state.storehouseData){
            return <PageLoading />;
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Máximos</h3>
                            </div>
                            <div className="card-body ">
                                <SelecDateRange 
                                data={this.state.data}
                                handlerChange={this.handlerChange}
                                handlerSubmit={this.handlerSubmit}
                                handlerStore={this.handlerStore}
                                storehouseData={this.state.storehouseData}
                                storehouse={this.state.storehouse}
                                />
                                <BarLogistic
                                submit={this.state.submit}
                                dataShopping={this.state.dataShopping}
                                dataSales={this.state.dataSales}
                                loading1={this.state.loading1}
                                loading2={this.state.loading2}
                                loading3={this.state.loading3}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogisticsBest;