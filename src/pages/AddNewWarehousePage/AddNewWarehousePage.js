import React from "react";
import axios from "axios";
import "./AddNewWarehousePage.scss";
import Arrow from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";
import Error from "../../assets/icons/error-24px.svg";

export default class AddNewWarehousePage extends React.Component {
  state = {
    addWarehouse: {},
    name: "",
    address: "",
    city: "",
    country: "",
    contact: {
      contactname: "",
      position: "",
      phone: "",
      email: "",
    },
    emailError: "",
    phoneError: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      contact: {
        ...this.state.addWarehouse.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  validate() {
    let textError = "";
    let emailError = "";
    let phoneError = "";
    if (
      !this.state.name ||
      !this.state.address ||
      !this.state.city ||
      !this.state.country
    ) {
      textError = (
        <p>
          {" "}
          <img src={Error} alt="error" /> This field is required{" "}
        </p>
      );
    }
    let ref =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let useEmail = this.state.email;
    if (!useEmail || !ref.test(useEmail)) {
      emailError = (
        <p>
          {" "}
          <img src={Error} alt="error" /> Please enter a valid email{" "}
        </p>
      );
    }
    let usePhone = this.state.phone;
    const phonenumber = /^\d{10}$/;
    if (!usePhone || !phonenumber.test(usePhone)) {
      phoneError = (
        <p>
          {" "}
          <img src={Error} alt="error" /> Please enter a valid phone number{" "}
        </p>
      );
    }
    if (emailError || textError || phoneError) {
      this.setState({ textError, emailError, phoneError });
      return false;
    }
    return true;
  }

  redirect = () => {
    window.location.href = "/warehouses";
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.validate()) {
      axios.post("http://localhost:2000/warehouses", {
        name: this.state.name,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        contact: {
          name: this.state.contactname,
          position: this.state.position,
          phone: this.state.phone,
          email: this.state.email,
        },
      });
      alert("Warehouse Added");
      this.redirect();
    } else {
      alert(
        "Failed to add warehouse, please make sure all fields are filled out"
      );
    }
  };

  render() {
    return (
      <section className="add-warehouse">
        <div className="add-warehouse__container">
          <h1 className="add-warehouse__title">
            <Link to={"/warehouses"}>
              <img src={Arrow} alt="back arrow" />
            </Link>
            Add New Warehouse
          </h1>
          <form
            className="add-warehouse__form"
            onSubmit={this.handleSubmit}
          >
            <div className="add-warehouse__form--container">
              <div className="add-warehouse__form--warehouse-details">
                <h2 className="add-warehouse__form--subtitle">Warehouse Details</h2>
                <label className="add-warehouse__form--label">Warehouse Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  placeholder="Warehouse Name"
                ></input>
                <span className="text-danger">{this.state.textError}</span>
                <label className="add-warehouse__form--label">Street Address</label>
                <input
                  type="text"
                  name="address"
                  onChange={this.handleChange}
                  value={this.state.address}
                  placeholder="Street Address"
                />
                <span className="text-danger">{this.state.textError}</span>
                <label className="add-warehouse__form--label">City</label>
                <input
                  type="text"
                  name="city"
                  onChange={this.handleChange}
                  value={this.state.city}
                  placeholder="City"
                ></input>
                <span className="text-danger">{this.state.textError}</span>
                <label className="add-warehouse__form--label">Country</label>
                <input
                  type="text"
                  name="country"
                  onChange={this.handleChange}
                  value={this.state.country}
                  placeholder="Country"
                ></input>
                <span className="text-danger">{this.state.textError}</span>
              </div>
              <div className="add-warehouse__form--contact-details">
                <h2 className="add-warehouse__form--subtitle">Contact Details</h2>
                <label className="add-warehouse__form--label">Contact Name</label>
                <input
                  type="text"
                  name="contactname"
                  onChange={this.handleChange}
                  value={this.state.contact.contactname}
                  placeholder="Contact Name"
                ></input>
                <span className="text-danger">{this.state.textError}</span>
                <label className="add-warehouse__form--label">Position</label>
                <input
                  type="text"
                  name="position"
                  onChange={this.handleChange}
                  value={this.state.contact.position}
                  placeholder="Position"
                ></input>
                <span className="text-danger">{this.state.textError}</span>
                <label className="add-warehouse__form--label">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  onChange={this.handleChange}
                  value={this.state.contact.phone}
                  placeholder="Phone Number"
                ></input>
                <span className="text-danger">{this.state.phoneError}</span>
                <label className="add-warehouse__form--label">Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.contact.email}
                  placeholder="Email"
                ></input>
                <span className="text-danger">{this.state.emailError}</span>
              </div>
            </div>
            <div className="add-warehouse__form--buttons">
              <button className="button--cancel" type="reset">
                Cancel
              </button>
              <button className="button--submit" type="submit">
                + Add Warehouse
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
