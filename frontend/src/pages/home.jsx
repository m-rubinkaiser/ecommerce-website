import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function Home(){
  const [products,serProducts]=useState([]);
  const [searchParams,setSearchParams]=useSearchParams()
  useEffect(()=>{
    fetch(import.meta.env.VITE_APP_API_URL+'/products?'+searchParams)
    .then(response =>response.json())
    .then(response =>serProducts(response.models))
  },[searchParams])
  {console.log(products)}
  return (
    <Fragment>
        <h1 id="products_heading">Latest Products</h1>

        <section id="products" className="container mt-5">
        <div className="row">
            {products.map(product =><ProductCard product={product}/>)} 
        </div>
        </section>
    </Fragment>
  )
}