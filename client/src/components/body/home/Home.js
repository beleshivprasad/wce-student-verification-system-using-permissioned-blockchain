import React from "react";
import c1 from "../../../carousel1.jpg";
import c2 from "../../../carousel2.jpg";
import c3 from "../../../carousel3.jpg";
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";


function Home() {

    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth
    return (
    <div>
        <h1 className="h1">Welcome to Our Verification Services</h1>
            {
                isLogged ? <h2 className="h2"><Link to='/verify'>Get Started</Link></h2> : <h2 className="h2"><Link to='/login'>Login to Get Started</Link></h2>
            }
    </div>
    );
}

export default Home;
