import React from 'react'
import { getCustomerOrders } from '../hooks/requests';
import { useState, useEffect } from 'react'
import { AuthContext } from "../Context/AuthContext_consumer";
import { useContext } from "react";

export default function UserOrder() {

  const [orderList, setOrders] = useState([])
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);


  useEffect(async () => {
    const orders = await getCustomerOrders(user.username)
    console.log(orders);
    // setOrders(orders)
  }, []);

  return (
    <div>UserOrder</div>
  )
}
