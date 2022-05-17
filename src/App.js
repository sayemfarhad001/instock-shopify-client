import "./App.scss";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import InventoryList from "./components/InventoryList/InventoryList";
import InventoryItemDetails from "./components/InventoryItemDetails/InventoryItemDetails";
import AddNewWarehousePage from "./pages/AddNewWarehousePage/AddNewWarehousePage";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import EditItemPage from "./pages/EditItemPage/EditItemPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/warehouses" component={HomePage} />
            <Route exact path="/inventories" component={InventoryList} />
            <Route exact path="/inventories/add" component={AddItemPage} />
            <Route
              exact
              path="/inventories/:inventoryId"
              component={InventoryItemDetails}
            />
            <Route
              exact
              path="/inventories/:inventoryId/edit"
              component={EditItemPage}
            />
            <Route
              path="/warehouses/:warehouseId/edit"
              render={(props) => <EditWarehouse match={props.match} />}
            />
            <Route path="/warehouses/add" component={AddNewWarehousePage} />
            <Route
              path="/warehouses/:id"
              render={(props) => <WarehouseDetails match={props.match} />}
            />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
