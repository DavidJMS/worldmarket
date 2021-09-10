import React, {useState, useContext} from 'react'
import { Switch, Route, useRouteMatch} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Components
import Navbar from '../components/shared/Navbar';

import Article from '../components/pages/Articles';
import AddArticle from '../components/pages/AddArticle';
import EditArticle from '../components/pages/EditArticle';

import Type from '../components/pages/Types';
import AddType from '../components/pages/AddType';
import EditType from '../components/pages/EditType';

import Brand from '../components/pages/Brand';
import AddBrand from '../components/pages/AddBrand';
import EditBrand from '../components/pages/EditBrand';

import EntryArticle from '../components/pages/EntryArticle';
import AddEntryArticle from '../components/pages/AddEntryArticle';

import OutputArticle from '../components/pages/OutputArticle';
import AddOutputArticle from '../components/pages/AddOutputArticle';

import Logistics from '../components/pages/Logistics';
import LogisticsBest from '../components/pages/LogisticsBest';

import Store from '../components/pages/Stores';
import AddStore from '../components/pages/AddStore';
import EditStore from '../components/pages/EditStore';

import User from '../components/pages/Users';
import AddUser from '../components/pages/AddUser';
import EditUser from '../components/pages/EditUser';

// Style
import "./styles/home.css"

function Home (props){

    const auth = useContext(AuthContext);
    const { path } = useRouteMatch();
    if (!auth.token){
        props.history.push("/");
    }

    return(
        <div className="wrapper">
            <Navbar {...props} token={auth.token} user={auth.user} />
            <div className="content-wrapper">
                <Switch> 
                    {/* Articles */}
                    <Route exact path={`${path}/init`} render={(props) => (<Article {...props} token={auth.token} />)} />
                    <Route exact path={`${path}/article/new`} render={(props) => (<AddArticle {...props} token={auth.token} />)} />
                    <Route exact path={`${path}/article/:articleId/edit`} render={(props) => (<EditArticle {...props} token={auth.token} />)} />
                    {/* Logistics */}
                    <Route exact path={`${path}/logistics`} render={(props) => (<Logistics {...props} token={auth.token} />)} />
                    <Route exact path={`${path}/logistics/best`} render={(props) => (<LogisticsBest {...props} token={auth.token} />)} />
                    {/* Types */}
                    <Route exact path={`${path}/type`} render={(props) => (<Type {...props} token={auth.token} />)} />
                    <Route exact path={`${path}/type/new`} render={(props) => (<AddType {...props} token={auth.token} />)} />
                    <Route exact path={`${path}/type/:typeId/edit`} render={(props) => (<EditType {...props} token={auth.token} />)} />
                    {/* Brands */}
                    <Route exact path={`${path}/brand`} render={(props) => (<Brand {...props} token={auth.token} />)} />
                    <Route exact path={`${path}/brand/new`} render={(props) => (<AddBrand {...props} token={auth.token} />)} />
                    <Route exact path={`${path}/brand/:brandId/edit`} render={(props) => (<EditBrand {...props} token={auth.token} />)} />
                    {/* Entry Articles */}
                    <Route exact path={`${path}/article/entry`} render={(props) => (<EntryArticle {...props} token={auth.token} user={auth.user} />)} />
                    <Route  path={`${path}/article/entry/new`} render={(props) => (<AddEntryArticle {...props} token={auth.token} user={auth.user} />)} />
                    {/* Output Articles */}
                    <Route exact path={`${path}/article/output`} render={(props) => (<OutputArticle {...props} token={auth.token} user={auth.user} />)} />
                    <Route exact path={`${path}/article/output/new`} render={(props) => (<AddOutputArticle {...props} token={auth.token} user={auth.user} />)} />
                     {/* Store */}
                    <Route exact path={`${path}/store`} render={(props) => (<Store {...props} token={auth.token} />)} />
                    <Route exact path={`${path}/store/new`} render={(props) => (<AddStore {...props} token={auth.token} />)} />
                    <Route exact path={`${path}/store/:storedId/edit`} render={(props) => (<EditStore {...props} token={auth.token} />)} />
                    {/* Users */}
                    <Route exact path={`${path}/users`} render={(props) => (<User {...props} token={auth.token} user={auth.user} />)} />
                    <Route exact path={`${path}/users/new`} render={(props) => (<AddUser {...props} token={auth.token} />)} />
                    <Route exact path={`${path}/users/:userId/edit`} render={(props) => (<EditUser {...props} token={auth.token} />)} />
                </Switch>
            </div>
        </div>
    )
}

export default Home;