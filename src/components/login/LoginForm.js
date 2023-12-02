import React, { useState } from "react";
import { useNavigate} from "react-router-dom";


const LoginForm = ({ login }) => {
    const history = useNavigate
    const [formData, setFormData] = useState({
        username:"",
        password:"",
    });
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors", formErrors,
    );

    /**Handle form submit:
     * Calls login function prop and if sucessful redirect to /companies.
     */
}


export default LoginForm;