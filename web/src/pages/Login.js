import React, {useState, useContext} from 'react'

import LoginForm from '../components/forms/LoginForm.jsx';
import { AuthContext } from '../context/AuthContext.js';

import './styles/login.css'

const Login = (props) => {

    const auth = useContext(AuthContext)
    // console.log(auth["token"]);

    const [credentials, setCredentials] = useState({username:"",password:""})

    const handlerChange = (e)=>{
        const cred = credentials;
        setCredentials({...cred, [e.target.name]:e.target.value});
    }

    const handlerSubmit = (e)=>{
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/accounts/login/",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        })
        .then(response => response.json())
        .then(data => {
            const token = data["access_token"]
            const user = data["user"]
            auth.userLogin(token, user)
            if (user.role === "admin"){
                props.history.push("/home/init")
            }
            else{
                props.history.push("/home/article/entry")
            }
        });
    }

    return(
        <div className="container__login ">
            <LoginForm 
            credentials={credentials} 
            handlerChange={handlerChange}
            handlerSubmit={handlerSubmit}
            />
        </div>
    )
}

export default Login;