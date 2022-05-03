import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import Button from "@mui/material/Button";
import "./EditItem.css";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {editMenuItem} from '../hooks/requests'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function EditItem({ foodItem }) {
  const [type, setType] = useState(true);
  const [itemName, setName] = useState("");
  const [itemPrice, setPrice] = useState("");
  const [itemDescription, setDescription] = useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleName = (event) => {

    setName(event.target.value)
  }

  const handleDesc= (event) => {

    setDescription(event.target.value)
  }

  const handlePrice = (event) => {

    setPrice(event.target.value)
  }

  const submitForm = async() => {

    const item = {
        itemName,
        itemPrice,
        itemDescription,
        isVeg: type
    }

    const response = await editMenuItem(item, "");

  };

  return (
    <div>
      <Stack spacing={2}>
        <div className="editItem">
          <TextField
            label="Item Name"
            className="editField"
            id="outlined-helperText"
            defaultValue="Item Name"
            onChange={handleName}
          />
          <TextField
          label = "Item Description"
            className="editField"
            id="outlined-helperText"
            defaultValue="Item Description"
            onChange={handleDesc}
          />
          <TextField
          label = "Item Price"
            className="editField"
            id="outlined-helperText"
            defaultValue="Item Price"
            onChange={handlePrice}
          />
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value={true}>Veg</MenuItem>
            <MenuItem value={false}>Non-Veg</MenuItem>
          </Select>
        </div>
      </Stack>
      <div className="buttons">
        <Button variant="contained" className="newButton" onClick={submitForm}>
          Save
        </Button>
      </div>
    </div>
  );
}
