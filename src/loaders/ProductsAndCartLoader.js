import { getStoredCart } from "../utilities/fakedb"

export const ProductsAndCartLoader = async () => {
    //* get Products
    const productData = await fetch('http://localhost:5000/products')
    const { products } = await productData.json()

    //* get Cart
    const savedCart = getStoredCart();
    let initialCart = [];
    for (const id in savedCart) {
        const addedProduct = products.find(product => product._id === id);
        if (addedProduct) {
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }
    }

    //* object shorthand
    return { products: products, initialCart: initialCart };
}