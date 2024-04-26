import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {toast} from 'react-toastify';
// import toast, { Toaster } from "react-hot-toast";

export default function ProductDetail({ cartItems, setCartItems }) {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
//   const [url,setUrl]=useState();
  const { id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_API_URL + "/product/" + id)
      .then((res) => res.json())
      .then((res) => setProduct(res.models));
  }, []);
  console.log(product);


  function addToCart() {
    const itemExist = cartItems.find((item) => item.product.ID == product.ID);
    if (!itemExist) {
    const newItem = { product, qty };
    setCartItems((state) => [...state, newItem]);
    toast.success("Cart Item added succesfully!")
    console.log("success");
    }
  }

  function increaseQty() {
    if (product.stock == qty) {
      return;
    }
    setQty((state) => state + 1);
  }

  function decreaseQty() {
    if (qty > 1) {
      setQty((state) => state - 1);
    }
  }

  return (
    product && (
      <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <img
              src={product.images[0].ImageUrl}
              alt="sdf"
              height="500"
              width="500"
            />
          </div>

          <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            {/* <p id="product_id">Product #{product.ID}</p> */}

            <hr />

            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.rating / 5) * 100}%` }}
              ></div>
            </div>

            <hr />

            <p id="product_price"> ₹{product.price}</p>
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decreaseQty}>
                -
              </span>

              <input
                type="number"
                className="form-control count d-inline"
                value={qty}
                readOnly
              />

              <span className="btn btn-primary plus" onClick={increaseQty}>
                +
              </span>
            </div>
            <button
              type="button"
              disabled={product.stock == 0}
              onClick={addToCart}
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
            >
              Add to Cart
            </button>

            <hr />

            <p>
              Status:{" "}
              <span
                id="stock_status"
                className={product.stock > 0 ? "text-success" : "text-danger"}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <hr />

            <h4 className="mt-2">Description:</h4>

            <p>
              {showFullDescription
                ? product.description
                : `${product.description.slice(0, 200)}...`}
              <button className="read" onClick={toggleDescription}>
                {showFullDescription ? "Read less" : "Read more"}
              </button>
            </p>
            <hr />
            <p id="product_seller mb-3">
              Sold by: <strong>{product.seller}</strong>
            </p>

            <div className="rating w-50"></div>
          </div>
        </div>
      </div>
    )
  );
}
