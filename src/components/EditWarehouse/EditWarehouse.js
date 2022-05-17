import React from "react";
import API from "../API/API";
import axios from "axios";
import Error from "../../assets/icons/error-24px.svg";
import Arrow from "../../assets/icons/arrow_back-24px.svg";
import "./EditWarehouse.scss";
import { get } from "lodash";
import { Link } from "react-router-dom";

export default class EditWarehouse extends React.Component {
  state = {
    editWarehouse: {},
    loaded: false,
    phoneInputValue: "",
  };

  componentDidMount() {
    let id = this.props.match.params.warehouseId;
    axios.get(`${API.server}/warehouses/${id}`)
    .then(res => {
      this.setState({
        editWarehouse: res.data,
        phoneInputValue: res.data.phone,
        loaded:true,
      });
    })
    .catch(err => {
    console.log("error", err)
    })
  }
  onSaveEdits = (e) => {
    const { value, name } = e.target;
    e.preventDefault();

    if (name.includes("phone")) {
      const formattedPhoneNumber = this.formatPhoneNumber(e.target.value);
      this.setState({ phoneInputValue: formattedPhoneNumber });
    }

    if (name.includes("contact")) {
      // Parse actual field name
      const contactFieldName = name.split(".")[1];
      this.setState({
        editWarehouse: {
          ...this.state.editWarehouse,
          contact: {
            ...this.state.editWarehouse.contact,
            [contactFieldName]: value,
          },
        },
      });
    } else {
      this.setState({
        editWarehouse: {
          ...this.state.editWarehouse,
          [name]: e.target.value,
        },
      });
    }
  };

  validateEmail = () => {
    let emailError = "";
    if (!this.state.editWarehouse.email.includes("@")) {
      emailError = "invalid email";
      alert("please use @ in the email section in order to submit");
    }
    if (emailError) {
      this.setState({ emailError });
      return false;
    }
    return true;
  };

  validateInputs = () => {
    if (
      this.state.editWarehouse.warehouse !== "" &&
      this.state.editWarehouse.address !== "" &&
      this.state.editWarehouse.city !== "" &&
      this.state.editWarehouse.country !== "" &&
      this.state.editWarehouse.name !== "" &&
      this.state.editWarehouse.position !== "" &&
      this.state.editWarehouse.phone !== "" &&
      this.state.editWarehouse.email !== ""
    ) {
    } else {
      alert("All fields must be filled to save");
      return false;
    }
    if (this.state.editWarehouse.phone !== "") {
    }
    return true;
  };

  formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (!value) {
      return value;
    }

    if (phoneNumberLength < 4) {
      return phoneNumber;
    }

    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  redirect = () => {
    window.location.href="/warehouses"
}


  handleSubmit = (e) => {
    e.preventDefault();

    let id = this.state.editWarehouse.id;
    // Check that all fields are valid
    const isValidEmail = this.validateEmail();
    const isValidInputs = this.validateInputs();

     if (isValidEmail && isValidInputs) {
      axios.put(
        `${API.server}/${API.warehouses}/${id}/edit`,
        {
          id: id,
          name: e.target.warehouse.value,
          address: e.target.address.value,
          city: e.target.city.value,
          country: e.target.country.value,
          contact: {
            name: e.target.contactname.value,
            position: e.target.position.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
          },
        }
      );
    }
     this.redirect()
  };

