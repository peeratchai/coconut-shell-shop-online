export const addProduct = (Num_of_Products) => ({
    type: 'ADD_PRODUCT',
    Num_of_Products: Num_of_Products
})

export const addProductToCart = (Cart) => ({
    type: 'ADD_PRODUCT_TO_CART',
    Cart: Cart
})

export const addTotal = (Total) => ({
    type: 'ADD_TOTAL',
    Total: Total
})