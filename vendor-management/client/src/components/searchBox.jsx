import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const SearchBox = ({ value, onChange }) => {

  const [searchString, setSearchString] = useState("");
  return (
    <TextField
      sx={{ margin: 3, width: 0.5 }}
      value={searchString}
      placeholder="Search for restaurants"
      id="fullWidth"
      onChange={(e) => {
        console.log(e.target.value)
        setSearchString(e.target.value)
        onChange(e.currentTarget.value);
      }}
    />
  );
};

export default SearchBox;
