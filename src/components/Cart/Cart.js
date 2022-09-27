import React from 'react';

const Cart = ({cart}) => {
    return (
        <div>
            <h4>this is order summery</h4>
            <h3>Selected item: {cart.length}</h3>
        </div>
    );
};

export default Cart;