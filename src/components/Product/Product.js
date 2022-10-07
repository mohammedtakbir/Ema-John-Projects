import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css'
const Product = (props) => {
    const { img, name, price, seller, ratings } = props.product;
    //? lift the state
    const {handleAddToCart, product} = props;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <div className='info1'>
                    <p className='product-name'>{name}</p>
                    <p>price: ${price}</p>
                </div>
                <div className='info2'>
                    <p><small>Seller: {seller}</small></p>
                    <p><small>Ratings: {ratings}</small></p>
                </div>
            </div>
            <div className='btn-cart'>  
                <button onClick={() => handleAddToCart(product)}>
                <span style={{marginRight: '10px'}}>Add to cart</span>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                </button>
            </div>
        </div>
    );
};

export default Product;