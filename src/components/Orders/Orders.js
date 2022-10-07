import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Orders = () => {
    const {products, initialCart} = useLoaderData();
    console.log(products, initialCart)
    return (
        <div>
            <h1>total products: {products?.length}</h1>
        </div>
    );
};

export default Orders;