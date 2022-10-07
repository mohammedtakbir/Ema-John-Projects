import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDb, getStoredCart } from '../../utilities/fakedb'
import { useLoaderData } from 'react-router-dom';
const Shop = () => {
    //? declare a state for products
    //? lift up the state--> product component e state declare na kore 1 level opore uthaiya shop component e state declare korse. jate cart-container e state er value access kora jay
    const [cart, setCart] = useState([]);
    
    //? load data from public folder
    /* const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []); */
    //* using useLoaderData hook
    const products = useLoaderData(); 

    //? jekhan thika cart er data update kora hoitase, seikhan thikai data load korte hobe
    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storedCart[id]
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart); 
        //? products er opor depend kore useEffect execute hobe
        //? products er data chenge hole useEffectr execute hobe
    }, [products])

    const handleAddToCart = (selectedProduct) => {
        const exists = cart.find(product => product.id === selectedProduct.id);
        let newCart = [];
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists]
        }
        //! do not use cart.push(product)
        setCart(newCart);
        addToDb(selectedProduct.id);
    };

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        product={product}
                        key={product.id}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;