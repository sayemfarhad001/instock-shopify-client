import React from "react";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import edit from "../../assets/icons/edit-24px.svg";
import "./InventoryItemDetails.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export default class InventoryItemDetails extends React.Component {
  state = {
    singleInventoryData: [],
    urlID: this.props.match.params.inventoryId,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:2000/inventories/${this.state.urlID}`)
      .then((response) => {
        this.setState({ singleInventoryData: response.data });
      });
  }

  render() {
    let { id, itemName, description, category, status, quantity, warehouse } =
      this.state.singleInventoryData;

    return (
      <div className="inventory__details" id={id}>
        <div className="inventory__details--header">
          <div className="inventory__details--name">
            <Link to={"/inventories"}>
              <img src={arrowBack} />
            </Link>
            <h4>{itemName}</h4>
          </div>
          <div className="inventory__details--edit">
            <Link to={`/inventories/${id}/edit`}>
              <img
                className="inventory__details--edit-icon"
                alt="pencil"
                src={edit}
              />
              <p className="inventory__details--edit-text">Edit</p>
            </Link>
          </div>
        </div>

        <div className="inventory__details--container">
          <div className="inventory__details--container-left">
            <div className="inventory__details--desc">
              <h4 className="inventory__details--subheader">
                ITEM DESCRIPTION:
              </h4>
              <p className="inventory__details--text">{description} </p>
            </div>

            <div className="inventory__details--category">
              <h4 className="inventory__details--subheader">CATEGORY:</h4>
              <p className="inventory__details--text">{category}</p>
            </div>
          </div>

          <div className="inventory__details--container-right">
            <div className="inventory__details--sq">
              <div className="inventory__details--status">
                <h4 className="inventory__details--subheader">STATUS:</h4>
                <p
                  className={`inventory__details--stock ${
                    status === "Out of Stock" ? "outOfStock" : "inStock"
                  }`}
                >
                  {" "}
                  {status}{" "}
                </p>
              </div>

              <div className="inventory__details--quantity">
                <h4 className="inventory__details--subheader">QUANTITY:</h4>
                <p className="inventory__details--text">{quantity}</p>
              </div>
            </div>

            <div className="inventory__details--warehouse">
              <h4 className="inventory__details--subheader">WAREHOUSE:</h4>
              <p className="inventory__details--text">{warehouse}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
