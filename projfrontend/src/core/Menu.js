import React, {Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

const infos = {
    color: "",
}

const currentTab = () => (history, path) => {
    if (history.location.pathname === path) {
        infos.color= "#2ecc72";
    }
    else {
        infos.color= "#FFFFFF";
    }
};

const Menu = ({history, path}) => {
    return (
        <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
            <ul className="nav nav-tabs bg-dark border-0 align-right">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/">Home</Link>
                </li>
                {isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/cart">Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/user/dashboard">Dashboard</Link>
                        </li>
                    </Fragment>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/signup">Signup</Link>
                        </li>
                        <li clasName="nav-item">
                            <Link className="nav-link text-white" to="/signin">Signin</Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                        onClick={() => {
                            signout(() => {
                                history.push("/");
                            })
                        }}
                        className="nav-link text-warning">Signout</span>
                    </li>
                )}
            </ul>
        </div>
        </nav>
    );
};

export default withRouter(Menu);