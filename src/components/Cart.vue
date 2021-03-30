<template>
    <div>
        <transition name="fade">
            <div
                v-if="_show"
                class="overlay fixed inset-0"
                @click="_show = false"
            ></div>
        </transition>

        <transition
            name="slide-horiz"
        >
            <div
                v-if="_show"
                class="container flex flex-col fixed top-0 bottom-0 right-0 py-6"
            >
                <div class="flex-1 scrollable px-6">
                    <div class="flex items-center">
                        <div>
                            <div @click="_show = false" class="icon">
                                <img src="/img/icons/angle-right.svg"/>
                            </div>
                        </div>
                        <div class="flex-1 text-center">
                            <small>YOUR CART</small>
                        </div>
                    </div>
                    <div>
                        <select
                                name="currency"
                                v-model="currency"
                                class="border-none select"
                        >
                            <option
                                    v-for="currency in currencies"
                                    :key="currency"
                                    :value="currency"
                            >
                                {{currency}}
                            </option>
                        </select>
                    </div>
                    <div class="grid gap-2">
                        <cart-item
                                v-for="(item, i) in _cart"
                                :product="item"
                                :key="`cart-item-${i}`"
                        />
                    </div>
                </div>

                <div class="px-6 mt-3">
                    <hr/>
                    <div class="flex items-center justify-between">
                        Subtotal
                        <div>{{subTotal | price(currency)}}</div>
                    </div>
                    <button class="bg-accent text-white p-6 mt-3" style="width: 100%">PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    import CartItem from "./CartItem";
    export default {
        name: "Cart",
        components: {CartItem},
        props: {
            show: {
                required: true
            }
        },
        computed: {
            ...mapGetters({
                currencies: "getCurrencies",
                cart: "getCart",
                products: "getProducts"
            }),
            _show: {
                get: function(){
                    return this.show
                },
                set: function(value){
                    this.$emit('update:show', value)
                }
            },
            currency: {
                get: function(){
                    return this.$store.getters.getCurrency
                },
                set: function(value){
                    this.$store.commit('setCurrency', value);
                    this.$store.dispatch('getProducts')
                }
            },
            productMap() {
                return this.products.reduce((map, product) => {
                    map[product.id] = product;
                    return map
                }, {})
            },
            _cart(){
                return this.cart.reduce((map, itemId) => {
                    if(map[itemId]){
                        map[itemId].count += 1;
                        map[itemId].totalPrice += map[itemId].price
                    }
                    else{
                        map[itemId] = {...this.productMap[itemId], count: 1};
                        map[itemId].totalPrice = map[itemId].price

                    }
                    return map
                }, {})
            },
            subTotal(){
                return Object.values(this._cart).reduce((amount, item) => {
                    amount += item.totalPrice;
                    return amount
                }, 0)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .select{
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 4px
    }
    .icon{
        height: 1.5rem;
        width: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 1px solid #e2e6e2;
        cursor: pointer;
    }
    .overlay{
        background: rgba(0, 0, 0, 0.3);
    }
    .container{
        width: 500px;
        background: #f1f3ef;

    }
    .scrollable{
        overflow-y: auto;
    }
    .slide-horiz-enter, .slide-horiz-leave-to{
        right: -500px
    }
    .slide-horiz-enter-to, .slide-horiz-leave{
        right: 0
    }

    .slide-horiz-enter-active, .slide-horiz-leave-active{
        transition: right .3s ease-in-out;
    }

    .fade-enter, .fade-leave-to{
        opacity: 0
    }
    .fade-enter-to, .fade-leave{
        opacity: 1
    }

    .fade-enter-active, .fade-leave-active{
        transition: opacity .3s ease-in-out;
    }

</style>
