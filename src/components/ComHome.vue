<template>
  <div class="home-container"> 
    <h1 class="welcome-title">TRIỀU VỸ SANDAL STORE </h1> 
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
    }
}
</script>

<style scoped>
.home-container {
    text-align: center;
    padding: 125px;
    background-color: #efeff1;
    font-family: 'Arial', sans-serif;
}
 
.welcome-title {
    font-size: 2.5rem; 
    margin-bottom: 10px;
    margin-top: -40px;
    color: #ff3333;  /* Đổi thành màu đỏ bóng nhẹ */
    font-weight: bold;  
    text-shadow: 2px 2px 4px rgba(255, 0, 0, 0.2);  
}

.h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    margin-top: 10px;
}

.divider {
    border: none;
    border-top: 2px solid #ddd;
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
}

.product:hover {
    transform: scale(1.05);
}
</style>
