<template>
  <div class="custom-menu">
    <div class="header">
      <div class="filter-container">
        <div class="filter-group">
          <select v-model="selectedBrand" class="brand-filter">
            <option value="">Tất cả sản phẩm</option>
            <option value="nike">Nike</option>
            <option value="vans">Vans</option>
            <option value="mlb">MLB</option>
            <option value="gucci">Gucci</option>
          </select>

          <div class="sort-group">
            <label for="sort">Sắp xếp theo giá:</label>
            <select id="sort" v-model="sortOrder" class="sort-select">
              <option value="asc">Tăng dần ↑</option>
              <option value="desc">Giảm dần ↓</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-carousel">
      <div
        class="menu-item"
        v-for="product in displayedProducts"
        :key="product.id"
      >
        <router-link
          :to="{ name: 'ProductDetail', params: { id: product.id } }"
        >
          <img :src="product.image" :alt="product.name" />
          <div class="menu-item-info">
            <h3>{{ product.name }}</h3>
            <p class="price">{{ formatPrice(product.price) }} VNĐ</p>
          </div>
        </router-link>
      </div>
    </div>
    <div class="pagination">
      <button
        v-for="page in totalPages"
        :key="page"
        :class="['page-btn', { active: currentPage === page }]"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import items from "@/data/items";
import cart from "@/data/cart";

export default {
  data() {
    return {
      products: items,
      cart: cart,
      sortOrder: "asc",
      selectedBrand: "",
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    filteredAndSortedProducts() {
      let filtered = [...this.products];

      if (this.selectedBrand) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(this.selectedBrand.toLowerCase())
        );
      }

      return filtered.sort((a, b) => {
        return this.sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      });
    },
    totalPages() {
      return Math.ceil(
        this.filteredAndSortedProducts.length / this.itemsPerPage
      );
    },
    displayedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredAndSortedProducts.slice(start, end);
    },
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    goToPage(page) {
      this.currentPage = page;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.scrollTo(0, 0);
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

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.filter-container {
  margin: 20px 0;
  text-align: center;
}

.filter-group {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 40px 0;
  padding: 20px;
}

.page-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #fff;
  color: #2c3e50;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.page-btn:hover {
  background: #f8d9d5;
  transform: translateY(-2px);
}

.page-btn.active {
  background: #d9534f;
  color: #fff;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .pagination {
    gap: 8px;
  }

  .page-btn {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }
}
.brand-filter {
  padding: 12px 25px;
  border-radius: 10px;
  border: 2px solid #226fe2;
  font-size: 18px;
  cursor: pointer;
  background: #fff;
  transition: all 0.3s ease;
  min-width: 200px;
}

.brand-filter:hover {
  border-color: #1a54b0;
  transform: translateY(-2px);
}

.sort-group {
  display: flex;
  align-items: center;
  gap: 15px;
}

.sort-group label {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.sort-select {
  padding: 12px 25px;
  font-size: 18px;
  border-radius: 10px;
  border: 2px solid #226fe2;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;
}

.sort-select:hover {
  border-color: #1a54b0;
  transform: translateY(-2px);
}

.custom-menu .menu-carousel {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding: 20px;
}

.custom-menu .menu-item {
  background: transparent;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  padding: 15px;
}

.custom-menu .menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.custom-menu .menu-item img {
  width: 700px;
  height: 800px;
  object-fit: contain;
  padding: 10px;
  background: transparent;
  transition: transform 0.3s ease;
  margin: 0 auto;
  display: block;
  mix-blend-mode: multiply;
}

.custom-menu .menu-item:hover img {
  transform: scale(1.05);
}

.custom-menu .menu-item-info {
  padding: 15px;
  background: linear-gradient(145deg, #e0c3fc, #ffffff);
  border-top: 1px solid #eee;
}

.custom-menu .menu-item-info h3 {
  color: white;
  font-size: 16px;
  padding: 10px;
  margin: 0 0 10px;
  border-radius: 8px;
  background: linear-gradient(to right, #4A00E0, #8E2DE2) !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.custom-menu .menu-item-info p.price {
  color: #ff0000;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.custom-menu .menu-item-remaining {
  text-align: center;
  margin-top: 20px;
}

.custom-menu .menu-item-remaining .menu-title {
  font-size: 28px;
  margin-bottom: 10px;
}

.custom-menu .menu-item-remaining .menu-item {
  display: inline-block;
  margin: 0 5px;
  flex: none;
}

.custom-menu .menu-navigation {
  position: absolute;
  top: 50%;
  width: 100%;
  margin: 0 50px;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.custom-menu .menu-navigation i {
  background-color: rgba(0, 0, 0, 0.5);
  color: #bbb7b7;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-menu .menu-navigation i:hover {
  background-color: #fcb034;
}

@media (max-width: 1200px) {
  .custom-menu .menu-carousel {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .custom-menu .menu-carousel {
    grid-template-columns: 1fr;
  }

  .filter-group {
    flex-direction: column;
    gap: 15px;
  }

  .custom-menu .menu-item img {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 600px) {
  .custom-menu .menu-carousel {
    grid-template-columns: 1fr;
  }
}
</style>