  render() {
    if (this.state.editWarehouse !== {}) {
      return (
        <section className="editwarehouse">
          <div className="editwarehouse__nav">
            <Link to={`/warehouses`}>
              <img
                className="editwarehouse__image"
                src={Arrow}
                alt="go back to warehouse details"
              />
            </Link>
            <h1 className="editwarehouse__title">Edit Warehouse</h1>
          </div>
          <form
            className="editwarehouse__form"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <div className="top-section">
              <div className="editwarehouse__details">
                <h1 className="editwarehouse__details-title">
                  Warehouse Details
                </h1>
                <div className="editwarehouse__details-top">
                  <h1 className="editwarehouse__details-name">
                    Warehouse Name
                  </h1>
                  <label
                    className="editwarehouse__details-label"
                    htmlFor="name"
                  />
                  <input
                    className={`editwarehouse__details-name-input ${
                      this.state.editWarehouse.warehouse === ""
                        ? "editwarehouse__details-name-error"
                        : " "
                    }`}
                    name="warehouse"
                    defaultValue={get(this.state.editWarehouse, "warehouse")}
                    onChange={this.onSaveEdits}
                  />
                  <div
                    className={`editwarehouse__wrapper ${
                      this.state.editWarehouse.warehouse === ""
                        ? "editwarehouse__wrapper-error"
                        : " "
                    }`}
                  >
                    <img
                      className="editwarehouse__wrapper-image"
                      src={Error}
                      alt="error alert"
                    />
                    <p className="editwarehouse__wrapper-text">
                      This field is required
                    </p>
                  </div>
                </div>
                <div className="editwarehouse__details-mid">
                  <h1 className="editwarehouse__details-address">
                    Street Address
                  </h1>
                  <label
                    className="editwarehouse__details-label"
                    htmlFor="address"
                  />
                  <input
                    className={`editwarehouse__details-address-input ${
                      this.state.editWarehouse.address === ""
                        ? "editwarehouse__details-address-error"
                        : " "
                    }`}
                    name="address"
                    defaultValue={get(this.state.editWarehouse, "address")}
                    onChange={this.onSaveEdits}
                  />
                  <div
                    className={`editwarehouse__wrapper ${
                      this.state.editWarehouse.address === ""
                        ? "editwarehouse__wrapper-error"
                        : " "
                    }`}
                  >
                    <img
                      className="editwarehouse__wrapper-image"
                      src={Error}
                      alt="error alert"
                    />
                    <p className="editwarehouse__wrapper-text">
                      This field is required
                    </p>
                  </div>
                </div>
                <div className="editwarehouse__details-mid">
                  <h1 className="editwarehouse__details-city">City</h1>
                  <label
                    className="editwarehouse__details-label"
                    htmlFor="city"
                  />
                  <input
                    className={`editwarehouse__details-city-input ${
                      this.state.editWarehouse.city === ""
                        ? "editwarehouse__details-city-error"
                        : " "
                    }`}
                    name="city"
                    defaultValue={get(this.state.editWarehouse, "city")}
                    onChange={this.onSaveEdits}
                  />
                  <div
                    className={`editwarehouse__wrapper ${
                      this.state.editWarehouse.city === ""
                        ? "editwarehouse__wrapper-error"
                        : " "
                    }`}
                  >
                    <img
                      className="editwarehouse__wrapper-image"
                      src={Error}
                      alt="error alert"
                    />
                    <p className="editwarehouse__wrapper-text">
                      This field is required
                    </p>
                  </div>
                </div>
                <div className="editwarehouse__details-bottom">
                  <h1 className="editwarehouse__details-country">Country</h1>
                  <label
                    className="editwarehouse__details-label"
                    htmlFor="country"
                  />
                  <input
                    className={`editwarehouse__details-country-input ${
                      this.state.editWarehouse.country === ""
                        ? "editwarehouse__details-country-error"
                        : " "
                    }`}
                    name="country"
                    defaultValue={get(this.state.editWarehouse, "country")}
                    onChange={this.onSaveEdits}
                  />
                  <div
                    className={`editwarehouse__wrapper ${
                      this.state.editWarehouse.country === ""
                        ? "editwarehouse__wrapper-error"
                        : " "
                    }`}
                  >
                    <img
                      className="editwarehouse__wrapper-image"
                      src={Error}
                      alt="error alert"
                    />
                    <p className="editwarehouse__wrapper-text">
                      This field is required
                    </p>
                  </div>
                </div>
              </div>
              <div className="editwarehouse__contact-details">
                <h1 className="editwarehouse__contact-details-title">
                  Contact Details
                </h1>
                <div className="editwarehouse__contact-top">
                  <h1 className="editwarehouse__contact-name">Contact Name</h1>
                  <label
                    className="editwarehouse__contact-label"
                    htmlFor="contactname"
                  />
                  <input
                    className={`editwarehouse__contact-name-input ${
                      get(this.state.editWarehouse, "contactname") === ""
                        ? "editwarehouse__contact-name-error"
                        : " "
                    }`}
                    name="contactname"
                    defaultValue={get(this.state.editWarehouse, "name")}
                    onChange={this.onSaveEdits}
                  />
                  <div
                    className={`editwarehouse__wrapper ${
                      get(this.state.editWarehouse, "name") === ""
                        ? "editwarehouse__wrapper-error"
                        : " "
                    }`}
                  >
                    <img
                      className="editwarehouse__wrapper-image"
                      src={Error}
                      alt="error alert"
                    />
                    <p className="editwarehouse__wrapper-text">
                      This field is required
                    </p>
                  </div>
                </div>
                <div className="editwarehouse__contact-mid">
                  <h1 className="editwarehouse__contact-position">Position</h1>
                  <label
                    className="editwarehouse__contact-label"
                    htmlFor="position"
                  />
                  <input
                    className={`editwarehouse__contact-position-input ${
                      get(this.state.editWarehouse, "position") === ""
                        ? "editwarehouse__contact-position-error"
                        : " "
                    }`}
                    name="position"
                    defaultValue={get(
                      this.state.editWarehouse,
                      "position"
                    )}
                    onChange={this.onSaveEdits}
                  />
                  <div
                    className={`editwarehouse__wrapper ${
                      get(this.state.editWarehouse, "position") === ""
                        ? "editwarehouse__wrapper-error"
                        : " "
                    }`}
                  >
                    <img
                      className="editwarehouse__wrapper-image"
                      src={Error}
                      alt="error alert"
                    />
                    <p className="editwarehouse__wrapper-text">
                      This field is required
                    </p>
                  </div>
                </div>
                <div className="editwarehouse__contact-mid">
                  <h1 className="editwarehouse__contact-number">
                    Phone Number
                  </h1>
                  <label
                    className="editwarehouse__contact-label"
                    htmlFor="phone"
                  />
                  <input
                    className={`editwarehouse__contact-number-input ${
                      get(this.state.editWarehouse, "phone") === ""
                        ? "editwarehouse__contact-number-error"
                        : " "
                    }`}
                    name="phone"
                    onChange={(e) => this.onSaveEdits(e)}
                    value={this.state.phoneInputValue}
                  />
                  <div
                    className={`editwarehouse__wrapper ${
                      get(this.state.editWarehouse, "phone") === ""
                        ? "editwarehouse__wrapper-error"
                        : " "
                    }`}
                  >
                    <img
                      className="editwarehouse__wrapper-image"
                      src={Error}
                      alt="error alert"
                    />
                    <p className="editwarehouse__wrapper-text">
                      This field is required
                    </p>
                  </div>
                </div>
                <div className="editwarehouse__contact-bottom">
                  <h1 className="editwarehouse__contact-email">Email</h1>
                  <label
                    className="editwarehouse__contact-label"
                    htmlFor="email"
                  />
                  <input
                    className={`editwarehouse__contact-email-input ${
                      get(this.state.editWarehouse, "email") === ""
                        ? "editwarehouse__contact-email-error"
                        : " "
                    }`}
                    name="email"
                    defaultValue={get(
                      this.state.editWarehouse,
                      "email"
                    )}
                    onChange={this.onSaveEdits}
                  />
                  <div
                    className={`editwarehouse__wrapper ${
                      get(this.state.editWarehouse, "email") === ""
                        ? "editwarehouse__wrapper-error"
                        : " "
                    }`}
                  >
                    <img
                      className="editwarehouse__wrapper-image"
                      src={Error}
                      alt="error alert"
                    />
                    <p className="editwarehouse__wrapper-text">
                      This field is required
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom-section">
              <div className="editwarehouse__button-section">
                <button className="editwarehouse__cancel-button">
                  {" "}
                  CANCEL{" "}
                </button>
                <input
                  type="submit"
                  value="SUBMIT"
                  className="editwarehouse__save-button"
                ></input>
              </div>
            </div>
          </form>
        </section>
      );
    }
  }
}
