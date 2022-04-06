import React, { Component } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

class FoodItem extends Component {
  state = {};
  render() {
    return (
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="image" src="./../imgs/pizza.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {this.props.itemName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {this.props.itemDescription}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {this.props.isVeg === true ? "Vegetarian" : "Non-Vegetarian"}
                </Typography>
                <CardActions>
                  <Button size="small"></Button>
                </CardActions>
                <Grid item>
                  <Button size="small">Add</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                {`₹${this.props.itemPrice}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default FoodItem;
