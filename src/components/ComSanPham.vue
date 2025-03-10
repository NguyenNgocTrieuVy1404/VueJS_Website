<template>
  <div class="home-container">

    <h1 class="home-title">TẤT CẢ SẢN PHẨM</h1>
    <hr class="divider" />
    <Product/>
  </div>
</template>

<script>
import Product from './ComProduct.vue'
import items from '../data/items'
export default {
    name: 'ComHome',
    components: {
      Product
    },
    data() {
      return {
        products: items
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      });
    },
}
</script>

<style scoped>
.home-container {
    text-align: center;
    padding: 125px;
    background-color: #f0f0f0;
    font-family: 'Arial', sans-serif;
}


.home-title {
    font-size: 2.5rem;
    margin-bottom: 10px;
    margin-top: 10px;
}

.divider {
    border: none;
    border-top: 2px solid #c2c0c0;
    margin: 10px auto 20px auto;
    width: 80%;
}

.home-description {
    font-size: 1.2rem;
    margin-bottom: 30px;
}

.products-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.product {
    width: 250px;
    padding: 15px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(12, 12, 12, 0.1);
    transition: transform 0.3s ease-in-out;
}

.product:hover {
    transform: scale(1.05);
}
</style>
