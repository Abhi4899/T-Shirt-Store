import React from "react";
import Menu from "./Menu";
const Base = ({
    title = "My Title",
    description = "My description",
    className = "bg-transparent text-white p-4",
    children
}) => {
    return (
        <div>
            <Menu/>
            <div className="container-fluid">
                <div className="jumbotron bg-transparent text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-transparent mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you got any questions reach me out at my email.</h4>
                    <button className="btn btn-warning btn-lg" onClick={() => window.location = 'mailto:abhishek.ch.9452@gmail.com'}>Contact Me</button>
                    <div className="container">
                        <span className="text-white">
                            An Amazing Django React fullstack website.
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Base;