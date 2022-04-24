import React from 'react'
import { getCustomerOrders } from '../hooks/requests';
import { useState, useEffect } from 'react'
import { AuthContext } from "../Context/AuthContext_consumer";
import { useContext } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OrderItem from './OrderItem';

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function createOrder(orderID, vendorID, items, orderStatus, totalAmount){

  return {

    orderID, 
    vendorID,
    items, 
    orderStatus, 
    totalAmount
  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  let orderDate = new Date()

  console.log(row.date && row.date.substring(0, 10))

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.vendor || row.vendorID}</TableCell>
        <TableCell align="left">{row.date && row.date.substring(0, 10) || "Old Order"}</TableCell>
        <TableCell align="left" sx={{ color: row.orderStatus=="In-Progress"?'orange':'green' }}><b>{row.orderStatus}</b></TableCell>
        <TableCell align="left">{row.totalAmount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <b>Order Details</b>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><b>Item Name</b></TableCell>
                    <TableCell align="center"><b>Item Description</b></TableCell>
                    <TableCell align="center"><b>Cost</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map((item) => (
                    <TableRow key={item.date}>
                      <TableCell component="th" scope="row" align="center">
                        {item.itemName}
                      </TableCell>
                      <TableCell align="center">{item.itemDescription}</TableCell>
                      <TableCell align="center">{item.itemPrice}</TableCell>
                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default function UserOrder() {

  const [orderList, setOrders] = useState([])
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);


  useEffect(async () => {
    const orders = await getCustomerOrders(user.username)
    console.log("User Orders", orders.data);
    setOrders(orders.data)
  }, []);



  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left"><b>Vendor</b></TableCell>
            <TableCell align="left"><b>Date</b></TableCell>
            <TableCell align="left"><b>Order Status</b></TableCell>
            <TableCell align="left"><b>Total Amount (₹)</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList && orderList.map((order) => (
            <Row key={order.orderID} row={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
