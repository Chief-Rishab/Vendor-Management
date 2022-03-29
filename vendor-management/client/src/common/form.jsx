import React, { Component } from "react";
import { getVendors } from "../services/vendorService";
import SearchBox from "../components/searchBox";
import NewVendor from "../components/newVendor";
import Box from "@mui/material/Box";
import { httpGetVendors } from "../hooks/requests";

class Form extends Component {
  state = {
    searchQuery: "",
    allVendors: [],
  };

  componentDidMount = async() => {
    const fetchedVendors = await httpGetVendors();
    this.setState({ allVendors: fetchedVendors });
  };

  handleSearch = (query) => {
    // console.log(query)
    this.setState({ searchQuery: query });
  };

  getSearchData = () => {
    const { searchQuery, allVendors: vendors } = this.state;
    let filtered = vendors;

    if (searchQuery)
      filtered = vendors.filter((v) =>
        v.outletName.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return filtered;
  };

  render() {
    const vendors = this.getSearchData()
    const searchQuery = this.state.searchQuery
    return (
      <Box sx={{ justifyContent: "center" }}>
        <SearchBox value = {searchQuery} onChange={this.handleSearch} />
        {vendors.map((vendor) => (
          <NewVendor
            key={vendor.outletName}
            name={vendor.outletName}
            location = {vendor.address}
            rating = {vendor.rating}
          />
        ))}
      </Box>
    );
  }
}

export default Form;
