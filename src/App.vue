<template>
  <div id="app">
    <div class="bg-primary">
      <div class="container">
        <div class="px-12 pt-18 pb-12">
          <h1 class="text-5xl font-serif leading-tight">All Products</h1>
          <h4 style="line-height: 0">A 360 Look at Lumin</h4>
        </div>
      </div>
    </div>
    <div class="bg-secondary">
      <div class="container">
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-8">
          <product
            v-for="(product, i) in products"
            :key="`product-${i}`"
            :product="product"
          />
        </div>
      </div>
    </div>
    <cart
      :show.sync="showCart"
    />
  </div>
</template>

<script>

  import { mapGetters } from "vuex"
  import Product from "./components/Product";
  import Cart from "./components/Cart";
  export default {
    name: 'App',
    components: {Cart, Product},
    computed: {
      ...mapGetters({
        products: "getProducts"
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
    async beforeMount() {
      await Promise.all([
        this.$store.dispatch('getProducts'),
        this.$store.dispatch('getCurrencies')
      ])

    }
  }
</script>

<style lang="scss">
  @import "assets/scss/app";
</style>
