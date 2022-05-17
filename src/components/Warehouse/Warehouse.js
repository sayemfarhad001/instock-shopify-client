import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../API/API";
import classNames from "classnames";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import close from "../../assets/icons/close-24px.svg";
import "./Warehouse.scss";

export default class Warehouses extends React.Component {
  state = {
    displayModal: false
  }

  render() {
    const classes = {
      modal: "section__warehouses--modal",
      hidden: "hidden",
      display: "display",
    };

    let modalClass = classNames(classes.modal, classes.hidden); 

    let {
      id,
      name,
      contactName,
      address,
      city,
      country,
      contactEmail,
      contactPhone,
      request
    } = this.props;

    //if statement to check for modal on re-render
    if (this.state.displayModal) {
      modalClass = classNames(classes.modal, classes.display);
    }

    //Toggle modal on click function
    const toggleModal = () => {
      if (this.state.displayModal) {
        this.setState({ displayModal: false });
        return;
      }
      this.setState({ displayModal: true });
    };

    const deleteWarehouse = () => {
      axios
        .delete(`${API.server}/${API.warehouses}/${id}`)
        .then(() => {
          this.props.reload();
        }).then(() => {
          this.setState({ displayModal: false})
        })
        .catch((e) => console.error(e));
    };

    return (
      <tr className="section__warehouses--row" id={id}>
        <td className="section__warehouses--name">
          <h4 className="section__warehouses--subtitle">WAREHOUSE</h4>
          <div className="section__warehouses--location">
            <Link
              className="section__warehouses--link"
              to={`warehouses/${id}`}
            >
              <p>{name}</p>
              <img alt="chevron" src={chevron} />
            </Link>
          </div>
        </td>
        <td className="section__warehouses--address">
          <h4 className="section__warehouses--subtitle">ADDRESS</h4>
          <p className="section__warehouses--text">
            {address}, {city}, {country}
          </p>
        </td>
        <td className="section__warehouses--contact-name">
          <h4 className="section__warehouses--subtitle">CONTACT NAME</h4>
          <p className="section__warehouses--text">{contactName}</p>
        </td>
        <td className="section__warehouses--contact-info">
          <h4 className="section__warehouses--subtitle">CONTACT INFORMATION</h4>
          <p className="section__warehouses--text">{contactPhone}</p>
          <p className="section__warehouses--text">{contactEmail}</p>
        </td>
        <td className="section__warehouses--icons">
          <img
            className="section__warehouses--icon-left"
            src={deleteIcon}
            onClick={toggleModal}
            alt="garbage can"
          />
          <Link to={`/warehouses/${id}/edit`}>
            <img
              className="section__warehouses--icon-right"
              src={editIcon}
              alt="pencil"
            />
          </Link>
        </td>
        <div className={modalClass}>
          <div>
            <h1 className="section__warehouses--title">
              Delete {name} warehouse?
            </h1>
            <p className="section__warehouses--text">
              Please confirm that you'd like to delete the {name} from the list
              of warehouses. You won't be able to undo this action.
            </p>
            <img
              alt="warehouse_icon"
              className="section__warehouses--modal--icon"
              onClick={toggleModal}
              src={close}
            />
            <div>
              <button
                className="section__warehouses--modal--cancel"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="section__warehouses--modal--delete"
                onClick={deleteWarehouse}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </tr>
    );
  }
}
