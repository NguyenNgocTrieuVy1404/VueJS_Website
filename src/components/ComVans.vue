<template>
  <div class="custom-menu">
    <h2 class="title">Vans</h2>
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
        v-for="product in sortedAndFilteredProducts"
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
      selectedCategory: "",
      sortOrder: "asc",
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => product.name.toLowerCase().includes('vans'));
    },
    sortedAndFilteredProducts() {
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
  text-align: center;
  padding: 20px;
  background-color: #fff;
}

.custom-menu .title {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(45deg, #000000, #ff0000);
  padding: 20px 40px;
  margin-top: 100px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  padding: 0 20px;
}

.custom-menu .menu-item {
  flex: 0 1 calc(25% - 15px);
  margin-bottom: 20px;
  box-sizing: border-box;
}

.custom-menu .menu-item-info {
  text-decoration: none; /* Ensure no underline */
}

.custom-menu .menu-item-info p.price {
  color: #ff0000;
  font-size: 20px;
  font-weight: bold;
  margin: 5px 0;
  text-decoration: underline;
}

.custom-menu .menu-item img {
  width: 50%;
  padding-bottom: 40px;
  transition: transform 0.3s ease;
}

.custom-menu .menu-item:hover .menu-item-info {
  opacity: 1;
}

.custom-menu .menu-item:hover img {
  transform: scale(1.1);
}

.custom-menu .menu-item-info h3 {
  font-size: 16px;
  margin: 0 0 5px;
  text-decoration: none; /* Ensure no underline */
  background-color: #6495ed;
  color: white;
  padding: 8px;
  border-radius: 5px;
}

.custom-menu .menu-item-info p {
  margin: 0;
  color: #ccc;
  text-decoration: none; /* Ensure no underline */
}
</style>
