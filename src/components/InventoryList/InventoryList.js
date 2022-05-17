import React from "react";
import axios from "axios";
import API from "../API/API";
import "./InventoryList.scss";
import Inventory from "../Inventory/Inventory";
import sort from "../../assets/icons/sort-24px.svg";
import search from "../../assets/icons/search-24px.svg";
import { Link } from "react-router-dom";

class InventoryList extends React.Component {
  state = {
    inventoryData: [],
  };

  componentDidMount() {
    axios.get(`${API.server}/${API.inventory}`).then((response) => {
      this.setState({ inventoryData: response.data });
    });
  }

  render() {

    const reload = () => {
      axios
      .get(`${API.server}/${API.inventory}`)
      .then((results) =>
        this.setState({ inventoryData: results.data, isLoaded: true })
      )
      .catch((e) => console.error(e));
    }

    return (
      <section className="inventory">
        <div className="inventory__subheader">
          <h1 className="inventory__title">Inventory</h1>
          <div>
            <div className="inventory__search">
              <input
                className="inventory__search-input"
                type="text"
                placeholder="Search..."
              ></input>
              <img
                className="inventory__search-icon"
                src={search}
                alt="magnifying glass"
              />
            </div>
            <Link to={`/inventories/add`}>
              <div className="inventory__button">
                <p>+ Add New Item</p>
              </div>
            </Link>
          </div>
        </div>
        <table className="inventory__table">
          <tbody>
            <tr className="inventory__table--header">
              <th className="inventory__table">
                INVENTORY ITEM
                <img src={sort} alt="up and down arrow" />
              </th>

              <th className="inventory__table">
                CATEGORY
                <img src={sort} alt="up and down arrow" />
              </th>

              <th className="inventory__table">
                STATUS
                <img src={sort} alt="up and down arrow" />
              </th>

              <th className="inventory__table">
                QTY
                <img src={sort} alt="up and down arrow" />
              </th>

              <th className="inventory__table">
                WAREHOUSE
                <img src={sort} alt="up and down arrow" />
              </th>

              <th className="inventory__table">
                ACTIONS
              </th>
            </tr>

            {this.state.inventoryData.map((elem) => {
              return (
                <Inventory
                  key={elem.id}
                  id={elem.id}
                  itemName={elem.itemName}
                  warehouseName={elem.warehouseName}
                  description={elem.description}
                  category={elem.category}
                  quantity={elem.quantity}
                  status={elem.status}
                  reload={reload}
                />
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }
}

export default InventoryList;
