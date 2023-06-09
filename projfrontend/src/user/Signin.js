import React, {useState} from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";


const Signin = () => {
    const [values, setValues] = useState({
        name: "",
        email: "ten10@gmail.com",
        password: "123456789",
        error: false,
        success: false,
        loading: false,
        didRedirect: false,
        errmsg: ""
    });

    const {name,email,password,error,success, loading, didRedirect,errmsg} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, error:false, [name]: event.target.value});
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false, loading:true});
        signin({email, password})
        .then((data) => {
            console.log("DATA",data);
            if (data.token) {
                //let sessionToken = data.token;
                authenticate(data, () => {
                    console.log("TOKEN ADDED");
                    setValues({
                        ...values,
                        didRedirect: true,
                        error: false,
                        success: true
                    });
                });
            }
            else {
                setValues({
                    ...values,
                    loading:false,
                    error:true,
                    success: false,
                    errmsg:data.error
                });
            }
        })
        .catch(e => console.log(e));
    };

    const performRedirect = () => {
        if (isAuthenticated()) {
            return <Redirect to="/"/>;
        }
    };

    const loadingMessage = () => {
        return(
            loading &&  (
                <div className="alert alert-info">
                    <h3>Loading...</h3>
                </div>
            )
        );
    };

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style={{display: success? "" : "none"}}
                    >
                        Logging in...
                    </div>
                </div>
            </div>
        );
    };
    
    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{display: error? "" : "none"}}
                    >
                        {values.errmsg}
                    </div>
                </div>
            </div>
        );
    };

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group">
                            <label className="text-light mt-1">Email</label>
                            <input 
                                className="form-control mt-1" value={email} onChange={(handleChange("email"))} type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input
                                className="form-control mt-1" value={password} onChange={(handleChange("password"))} type="password"
                            />
                        </div>
                        <button 
                             onClick={onSubmit}
                            className="btn btn-success btn-block w-100 mt-2">
                                Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <Base title="Signin Page" description="T-shirt store">
            {loadingMessage()}
            {successMessage()}
            {errorMessage()}
            {signInForm()}
            <p className="text-center">
                {JSON.stringify(values)}
            </p>
            {performRedirect()}
        </Base>
    );
};

export default Signin;