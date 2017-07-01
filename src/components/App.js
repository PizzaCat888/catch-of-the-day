import React from "react"
import {render} from "react-dom";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
    //state in React allows several components to be edited at the same time without editing the actual tags
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);

        //initial state
        this.state = {
            fishes: {},
            order: {}
        }
    }

    componentWillMount() { //native react lifecycle hook method
        //this runs before the <app> is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
        {
            context: this,
            state: "fishes"
        });

        //check ifthere is any orders in localstorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    
        if(localStorageRef) {
            //update our app component's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) { //updates when our state state changes
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order)); //stores our data in a string in local storage
    }

    addFish(fish) {
    //update our state

    const fishes = {...this.state.fishes} //copy current state
    //add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;

    //this.state.fishes.fish1 = fish;

    //set state  
    this.setState({fishes: fishes}) //everytime we change fishes, all instances of fishes will change    
    }

    loadSamples() {
       this.setState ({
           fishes: sampleFishes
       })
    }

    addToOrder(key) {
        //take a copy of our state
        const order={...this.state.order};
        //update on add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        //update our state
        this.setState({ order: order})
    }

    render() {
        return (
          <div className="catch-of-the-day">
              <div className="menu">
                  <Header tagline="Fresh Seafood Market"/>
                  <ul className="list-of-fishes">
                      {Object
                      .keys(this.state.fishes)
                      .map(key => <Fish key={key} 
                      index={key}
                      details={this.state.fishes[key]}
                      addToOrder={this.addToOrder}
                      />)} 
                      {/*Object.keys returns a list of objects. We need a key to make it unique, otherwise react won't know what to update*/}
                      {/*a key helps specfies what object is being manipulated*/}
                  </ul>
              </div>
              <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params}/>
              <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
          </div>
        
        )
    } 
}

export default App;