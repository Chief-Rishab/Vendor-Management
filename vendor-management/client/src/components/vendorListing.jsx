import React, { Component } from "react";
import FoodItem from "./foodItem";
import { Grid } from "@mui/material";
import { HttpGetVendorByID } from "../hooks/requests";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function childVendor() {
  return <div>Hello</div>;
}

const VendorListing = () => {
  const [currentVendor, setVendor] = useState({});
  const [searchQuery, setQuery] = useState("");
  const [currentMenu, setMenu] = useState([]);
  const { id } = useParams();

  useEffect(async () => {
    const fetchedVendor = await HttpGetVendorByID(id);
    setVendor(fetchedVendor.data);
    setMenu(fetchedVendor.data.menu);
  }, []);

  const setFoodItems = (query) => {

    let filtered = currentMenu

    if(query){
      filtered = currentMenu.filter((item) => 
      item.itemName.toLowerCase().includes(query.toLowerCase()))
    }

    setMenu(filtered)
  };

  if (currentVendor.hasOwnProperty("outletName")) {
    return (
      <div>
        <nav class="navbar navbar-dark bg-danger mb-5">
          <div class="container-fluid">
            <a class="navbar-brand text-center">{currentVendor.outletName}</a>
            <form class="d-flex">
              <input
                onChange={(e) => {
                  if(e.target.value === ""){
                    setMenu(currentVendor.menu)
                  }
                  else{
                    setQuery(e.target.value)
                  }
                }}
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-primary text-white" type="button" onClick={() => {
                setFoodItems(searchQuery);
              }}>
                Search
              </button>
            </form>
          </div>
        </nav>
        <Grid
          container
          direction="column-reverse"
          justifyContent="center"
          alignItems="center"
        >
          {currentMenu.map((item) => (
            <FoodItem
              key={item.itemName}
              itemName={item.itemName}
              itemDescription={item.itemDescription}
              itemPrice={item.itemPrice}
              isVeg={item.isVeg}
            />
          ))}
        </Grid>
      </div>
    );
  } else {
    return null;
  }
};

export default VendorListing;
