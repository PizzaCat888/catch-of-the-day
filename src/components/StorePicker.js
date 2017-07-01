import React from "react"
import {render} from "react-dom";
import {getFunName} from "../helpers";
// We are using JSX, which allows us to write javascript and html together. 
// Syntax is a bit different, must use closing tags for elements like img and use 
// classname instead of "class" as it is a reserve word for javascript
class StorePicker extends React.Component {

    // constructor() {
    //     super(); //unique method that creates and extends our react component. Must be here
    //     this.goToStore = this.goToStore.bind(this); //looks for the gotoStore method and binds it to the StorePicker component

    // }


    goToStore(event){ //Can make our own methods
        event.preventDefault(); //stops the form from submitting
        console.log("Changed the Url")
        //first grab the text from the box
        const storeId =this.storeInput.value;
        console.log(`Going to ${storeId}`)
        //transition from / to /store/:storeId
        this.context.router.transitionTo(`/store/${storeId}`)
    }
    render() {
        return (
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}> 
                <h2> Please Enter A Store </h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}}/>
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object //tells react that our storepicker component is expecting a router
}
export default StorePicker