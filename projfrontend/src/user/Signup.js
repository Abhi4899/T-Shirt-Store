import React, {useState} from "react";
import {Link} from "react-router-dom";
import Base from "../core/Base";
import {signup} from "../auth/helper";

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        repetePassword: "",
        gender: "",
        phone: "",
        error: "",
        success: false,
    });

    const {name,email,password,repetePassword,gender,phone,error,success} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, error:false, [name]: event.target.value});
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false});
        signup({name, email, password, gender, phone})
        .then((data) => {
            console.log("Data", data);
            if (data.email === email)
            {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    repetePassword: "",
                    gender: "",
                    phone: "",
                    error: "",
                    success: true,
                });
            }
            else {
                setValues({
                    ...values,
                    error: true,
                    success: false
                });
            }
        })
        .catch(err => console.log(err));
    };

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style={{display: success? "" : "none"}}
                    >
                        {"New account created succesfully. Please "} 
                        <Link to="/signin">login now.</Link>
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
                        Check all fields again
                    </div>
                </div>
            </div>
        );
    };
    
    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                <h1>{"Hello,"} 
                <span style={{ color: 'red' }}>{
                    values.name.substring(0, values.name.indexOf(' '))
                    }</span>
                <span style={{ color: 'green' }}>{
                    " "+values.name.substring(values.name.indexOf(' ') + 1)
                    }</span>
                </h1>
                    <form >
                        <div className="form-group">
                            <label className="text-light mt-1">Name</label>
                            <input 
                                className="form-control mt-1" value={name} onChange={(handleChange("name"))} type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-1">Gender</label>
                            <select 
                                class="form-select" 
                                aria-label="Default select example"
                                value={gender} onChange={(handleChange("gender"))}
                            >
                                <option selected>Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-1">Email</label>
                            <input 
                                className="form-control mt-1" value={email} onChange={(handleChange("email"))} type="text"
                            />
                        </div>
                        <p className="text-warning text-sm"><span> {
                                values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) || values.email==="" 
                                ? "" : "Enter a valid email!"
                            }
                        </span></p>
                        <div className="form-group">
                            <label className="text-light mt-1">Phone</label>
                            <input 
                                className="form-control mt-1" value={phone} onChange={(handleChange("phone"))} type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input
                                className="form-control mt-1" value={password} onChange={(handleChange("password"))} type="password"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-1">Re-enter Password</label>
                            <input 
                                className="form-control mt-1" 
                                value={repetePassword} 
                                onChange={(handleChange("repetePassword"))} 
                                type="password" 
                            />
                        </div>
                        <p className="text-warning text-sm"><span> {
                                values.password===values.repetePassword || 
                                values.password==="" || 
                                values.repetePassword==="" 
                                ? "" : "Password mismatch!"
                            }</span></p>
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
        <Base title="Sign Up Page" description="A signup for the t-shirt website">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            {/* {JSON.stringify(values)} */}
        </Base>
    );
};

export default Signup;