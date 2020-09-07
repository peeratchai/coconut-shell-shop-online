import { products_list } from '../../../contents/Contents'

let initial_state = {
    Num_of_Products: 0,
    Cart: products_list
}

const cart = (state = initial_state, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return (
                {
                    ...initial_state,
                    Num_of_Products: action.Num_of_Products,
                });
        case 'ADD_PRODUCT_TO_CART':
            return (
                {
                    ...initial_state,
                    Cart: action.Cart,
                });
        default:
            return state
    }
}

export default cart