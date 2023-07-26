import { makeStyles } from "@material-ui/core";
import React from "react";
import { Outlet } from "react-router";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Navbar from "Navbar/navbar";
import CategoryIcon from "@mui/icons-material/Category";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router";
import AddCardIcon from "@mui/icons-material/AddCard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ReorderIcon from "@mui/icons-material/Reorder";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import Footer from "Footer/footer";

const useStyles = makeStyles({
  page: {
    background: "#f9f9f9",
    width: "100%",
  },
  drawer: {
    width: 240,
  },
  drawerPaper: {
    width: 240,
  },
  root: {
    display: "flex",
  },
});

function AdminLayout() {
  const classes = useStyles();
  const navigate = useNavigate();
  const menu = [
    {
      text: "Category",
      icon: <CategoryIcon color="secondary" />,
      path: "/categorytable",
    },
    {
      text: "Product",
      icon: <SportsCricketIcon color="secondary" />,
      path: "/producttable",
    },
    {
      text: "Add Category",
      icon: <AddCardIcon color="secondary" />,
      path: "/admin/addcategory",
    },
    {
      text: "Add Product",
      icon: <AddShoppingCartIcon color="secondary" />,
      path: "/admin/addproduct",
    },
    {
      text: "Sequence",
      icon: <ReorderIcon color="secondary" />,
      path: "/sequencetable",
    },
    {
      text: "Coupon",
      icon: <LocalOfferIcon color="secondary" />,
      path: "/admin/coupon",
    },
  ];
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: `82.3%`,
          }}
        >
          <Navbar />
        </AppBar>
        <div>
          <Typography variant="h5">Admin Dashboard</Typography>
        </div>
        <br></br>
        <List>
          {menu.map((item) => (
            <>
              <ListItem
                button
                onClick={() => navigate(item.path)}
                key={item.text}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
              <hr></hr>
            </>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
