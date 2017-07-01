import React from "react"
import {render} from "react-dom";
import {formatPrice} from "../helpers";


class Order extends React.Component {

    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this) //binds renderOrder to the Order component
    }

    renderOrder(key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];

        if(!fish || fish.status === "unavailable") {
            return <li key={key}> Sorry, {fish ? fish.name : "fish"} is no longer available! </li>
        }
        return (
            <li key={key}>
                <span> {count} lbs {fish.name} </span>
                <span className="price">{formatPrice(count * fish.price)} </span>
            </li>
        )
    }

    render() {
        const orderIds = Object.keys(this.props.order)
        const total = orderIds.reduce((preveTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === "available";
            if(isAvailable) {
                return preveTotal + (count * fish.price || 0)
            }
            return preveTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2> Your Order </h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total: </strong>
                {formatPrice(total)}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Order