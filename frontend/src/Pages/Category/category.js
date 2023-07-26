import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "@mui/system";
import { product } from "services/AuthServices";

const Category = () => {
  const [table, settable] = useState([]);

  useEffect(() => {
    product().then((res) => {
      settable(res.data.result);
    });
    console.log("tablecategory", table);
  });

  console.log("tablecategory", table);

  return (
    <Box style={{ margin: "40px", width: "1200px" }}>
      <Container>
        <Grid container spacing={3}>
          {table.map((e, index) => {
            return (
              <Grid item key={index} xs={12} md={6} lg={4}>
                <Card sx={{ height: "200px" }}>
                  <CardContent>
                    <h4>{e.product_name}</h4>
                    <h4>Price:{e.product_price} </h4>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button variant="contained">Add Cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Category;
