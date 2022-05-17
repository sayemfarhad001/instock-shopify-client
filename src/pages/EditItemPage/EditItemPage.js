import ItemForm from '../../components/ItemForm/ItemForm'
import React, { Component } from 'react'
import axios from 'axios'
import API from "../../components/API/API";

export default class EditItemPage extends Component {
    state = {
        itemName: "",
        description: "",
        category: null,
        status: null,
        quantity: 0,
        warehouse: null,
        loaded: false,
        location: null
    }
    componentDidMount = () => {
        const id  = this.props.match.params.inventoryId;
        axios.get(`${API.server}/inventories/${id}`)
        .then((res) => {
            const {itemName, description, category, status, quantity, warehouseID} = res.data
            this.setState({itemName, description, category, status, quantity, warehouse: warehouseID, loaded: true})
        })
    }
 
    submitHandler = (formData) => {
        const id  = this.props.match.params.inventoryId;
        axios.put(`${API.server}/inventories/${id}/edit`, formData )
        .then((res) => {
            this.props.history.push(`/inventories/${id}`)
            this.props.onChangeHandler(res.data)
        }).catch(err => console.log(err))
        
    }
    clickHandler = () => {
        this.props.history.push(`/inventories`)
    }

    routeClickHandler = () => {
        this.props.history.goBack()
    }

    render() {
        if(this.state.loaded === false){
            return <div>Loading...</div>
        }
        return (
            <ItemForm 
                title="Edit Inventory Item"
                handleSubmit = {this.submitHandler}
                initialFormData = {this.state}
                button = "Save"
                handleClick={this.clickHandler}
                backClick = {this.routeClickHandler}
                route= "/warehouses"
            />
        )
    }
}