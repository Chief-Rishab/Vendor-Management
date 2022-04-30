import React from "react";
import "./FeaturedData.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect } from "react";


export default function FeaturedData({currentSales, currentOrders, custs}) {


  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{currentSales/100}</span>
          <span className="featuredMoneyRate">
            +5.3% <ArrowUpwardIcon />
          </span>
        </div>
        <span className="featuredSub">Since January 2022</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Orders</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{currentOrders}</span>
          <span className="featuredMoneyRate">
            +2.3% <ArrowUpwardIcon />
          </span>
        </div>
        <span className="featuredSub">Since January 2022</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Customers</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{custs}</span>
        </div>
        <span className="featuredSub">Since January 2022</span>
      </div>
    </div>
  );
}
