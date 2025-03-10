<template>
  <main>
    <div class="menu">
      <h2 class="menu-title" style="color: #8B0000;">CHI TIẾT SẢN PHẨM</h2>
      <div class="menu-carousel">
        <div class="menu-item">
          <img
            :src="product.image"
            alt="Pumpkin Spice Juice"
            class="product-image"
          />
          <div class="menu-item-info">
            <h2 style="color: #FFD700;">{{ product.name }}</h2>
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
  </main>
</template>

<script>
import items from "../data/items";
import cart from "../data/cart";

export default {
  data() {
    return {
      product: {},
      cart: cart,
    };
  },

  mounted() {
    let id = this.$route.params.id;
    this.product = items.find((item) => item.id == id);
    window.scrollTo(0, 0);
    this.$nextTick(() => {
      window.scrollTo(0, 0);
    });
  },

  methods: {
    addToCart(product) {
      const inforproduct = this.cart.find(item => item.id === product.id);
      
      if (inforproduct) {
        if (product.quality > 0) {
          inforproduct.quantity++;
          product.quality--;
        } else {
          alert('Sản phẩm đã hết hàng!');
        }
      } else {
        if (product.quality > 0) {
          const newProduct = { ...product, quantity: 1 };
          this.cart.push(newProduct);
          product.quality--;
        } else {
          alert('Sản phẩm đã hết hàng!');
        }
      }
      window.scrollTo(0, 0);
    },
    formatPrice(price) {
      if (price === undefined || price === null) {
        return "0"; 
      }
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
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
  background-color: #F5F5F5;
}

.menu-title {
  font-size: 40px;
  margin-top: 70px;
  animation: fadeInDown 1s ease-out;
}

.menu-carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: 100%;
  perspective: 1000px;
}

.menu-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.5s ease;
  margin: 0 10px;
  max-width: 1000px;
  animation: slideIn 1s ease-out;
  transform-style: preserve-3d;
  background: #2C3E50;
}

.menu-item:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.product-image {
  width: 35%;
  height: 400px;
  object-fit: contain;
  border-radius: 10px;
  transition: transform 0.5s ease;
  background: #ECF0F1;
  padding: 10px;
}

.product-image:hover {
  transform: scale(1.1);
}

.menu-item-info {
  flex: 1;
  background: linear-gradient(45deg, #2C3E50, #34495E);
  opacity: 0.95;
  color: #ECF0F1;
  text-align: left;
  padding: 20px;
  border-radius: 8px;
  transition: all 0.5s ease;
}

.menu-item-info:hover {
  background: linear-gradient(45deg, #34495E, #2C3E50);
  opacity: 1;
}

.menu-item-info h2 {
  font-size: 40px;
  margin: 0 0 10px;
  color: #FFD700;
  animation: fadeIn 1s ease-out;
}

.menu-item-info p {
  margin: 5px 0;
  animation: fadeIn 1.2s ease-out;
}

button {
  background: linear-gradient(45deg, #2C3E50, #3498DB);
  color: #ECF0F1;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  margin-top: 15px;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  animation: pulse 2s infinite;
}

button:hover {
  background: linear-gradient(45deg, #3498DB, #2C3E50);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
}

.description {
  font-size: 20px;
  color: #ECF0F1;
  line-height: 1.6;
}

.price {
  font-size: 30px;
  font-weight: bold;
  color: #FFD700;
  margin: 5px 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.footer {
  background-color: #2C3E50;
  color: #ECF0F1;
  text-align: center;
  padding: 10px 0;
  position: sticky;
  bottom: 0;
  width: 100%;
}

button.disabled {
  background: #95A5A6;
  cursor: not-allowed;
  box-shadow: none;
  animation: none;
}

.sold-out {
  background: rgba(231, 76, 60, 0.1);
  color: #E74C3C;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 20px;
  border: 2px solid #E74C3C;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: pulse 2s infinite;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
</style>
