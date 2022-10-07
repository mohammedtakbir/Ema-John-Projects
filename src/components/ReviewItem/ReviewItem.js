import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ReviewItem.css'
const ReviewItem = ({ product, handleRemoveItem }) => {
    const { name, price, quantity, img, shipping, id } = product;
    return (
        <div className='review-item'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className="review-details-container">
                <div className="review-details">
                    <h3>{name}</h3>
                    <p>Price: ${price}</p>
                    <p>Shipping: ${shipping}</p>
                    <p>quantity: {quantity}</p>
                </div>
                <div className="delete-container">
                    <button onClick={() => handleRemoveItem(id)} className='btn-delete'>
                        <FontAwesomeIcon className='delete-icon' icon={faTrashAlt}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;