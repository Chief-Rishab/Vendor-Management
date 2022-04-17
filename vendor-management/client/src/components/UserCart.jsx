import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext_consumer";
import { useContext } from "react";
import { HttpGetUserByUsername, deleteItemFromCart } from "./../hooks/requests";
import { useState, useEffect } from "react";

function generate(items, element, user, setCart) {
  return items['items'].map((value) =>
    React.cloneElement(element, {
      key: value.itemID,
      itemname: value.itemName,
      itemprice: value.itemPrice,
      itemID: value.itemID,
      user: user,
      setCart: setCart
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const CartItem = ({itemname, itemprice, user, itemID, setCart}) => {
  return (

  <ListItem
    secondaryAction={
      <IconButton edge="end" aria-label="delete" onClick={async() => {
        const response = await deleteItemFromCart(user.username, itemID)
        console.log("Hello", response.data['cart'])
        setCart( response.data['cart'])
      }}>
        <DeleteIcon />
      </IconButton>
    }
  >
    <ListItemAvatar>
      <Avatar>
        <FolderIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={itemname} secondary={`₹${itemprice}`} />
  </ListItem>
  )
};

const UserCart = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [hasLoaded, setLoaded] = useState(false);
  const [currentCart, setCart] = useState([]);

  useEffect(async () => {
    const fetchedUser = await HttpGetUserByUsername(user.username);
    setCurrentUser(fetchedUser.data);
    setCart(fetchedUser["cart"]);
    setLoaded(true);
  }, []);

  return !hasLoaded ? (
    <div>Loading</div>
  ) : (
    <div>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2, ml: 3 }} variant="h6" component="div">
          Your Cart
        </Typography>
        <Demo>
          <List dense={false}>
            {generate(
              currentCart,
              <CartItem/>,
              user,
              setCart
            )}
          </List>
        </Demo>
      </Grid>
    </div>
  );
};

export default UserCart;
