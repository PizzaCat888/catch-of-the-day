import React from "react"
import {render} from "react-dom";

// We are using JSX, which allows us to write javascript and html together. 
// Syntax is a bit different, must use closing tags for elements like img and use 
// classname instead of "class" as it is a reserve word for javascript
class StorePicker extends React.Component {
    render() {
        return (
            <form className="store-selector"> 
                <h2> Please Enter A Store </h2>
                <input type="text" required placeholder="Store Name" />
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}


export default StorePicker