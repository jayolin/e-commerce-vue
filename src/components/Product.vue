<template>
    <div
        class="text-center grid-item relative"
    >
        <div class="absolute inset-0 flex flex-col p-18">
            <div class="flex-1 flex items-center justify-center">
                <img style="max-width: 100%; max-height: 150px; object-fit: contain" :src="product.image_url"/>
            </div>

            <div style="margin-top: 20px">
                <div class="font-serif">{{product.title}}</div>
                <div>{{product.price | price(currency)}}</div>
                <button @click="addToCart()" class="bg-accent text-white px-6 py-2 mt-3">
                    Add to Cart
                </button>
            </div>
        </div>



    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    export default {
        name: "Product",
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        computed: {
            ...mapGetters({
                currency: 'getCurrency'
            }),
            showCart: {
                get: function(){
                    return this.$store.getters.getShowCart
                },
                set: function(value){
                    this.$store.commit('setShowCart', value)
                }
            }
        },
        methods: {
            addToCart(){
                this.showCart = true;
                this.$store.commit('addToCart', this.product.id)
            }
        }
    }
</script>

<style scoped>

</style>
