import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../API/API";
import Warehouse from "../Warehouse/Warehouse";
import search from "../../assets/icons/search-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import "./WarehouseList.scss";

export default class WarehouseList extends React.Component {
  state = {
    isLoaded: false,
    warehouseData: "",
  };

  componentDidMount() {
    axios
      .get(`${API.server}/${API.warehouses}`)
      .then((results) =>
        this.setState({ warehouseData: results.data, isLoaded: true })
      )
      .catch((e) => console.error(e));
  }

  render() {

    const reload = () => {
      axios
      .get(`${API.server}/${API.warehouses}`)
      .then((results) =>
        this.setState({ warehouseData: results.data, isLoaded: true })
      )
      .catch((e) => console.error(e));
    }


    if (this.state.isLoaded) {
      return (
        <section className="section__warehouses">
          <div className="section__warehouses--subheader">
            <h1 className="section__warehouses--title">Warehouses</h1>
            <div>
              <div className="section__warehouses--search">
                <input
                  className="section__warehouses--search-input"
                  type="text"
                  placeholder="Search..."
                ></input>
                <img
                  className="section__warehouses--search-icon"
                  src={search}
                  alt="magnifying glass"
                />
              </div>
              <Link to={"/warehouses/add"}>
                <div className="section__warehouses--add">
                  <p>+ Add New Warehouse</p>
                </div>
              </Link>
            </div>
          </div>
          <table className="section__warehouses--table">
            <tbody>
              <tr className="section__warehouses--table-header">
                <th>
                  WAREHOUSE
                  <img src={sort} alt="up and down arrow" />
                </th>
                <th>
                  ADDRESS
                  <img src={sort} alt="up and down arrow" />
                </th>
                <th>
                  CONTACT NAME
                  <img src={sort} alt="up and down arrow" />
                </th>
                <th>
                  CONTACT INFORMATION
                  <img src={sort} alt="up and down arrow" />
                </th>
                <th>
                  ACTIONS
                </th>
              </tr>
              {this.state.warehouseData.map((elem) => {
                return (
                  <Warehouse
                    key={elem.id}
                    id={elem.id}
                    name={elem.name}
                    address={elem.address}
                    city={elem.city}
                    country={elem.country}
                    contactName={elem.contact.name}
                    contactPosition={elem.contact.position}
                    contactPhone={elem.contact.phone}
                    contactEmail={elem.contact.email}
                    reload={reload}
                  />
                );
              })}
            </tbody>
          </table>
        </section>
      );
    }
    return (
      <div>
        <h1 className="section__loading">Loading...</h1>
      </div>
    );
  }
}
