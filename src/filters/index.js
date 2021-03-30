import price from "./price"
export default {
    install(Vue) {
        Vue.filter("price", price);
    }
};
