import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";
import { useOutletContext } from "react-router-dom";

export const LogOut = ({ user, setUser, login, setLogin }) => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      let response = await api.post("users/logout");
      if (response.status === 204) {
        // Remove the token from secure storage (e.g., localStorage)
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        // set the user using with useContext to allow all other pages that need user information
        setUser(null);
        setLogin(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return <button onClick={logOut}>Logout</button>;
};
