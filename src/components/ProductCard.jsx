import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Mock variants since API doesn't provide them
  const variants = ["Small", "Medium", "Large"];

  // Mock stock status based on rating count
  const inStock = product.rating.count > 50;

  const addToCart = () => {
    dispatch(addCart(product));
    toast.success("Added to cart");
  };

  return (
    <div className="card h-100">
      <div
        className="position-relative"
        style={{ height: "200px", overflow: "hidden", cursor: "pointer" }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          className="card-img-top img-fluid p-2"
          src={product.image}
          alt={product.title}
          style={{
            objectFit: "contain",
            height: "100%",
            width: "100%",
          }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h6 className="card-title mb-1 text-truncate">{product.title}</h6>
        <p className="card-text mb-2">${product.price}</p>

        {/* Variant Selector */}
        <div className="mb-2">
          <select className="form-select form-select-sm">
            {variants.map((variant, index) => (
              <option key={index}>{variant}</option>
            ))}
          </select>
        </div>

        {/* Stock Status */}
        {inStock ? (
          <button className="btn btn-dark btn-sm mt-auto" onClick={addToCart}>
            Add to Cart
          </button>
        ) : (
          <button className="btn btn-outline-secondary btn-sm mt-auto" disabled>
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
