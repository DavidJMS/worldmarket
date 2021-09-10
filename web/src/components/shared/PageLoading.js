import React from "react";

import "../styles/PageLoading.css";
import Loader from "./Loader";

class PageLoading extends React.Component{
    render(){
        return(
            <div className="PageLoading">
                <Loader/>
            </div>
        )
    }
}

export default PageLoading;