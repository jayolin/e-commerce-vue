import Vue from "vue";
import Vuex from "vuex";
import http from "@/helpers/http"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        currencies: [],
        currency: "USD",
        cart: [],
        showCart: false
    },
    mutations: {
        setProducts (state, products) {
           state.products = products
        },
        setCurrencies (state, currencies) {
            state.currencies = currencies
        },
        setCurrency (state, currency) {
            state.currency = currency
        },
        setShowCart(state, value){
            state.showCart = value
        },
        addToCart(state, product){
            state.cart.push(product)
        },
        removeFromCart(state, product){
            let index = state.cart.indexOf(product);
            state.cart.splice(index, 1)
        }
    },
    getters: {
        getProducts: state => {
            return state.products
        },
        getShowCart: state => {
            return state.showCart
        },
        getCurrencies: state => {
            return state.currencies
        },
        getCurrency: state => {
            return state.currency
        },
        getCart: state => {
            return state.cart
        }
    },
    actions: {
       async getProducts({state, commit}){
            try{
                const response = await http.post(`
                    products{
                        id,
                        title,
                        image_url,
                        price(currency:${state.currency})
                    }
                `);
                const { data } = await response.json();
                commit('setProducts', data.products);
                return data.products


            }
            catch (e) {
                console.log(e)
            }
        },
        async getCurrencies({commit}){
            try{
                const response = await http.post(`
                    currency
                `);
                const { data } = await response.json();
                commit('setCurrencies', data.currency);
                return data.currency

            }
            catch (e) {
                console.log(e)
            }
        }
    }
});
