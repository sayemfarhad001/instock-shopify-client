import React, { Component } from "react";
import API from "../API/API";
import axios from "axios";
import classNames from "classnames";
import "./Inventory.scss";
import "../InventoryList/InventoryList";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import close from "../../assets/icons/close-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
// import InventoryItemDetails from './InventoryItemDetails'
// import { Route, Switch} from "react-router-dom";

export default class Inventory extends Component {
  state = {
    displayModal: false,
    deleteRequest: false,
  };

  render() {
    let { id, itemName, category, status, quantity, warehouseName } =
      this.props;

    const classes = {
      modal: "inventory__modal",
      hidden: "hidden",
      display: "display",
    };

    let modalClass = classNames(classes.modal, classes.hidden);

    //Toggle modal on click function
    const toggleModal = () => {
      if (this.state.displayModal) {
        this.setState({ displayModal: false });
        return;
      }
      this.setState({ displayModal: true });
    };

    const deleteInventory = () => {
        axios
          .delete(`${API.server}/${API.inventory}/${id}`)
          .then(() => {
            this.props.reload();
          }).then(() => {
            this.setState({ displayModal: false})
          })
          .catch((e) => console.error(e));
      };
  

    //if statement to check for modal on re-render
    if (this.state.displayModal) {
      modalClass = classNames(classes.modal, classes.display);
    }

    return (
      <tr className="inventory__row" id={id}>
        <td className="inventory__name">
          <h4 className="inventory__subtitle">INVENTORY ITEM</h4>
          <div className="inventory__item">
            <Link
              className="inventory__link"
              to={`inventories/${id}`}
            >
              <p>{itemName}</p>
              <img alt="chevron" src={chevron} />
            </Link>
          </div>
        </td>
        <td className="inventory__category">
          <h4 className="inventory__subtitle">CATEGORY</h4>
          <p className="inventory__text">
            {category}
          </p>
        </td>
        <td className="inventory__status">
          <h4 className="inventory__subtitle">STATUS</h4>
          <p
            className={`inventory__status--text ${
              status === "Out of Stock" ? "outOfStock" : "inStock"
            }`}
          >
            {" "}
            {status}{" "}
          </p>
        </td>

        <td className="inventory__quantity">
          <h4 className="inventory__subtitle">QUANTITY</h4>
          <p className="inventory__text">{quantity}</p>
        </td>

        <td className="inventory__warehouse--name">
          <h4 className="inventory__subtitle">WAREHOUSE</h4>
          <p className="inventory__text">{warehouseName}</p>
        </td>
        <td className="inventory__icons">
          <img
            className="inventory__icon--left"
            src={deleteIcon}
            onClick={toggleModal}
            alt="garbage can"
          />
          <Link to={`/inventories/${this.props.id}/edit`}>
            <img
              className="inventory__icon--right"
              src={editIcon}
              alt="pencil"
            />
          </Link>
        </td>

        <div className={modalClass}>
          <div>
            <h1 className="inventory__modal--title">
              Delete {itemName} inventory item?
            </h1>
            <p className="inventory__modal--text">
              Please confirm that you'd like to delete {itemName} from the
              inventory list. You won't be able to undo this action.
            </p>
            <img
              alt="inventory icon"
              className="inventory__modal--icon"
              onClick={toggleModal}
              src={close}
            />
            <div>
              <button
                className="inventory__modal--cancel"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="inventory__modal--delete"
                onClick={deleteInventory}
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
