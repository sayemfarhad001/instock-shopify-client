import React from "react";
import classNames from "classnames";
import API from "../API/API";
import "./WarehouseDetails.scss";
import { Link } from "react-router-dom";
import Arrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import Delete from "../../assets/icons/delete_outline-24px.svg";
import Edit from "../../assets/icons/edit-24px.svg";
import Sort from "../../assets/icons/sort-24px.svg";
import close from "../../assets/icons/close-24px.svg";
import SideArrow from "../../assets/icons/chevron_right-24px.svg";

export default class WarehouseDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryDetails: [],
      warehouseDetails: [],
      allWarehouseData: [],
      warehouseContactName: "",
      warehouseContactPhone: "",
      warehouseContactEmail: "",
      warehouseContactPosition: "",
      warehouseAddress: "",
      warehouseCity: "",
      warehouseCountry: "",
      warehouseName: "",
      inventoryItemName: "",
      category: "",
      status: "",
      quantity: "",
      instock: "",
      outofstock: "",
      warehouseID: "",
      displayModal: false,
      deleteRequest: false,
      id: "",
      itemName: ""
    };
  }

  fetchDetails = () => {
    let warehouseID = this.props.match.params.id;
    axios
      .get("http://localhost:2000/warehouses/" + warehouseID)
      .then((response) => {
        this.setState({
          warehouseContactName: response.data.name,
          warehouseContactPhone: response.data.phone,
          warehouseContactEmail: response.data.email,
          warehouseContactPosition: response.data.position,
          warehouseAddress: response.data.address,
          warehouseCity: response.data.city,
          warehouseCountry: response.data.country,
          warehouseName: response.data.warehouse,
          allWarehouseData: response.data,
          warehouseId: response.data.id,
        });
      });
    axios
      .get("http://localhost:2000/warehouses/" + warehouseID + "/inventory")
      .then((response) => {
        this.setState({
          inventoryDetails: response.data.selectedWarehouse,
          warehouseID: response.data.selectedWarehouse.id,
        });
      });
  };

  componentDidMount() {
    this.fetchDetails();
  }

  render() {
    const classes = {
      modal: "inventory__modal",
      hidden: "hidden",
      display: "display",
    };

    let modalClass = classNames(classes.modal, classes.hidden);

    //Toggle modal on click function
    const toggleModal = (id, itemName) => {
      if (this.state.displayModal) {
        this.setState({ displayModal: false });
        return;
      }
      this.setState({ displayModal: true, id: id, itemName: itemName });
    };

    //if statement to check for modal on re-render
    if (this.state.displayModal) {
      modalClass = classNames(classes.modal, classes.display);
    }

    const deleteInventory = (id) => {
      axios
        .delete(`${API.server}/${API.inventory}/${id}`)
        .then(() => {
          axios
            .get(
              `${API.server}/${API.warehouses}/${this.state.warehouseId}/inventory`
            )
            .then((results) =>
              this.setState({
                inventoryDetails: results.data.selectedWarehouse
              })
            )
            .catch((e) => console.error(e));
        })
        .then(() => {
          this.setState({ displayModal: false });
        })
        .catch((e) => console.error(e));
    }

    const DisplayData = this.state.inventoryDetails.map((info) => {
      return (
        <table>
          <tbody>
            <tr className="mobile-rows">
              <div className="tablet-div">
                <div className="spec-div">
                  <Link to={`/inventories/${info.id}`}>
                    <td className="inventory-items">
                      {info.itemName}
                      <img src={SideArrow} alt="chevron" />
                    </td>
                  </Link>
                </div>
                <div className="spec-div">
                  <td className="inventoryCategory">{info.category}</td>
                </div>

                <div className="spec-div">
                  <td className="inventoryStatus">
                    <button
                      className={`inventoryStatus${
                        info.status === "Out of Stock"
                          ? "outOfStock"
                          : "inStock"
                      }`}
                    >
                      {" "}
                      {info.status}{" "}
                    </button>
                  </td>
                </div>

                <div className="spec-div">
                  <td className="inventoryQuantity">{info.quantity}</td>
                </div>

                <div className="spec-div">
                  <div className="spec-div__buttons">
                    <img
                      onClick={() => toggleModal(info.id, info.itemName)}
                      src={Delete}
                      alt="delete"
                      className="delete"
                    ></img>
                    <Link to={`/inventories/${info.id}/edit`}>
                      <img src={Edit} alt="edit" className="'edit"></img>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mobile-div">
                <div className="spec-div">
                  <th className="table-header">INVENTORY ITEM</th>
                  <Link to={`/inventories/${info.id}`}>
                    <td className="inventory-items">
                      {info.itemName}
                      <img src={SideArrow} alt="chevron" />
                    </td>
                  </Link>
                </div>

                <div className="spec-div">
                  <th className="table-header">STATUS</th>
                  <td className="inventoryStatus">
                    <button
                      className={`inventoryStatus${
                        info.status === "Out of Stock"
                          ? "outOfStock"
                          : "inStock"
                      }`}
                    >
                      {" "}
                      {info.status}{" "}
                    </button>
                  </td>
                </div>
              </div>

              <div className="mobile-div">
                <div className="spec-div">
                  <th className="table-header">CATEGORY</th>
                  <td className="inventoryCategory">{info.category}</td>
                </div>

                <div className="spec-div">
                  <th className="table-header">QTY</th>
                  <td className="inventoryQuantity">{info.quantity}</td>
                </div>
              </div>

              <div className="mobile-div">
                <div className="buttons">
                  <img
                    onClick={() => toggleModal(info.id, info.itemName)}
                    src={Delete}
                    alt="delete"
                    className="delete"
                  ></img>
                  <Link to={`/inventories/${info.id}/edit`}>
                    <img src={Edit} alt="edit" className="edit"></img>
                  </Link>
                </div>
              </div>

            </tr>
          </tbody>
        </table>
      );
    });

    return (
      <section className="warehouse-details">
        <div className="details-table__header">
          <h1 className="table-header__first">
            <Link to={"/warehouses"}>
              <img src={Arrow} alt="back-arrow" />
            </Link>
            <p className="warehouse-name">{this.state.warehouseName}</p>
          </h1>

          <button className="edit-button">
            <Link to={`/warehouses/${this.state.warehouseId}/edit`}>
              <img src={Edit} alt="edit" className="click-edit" />
            </Link>
          </button>
        </div>
        <hr />

        <div className="contact-info__header">
          <div className="warehouse-info">
            <p className="warehouse-label">WAREHOUSE ADDRESS:</p>
            <p className="display-mobile">
              {this.state.warehouseAddress} {this.state.warehouseCity},{" "}
              {this.state.warehouseCountry}
            </p>
            <p className="display-tablet">{this.state.warehouseAddress} </p>
            <p className="display-tablet">
              {this.state.warehouseCity}, {this.state.warehouseCountry}
            </p>
          </div>
          <hr className="display-overmobile" />
          <div className="contact-info">
            <div className="contact-person">
              <p className="contact-label">CONTACT NAME:</p>
              <p className="contact-information">
                {this.state.warehouseContactName}
              </p>
              <p className="contact-information">
                {this.state.warehouseContactPosition}
              </p>
            </div>
            <div className="contact-information-block">
              <p className="contact-label">CONTACT INFORMATION</p>
              <p className="contact-information">
                {this.state.warehouseContactPhone}
              </p>
              <p className="contact-information">
                {this.state.warehouseContactEmail}
              </p>
            </div>
          </div>
          <hr className="display-undermobile" />
        </div>
        <section className="table">
          <thead>
            <th className="table-header">
              INVENTORY ITEM
              <img src={Sort} alt="sort" className="display-tablet" />
            </th>
            <th className="table-header">
              CATEGORY
              <img src={Sort} alt="sort" className="display-tablet" />
            </th>
            <th className="table-header">
              STATUS
              <img src={Sort} alt="sort" className="display-tablet" />
            </th>
            <th className="table-header">
              QTY
              <img src={Sort} alt="sort" className="display-tablet" />
            </th>
            <th className="table-header">ACTIONS</th>
          </thead>
          {DisplayData}
          <div className={modalClass}>
                <div>
                  <h1 className="inventory__modal--title">
                    Delete {this.state.itemName} inventory item?
                  </h1>
                  <p className="inventory__modal--text">
                    Please confirm that you'd like to delete {this.state.itemName}{" "}
                    from the inventory list. You won't be able to undo this
                    action.
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
                      onClick={() => deleteInventory(this.state.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
        </section>
      </section>
    );
  }
}
