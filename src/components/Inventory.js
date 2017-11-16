import React from "react"
import {render} from "react-dom";
import AddFishForm from "./AddFishForm";
import base from "../base";


class Inventory extends React.Component {
    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            uid: null, 
            owner: null
        }
    }

    componentDidMount() {
        //keeps user logged in if user refreshes page - immediately logs in the user
        base.onAuth((user) => {
            if(user) {
                this.authHandler(null, {user});
            }
        }) 
    }
    
    handleChange(e, key) {
        const fish = this.props.fishes[key];
        //take a copy of that fish and update it with the new data through the onChange event handler
        const updatedFish = {
            ...fish, //ES6 spread
            [e.target.name]: e.target.value
        }
        this.props.updateFish(key, updatedFish) //pass the data up in our App.js
    }

    authenticate(provider) {
        console.log("Attempting to log in to ${provider}")
        base.authWithOAuthPopup(provider, this.authHandler); //takes in a callback function
    }

    logout() {
        base.unauth();
        this.setState({
            uid: null
        })
    }

    authHandler(err, authData){
        console.log(authData)
        if(err) {
            console.error(err);
            return;
        }

        //grab store info
        const storeRef = base.database().ref(this.props.storeId) //property of storeId passed via App.js

        //query the database once for the store data
        storeRef.once("value", (snapshot) => {
            const data = snapshot.val() || {};

            //claim it as own if there is no owner already
            if(!data.owner) {
                storeRef.set({
                    owner: authData.user.uid
                })
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            })
        })

    }

    renderLogin() {
        return(
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={()=> this.authenticate('github')}> Log In with Github</button>
                <button className="facebook" onClick={()=> this.authenticate('facebook')}> Log In with Facebook</button>
            </nav>
        )
    }
 
    renderInventory(key) {
        const fish = this.props.fishes[key];

        return ( //Need an onchange listener
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)}/>
                <input type="text" name="price" value={fish.price} placeholder="Fish Price"  onChange={(e) => this.handleChange(e, key)} />
                <select type="text" name="status" value={fish.status} placeholder="Fish Status"  onChange={(e) => this.handleChange(e, key)} >
                    <option value="available"> Fresh! </option>
                    <option value="unavailable"> Sold Out! </option>
                </select>
                <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc"  onChange={(e) => this.handleChange(e, key)}></textarea>
                <input type="text" name="image" value={fish.image} placeholder="Fish Image"  onChange={(e) => this.handleChange(e, key)} />
                <button onClick={()=> this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    render() {
        const logout = <button onClick={this.logout}> Log Out! </button>

        //check if user is logged in
        if(!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        //check if they are the owner of the current stsore
        if(this.state.uid !== this.state.owner) {
            return(
                <div>
                    <p> Sorry, you don't own this store! </p>
                    {logout}
                </div>
            )
        }


        return (
            <div> 
            <h2>Inventory</h2>
            {logout}
            {Object.keys(this.props.fishes).map(this.renderInventory)}
            <AddFishForm addFish={this.props.addFish}/> 
            <button onClick={this.props.loadSamples}>Load Sample Files </button>
            </div>
        )
    }
}

Inventory.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    updatedFish: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    addFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired
}

export default Inventory