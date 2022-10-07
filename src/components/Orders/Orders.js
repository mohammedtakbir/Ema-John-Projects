import React from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Orders = () => {
    const { initialCart } = useLoaderData();
    const [cart, setCart] = useState(initialCart);
    const handleRemoveItem = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    };
    //* clear cart
    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <div>
            <div className="shop-container">
                <div className="orders-container">
                    {
                        cart.map(product => <ReviewItem
                            key={product.id}
                            product={product}
                            handleRemoveItem={handleRemoveItem}
                        />)
                    }
                    {
                        cart.length === 0 && <h1>No items. <Link to='/shop'>Shop here</Link></h1>
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart} clearCart={clearCart}/>
                </div>
            </div>
        </div>
    );
};

export default Orders;