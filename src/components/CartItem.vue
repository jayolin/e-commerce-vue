<template>
    <div class="p-6 bg-white">
        <div>{{product.title}}</div>
        <div class="flex justify-end p-6">
            <img height="50" :src="product.image_url"/>
        </div>
        <div class="flex items-center">
            <div class="increment-button items-center">
                <button @click="removeFromCart">-</button>
                <div class="flex-1 text-center">{{product.count}}</div>
                <button @click="addToCart">+</button>
            </div>
            <div style="margin-left: 50px">
                {{product.totalPrice | price(currency)}}
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    export default {
        name: "CartItem",
        computed: {
            ...mapGetters({
                currency: 'getCurrency'
            }),
        },
        props: {
            product: {
                required: true
            }
        },
        methods: {
            addToCart(){
                this.$store.commit('addToCart', this.product.id)
            },
            removeFromCart(){
                this.$store.commit('removeFromCart', this.product.id)
            }
        }
    }
</script>

<style scoped>
    .increment-button{
        display: flex;
        width: 100px;
        border: 2px solid #c8c8c8;
        padding: 10px 5px;
    }
    .increment-button button{
        background: transparent;
        font-size: 16px;
    }
</style>
