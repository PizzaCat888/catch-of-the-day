// let's go!
import React from "react"
import {render} from "react-dom";
import {BrowserRouter, Match, Miss} from "react-router";

import "./css/style.css";
import Notfound from "./components/Notfound"
import App from "./components/App"
import StorePicker from "./components/StorePicker"

const Root = () => {
    return(
        <BrowserRouter>
        <div>
        {/*show storepicker component when we are on this url*/}
            <Match exactly pattern="/" component={StorePicker} />
            <Match exactly pattern="/store/:storeId" component={App} />
            <Miss component={Notfound}/>
        </div>
        </BrowserRouter>
    )
}

render(<Root/>, document.querySelector("#main")) 
