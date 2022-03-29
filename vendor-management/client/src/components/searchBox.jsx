import React from "react";
import TextField from "@mui/material/TextField";

const SearchBox = ({value, onChange}) => {
  return (
    <TextField
      sx={{ margin: 3, width: 0.5 }}
      value={value}
      placeholder="Search for restaurants"
      id="fullWidth"
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
