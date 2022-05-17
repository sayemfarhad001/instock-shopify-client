import ItemForm from '../../components/ItemForm/ItemForm'
import React, { Component } from 'react'
import axios from 'axios'
import API from "../../components/API/API";

export default class AddItem extends Component {
submitHandler = (formData) => {
    axios.post(`${API.server}/${API.inventory}`, formData)
    .then(() => {
        this.props.history.push(`/${API.inventory}`)})
    .catch((err) => {
        console.log(err)
    })
}
clickHandler = () => {
    this.props.history.push(`/${API.inventory}`)
}
routeClickHandler = () => {
    this.props.history.goBack()
}
    render() {
        return (
            <ItemForm
                title="Add New Inventory Item"
                handleSubmit={this.submitHandler} 
                button="+ Add Item" 
                handleClick={this.clickHandler}
                backClick = {this.routeClickHandler}
                route="/inventory"
            />
        )
    }
}