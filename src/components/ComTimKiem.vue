<template>
  <div>
    <div v-if="searchQuery === '' && query === ''">
      <div class="not-found-container">
        <img src="/Images/blank-page.png" alt="Không tìm thấy sản phẩm" class="not-found-image" />
      </div>
    </div>
    <div v-else-if="filteredProducts.length">
      <div class="menu">
        <div class="menu-grid">
          <div class="menu-item" v-for="product in filteredProducts" :key="product.id">
            <img :src="product.image" :alt="product.name" class="product-image" />
            <div class="menu-item-info">
              <h2>{{ product.name }}</h2>
              <p class="description">{{ product.description }}</p>
              <p class="price">{{ formatPrice(product.price) }} VND</p>
              <div v-if="product.quality === 0" class="sold-out">Hết hàng</div>
              <div v-else>
                <button @click="addToCart(product)">Thêm vào giỏ hàng</button>
                <p style="margin-top: 20px;">Hàng tồn: {{ product.quality }} sản phẩm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="not-found-container">
        <img src="/Images/404.png" alt="Không tìm thấy sản phẩm" class="not-found-image" />
        <p class="not-found-text">Không tìm thấy sản phẩm</p>
      </div>
    </div>
  </div>
</template>

<script>
import items from "@/data/items";
import cart from "../data/cart";

export default {
  data() {
    return {
      query: this.$route.query.q || "",
      searchQuery: this.$route.query.q || "",
      products: items, // Danh sách sản phẩm
      cart: cart,
      isFull: false,
      showSearch: false, // Biến để kiểm soát hiển thị ô tìm kiếm
    };
  },
  computed: {
    filteredProducts() {
      // Lọc sản phẩm theo tên dựa trên truy vấn tìm kiếm
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(this.query.toLowerCase())
      );
    },
  },
  methods: {
    addToCart(product) {
      const inforproduct = this.cart.find(item => item.id === product.id);
      
      // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
      if (inforproduct) {
        // Kiểm tra số lượng trong kho còn đủ không
        if (product.quality > 0) {
          inforproduct.quantity++;
          product.quality--;
        } else {
          alert('Sản phẩm đã hết hàng!');
        }
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng và còn hàng trong kho
        if (product.quality > 0) {
          const newProduct = { ...product, quantity: 1 };
          this.cart.push(newProduct);
          product.quality--;
        } else {
          alert('Sản phẩm đã hết hàng!');
        }
      }
    },
    formatPrice(price) {
      if (price === undefined || price === null) {
        return "0"; 
      }
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    performSearch() {
      if (this.searchQuery.trim() === "") {
        this.query = ""; // Xóa từ khóa tìm kiếm
        this.hideSearch(); // Ẩn ô tìm kiếm
      } else {
        // Chuyển hướng đến trang tìm kiếm, truyền từ khóa tìm kiếm
        this.$router.push({ path: '/search', query: { q: this.searchQuery } });
        this.query = this.searchQuery; // Cập nhật query để lọc sản phẩm
        this.searchQuery = ""; 
        this.hideSearch(); 
      }
    },
    hideSearch() {
      this.showSearch = false;
    }
  },
  watch: {
    '$route.query.q'(newQuery) {
      this.query = newQuery || "";
    }
  },
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.menu {
  text-align: center;
  padding: 40px 20px;
  background-color: #fff;
}

.menu-title {
  font-size: 32px;
  padding-top: 10px;
  margin-bottom: 20px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.menu-item {
  flex-direction: column;
  width: 100%;
  margin: 0;
  height: 100%;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 6px;
}

.menu-item-info {
  width: 100%;
  padding: 20px;
}

.menu-item-info h2 {
  font-size: 1.5rem;
}

.menu-item-info p {
  margin: 5px 0;
}

button {
  background-color: #f3f3f3;
  color: #030303;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 15px;
}

button:hover {
  background-color: #e0a020;
}

.description {
  font-size: 1rem;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
  margin: 5px 0;
}

.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  position: sticky;
  bottom: 0;
  width: 100%;
}

button.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.not-found-container {
  position: relative;        
  text-align: center;       
}

.not-found-image {
  width: 600px;             
  height: auto;             
  display: block;           
  margin: 0 auto;          
  padding-top: 170px; 
}

.not-found-text {
  font-size: 24px;
  color: #666;
  margin-top: 20px;
  font-weight: bold;
}

.sold-out {
  background: rgba(255, 59, 59, 0.1);
  color: #ff0800;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 20px;
  border: 2px solid #ffc574;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .menu-grid {
    grid-template-columns: 1fr;
    padding: 20px;
  }
}
</style>
