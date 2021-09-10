import React, {useState, useContext} from "react";

const AuthContext = React.createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {

    const myToken = localStorage.getItem("token");
    const myUser = localStorage.getItem("user");

    const [token, setToken] = useState(myToken);

    const [user, setUser] = useState(JSON.parse(myUser));


    const userLogin = (tok, user)=> {
        localStorage.setItem("token",tok);
        localStorage.setItem("user",JSON.stringify(user));
        setToken(tok);
        setUser(user);
      }
    
    return(
        <AuthContext.Provider value={{token,user,userLogin}}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, AuthContext, useAuth}