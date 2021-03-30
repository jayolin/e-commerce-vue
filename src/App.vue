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
    <div v-if="!loading" class="bg-secondary">
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
    <div class="text-center p-6" v-else>
      <h1>Loading...</h1>
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
    data(){
      return {
        loading: false
      }
    },
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
      this.loading = true;
      await Promise.all([
        this.$store.dispatch('getProducts'),
        this.$store.dispatch('getCurrencies')
      ]);
      this.loading = false

    }
  }
</script>

<style lang="scss">
  @import "assets/scss/app";
</style>
