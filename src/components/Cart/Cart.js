import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const { cart, clearCart, children } = props;
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for (const product of cart) {
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
    }
    // const tax = total * 10/100;
    const tax = (total * 0.1).toFixed(2);
    const grandTotal = total + shipping + parseFloat(tax);
    return (
        <div className='cart'>
            <h4>this is order summery</h4>
            <p>Selected item: {quantity}</p>
            <p>Total price: ${total}</p>
            <p>Total Shipping: ${shipping}</p>
            <p>Total Tax: ${tax}</p>
            <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
            <div style={{marginTop: '20px'}}>
                <button onClick={clearCart} style={{ marginRight: '10px' }}>Delete Cart</button>
                {children}
            </div>
        </div>
    );
};

export default Cart;