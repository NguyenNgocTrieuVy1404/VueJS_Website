<template>
  <div class="custom-menu">
    <h2 class="title">Gucci</h2>
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
        v-for="product in sortedProducts"
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
    filteredProducts() {
      return this.products.filter((product) => product.name.toLowerCase().includes('gucci'));
    },
    sortedProducts() {
      return [...this.filteredProducts].sort((a, b) => {
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
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
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
  gap: 25px;
  padding: 20px;
}

.custom-menu .menu-item {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.custom-menu .menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.custom-menu .menu-item img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  padding: 15px;
  background: #fff;
  transition: transform 0.3s ease;
}

.custom-menu .menu-item:hover img {
  transform: scale(1.05);
}

.custom-menu .menu-item-info {
  padding: 15px;
  background: linear-gradient(145deg, #f8f9fa, #fff);
  border-top: 1px solid #eee;
}

.custom-menu .menu-item-info h3 {
  color: white;
  font-size: 16px;
  padding: 10px;
  margin: 0 0 10px;
  border-radius: 8px;
  background: linear-gradient(to right, #224568, #3498db);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.custom-menu .menu-item-info p.price {
  color: #ff0000;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.custom-menu .menu-item-info p {
  margin: 0;
  color: #ccc;
  text-decoration: none; /* Ensure no underline */
}

.filter-container {
  margin: 20px 0;
  text-align: right;
}

.filter-container select {
  padding: 8px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-left: 10px;
  cursor: pointer;
  background: #fff;
  transition: all 0.3s ease;
}

.filter-container select:hover {
  border-color: #4CAF50;
}

@media (max-width: 1200px) {
  .menu-carousel {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .menu-carousel {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .menu-carousel {
    grid-template-columns: 1fr;
  }
}
</style>
