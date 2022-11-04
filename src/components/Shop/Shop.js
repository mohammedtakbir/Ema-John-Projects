import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb'
import { Link, useLoaderData } from 'react-router-dom';



/* 
* count: done
* perPage(size): 10
* pages: count / perPage
* currentPage: (page)
*/

const Shop = () => {
    //? declare a state for products
    //? lift up the state--> product component e state declare na kore 1 level opore uthaiya shop component e state declare korse. jate cart-container e state er value access kora jay
    const [cart, setCart] = useState([]);
    //* clear cart
    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    //? load data from public folder
    /* const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []); */
    //* using useLoaderData hook
    // const { products, count } = useLoaderData();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const perPage = 10;
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        const url = `http://localhost:5000/products?page=${page}&size=${size}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                setCount(data.count)
            })
    }, [page, size])

    const pages = Math.ceil(count / size);

    //? jekhan thika cart er data update kora hoitase, seikhan thikai data load korte hobe
    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        const ids = Object.keys(storedCart)

        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storedCart[id]
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
                setCart(savedCart);
            })

        //? products er opor depend kore useEffect execute hobe
        //? products er data chenge hole useEffectr execute hobe
    }, [products])

    const handleAddToCart = (selectedProduct) => {
        const exists = cart.find(product => product._id === selectedProduct._id);
        let newCart = [];
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        } else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists]
        }
        //! do not use cart.push(product)
        setCart(newCart);
        addToDb(selectedProduct._id);
    };

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        product={product}
                        key={product._id}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to='/orders'>
                        <button>Review Order</button>
                    </Link>
                </Cart>
            </div>
            <div className="pagination">
                <p style={{ marginBottom: '10px' }}>Currently selected page: {page} & size {size}</p>
                {
                    [...Array(pages).keys()].map(number => (
                        <button
                            className={page === number && 'selected'}
                            key={number}
                            onClick={() => setPage(number)}>{number + 1}</button>
                    ))
                }
                <select onChange={(e) => setSize(e.target.value)} style={{ padding: '5px 10px' }}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;