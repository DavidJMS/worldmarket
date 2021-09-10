import React from 'react';

import '../styles/loginform.css';
import Logo from '../../images/login/logo_edited.jpg';

class LoginForm extends React.Component {

    render(){
        return(
            <div className="container__form__login animate__animated animate__backInDown">
                <form className="form">
                    <img src={Logo} alt="" />
                    <div className="card-body">
                    <div className="form-group">
                        <input type="text" className="form-control"  placeholder="User" value={this.props.credentials["username"]} name="username" onChange={this.props.handlerChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" value={this.props.credentials.password} name="password" onChange={this.props.handlerChange}/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                        <label className="form-check-label" htmlFor="exampleCheck2">Remember me</label>
                    </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                    <button type="submit" className="btn btn-block btn-success" onClick={this.props.handlerSubmit}>Entrar</button>
                </div>
                {/* /.card-footer */}
                </form>

            </div>
        )
    }
}

export default LoginForm;