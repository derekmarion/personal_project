import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";
import { useOutletContext } from "react-router-dom";

export const SignUp = ({ login, setLogin }) => {
    const { user, setUser } = useOutletContext();
    const [ userName, setUserName ] = useState();
    const [ password, setPassword ] = useState();

    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        let response = await api.post("users/signup", {
            email: userName,
            password: password,
        });
        let user = response.data.user;
        let token = response.data.token;
        // Store the token securely (e.g., in localStorage or HttpOnly cookies)
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        // set the user using with useContext to allow all other pages that need user information
        setUser(user);
        // navigate("/home"); should probably set this to the user's inventory page
    };

    return(
        <>
        <form onSubmit={(e) => signUp(e)}>
                    <br />
                    <input
                      type="email"
                      placeholder="email"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <br />
                    <input
                      type="password"
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="submit" value="Register" />
                  </form>
        </>
    )
};
