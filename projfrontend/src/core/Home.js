import React, { useState, useEffect } from "react";

import { getProducts } from "./helper/coreapicalls";
import Card from "./Card";
import "../styles.css";
import Base from "./Base";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          setProducts(data);
        }
      });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to T-shirt Store">
      <div className="row">
        {products.map((product, index) => {
          return (
            <div key={index} className="col-sm-6 col-md-4 co-12 mb-4" sm>
              <Card product={product}/>
            </div>
          );
        })}
      </div>
    </Base>
  );
};