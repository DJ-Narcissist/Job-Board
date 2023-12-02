import React, { useContext } from "react";
import "./Homepage.css"
import { Link } from "react-router-dom";

/**Just a welcome page simple containing Signup, 
 * login, 
 * profile submit button, 
 * NavBar,
 * 
 * 
 */
const HomePage = () => {

    const { currentUser } = useContext(useContext);
    console.debug("Homepage", "currentUser", currentUser);

    return (
        <div className="Homepage">
            <div className="container">
                <h1 className="mb-3 fw-bold">JOBS FOR YOU</h1>
                <p className="lead">Jobs in your area</p>
                {currentUser
                ? <h2> 
                    Welcome , {currentUser.firstName || currentUser.lastName}!
                    </h2>
                :(
                    <p>
                        <Link className="btn  btn-primary fw-bold me-3"
                        to="/login" >
                            Login
                        </Link>
                        <Link className="btn btn-primary fe-bold"
                        to="/signup">
                            Sign up
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}


export default HomePage;