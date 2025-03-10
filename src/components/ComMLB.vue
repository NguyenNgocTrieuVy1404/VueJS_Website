<template>
  <div class="custom-menu">
    <h1 class="title">MLB</h1>
    <div class="filter-container">
      <label for="sort">Sắp xếp theo giá:</label>
      <select id="sort" v-model="sortOrder">
        <option value="asc">Tăng dần</option>
        <option value="desc">Giảm dần</option>
      </select>
    </div>
   
    <div class="menu-carousel">
      <div
        class="menu-item"
        v-for="product in sortedXiaomiProducts"
        :key="product.id">
        <router-link
          :to="{ name: 'ProductDetail', params: { id: product.id } }">
          <img :src="product.image" :alt="product.name" />
          <div class="menu-item-info">
            <h3>{{ product.name }}</h3>
            <p class="price">{{ formatPrice(product.price) }} VND</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import items from "@/data/items";

export default {
  data() {
    return {
      products: items,
      sortOrder: "asc", // Biến để lưu thứ tự sắp xếp
    };
  },
  computed: {
    xiaomiProducts() {
      return this.products.filter((product) => product.name.toLowerCase().includes('mlb'));
    },
    sortedXiaomiProducts() {
      return [...this.xiaomiProducts].sort((a, b) => {
        if (this.sortOrder === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    },
  },
  methods: {
    formatPrice(price) {
      if (price === undefined || price === null) {
        return "0"; 
      }
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    });
  },
};
</script>
<style>
.custom-menu {
  text-align: center;
  padding: 20px;
  background-color: #fff;
}

.custom-menu .title {
  font-size: 48px; /* Increase font size */
  font-weight: bold; /* Make the text bold */
  color: #fff; /* Change text color */
  background-color: #333; /* Add background color */
  padding: 20px 40px; /* Add padding */
  margin-top: 100px; /* Add margin */
  border-radius: 10px; /* Add border radius */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Add shadow */
}

.custom-menu .menu-title {
  font-size: 36px; /* Increase font size */
  font-weight: bold; /* Make the text bold */
  color: #333; /* Change text color */
  background-color: #fcb034; /* Add background color */
  padding: 10px 20px; /* Add padding */
  margin-top: 10px; /* Add margin */
  border-radius: 8px; /* Add border radius */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow */
}

.custom-menu .filter-container {
  margin-bottom: 20px;
}

.custom-menu .filter-container label {
  margin-right: 10px;
  font-size: 18px;
}

.custom-menu .filter-container select {
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.custom-menu .menu-carousel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 25px;
}

.custom-menu .menu-item {
  flex: 0 1 calc(25% - 15px);
  margin-bottom: 20px;
  box-sizing: border-box;
  background-color: #fdfcfc;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-menu .menu-item-info {
  background: linear-gradient(to right, #f3f3f3, #fdfffe); /* Gradient xanh đậm */
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
}

.custom-menu .menu-item-info h3 {
  color: white;
  font-size: 16px;
  margin: 0 0 5px;
  text-decoration: none;
  background-color: #4c68af;
  padding: 8px;
  border-radius: 5px;
}

.custom-menu .menu-item-info p.price {
  color: #ff0000;
  font-size: 20px;
  font-weight: bold;
  margin: 5px 0;
  text-decoration: underline;
}

.custom-menu .menu-item a {
  text-decoration: none;
}

 
 
</style>
