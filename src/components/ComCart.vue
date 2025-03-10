<template>
  <div class="cart-container">
    <h2 class="cart-title" style="color: red;">GIỎ HÀNG</h2>
    
    <div v-if="cart.length === 0">
      <img
        src="//theme.hstatic.net/1000361985/1001103158/14/cart_empty_background.png?v=1400"
        alt="Giỏ hàng chưa có hàng"
        class="image-cart"
      />
      <p class="empty-cart">Giỏ hàng đang trống</p>
    </div>

    <div v-else class="modal-content">
      <table style="width: 100%" class="text-center table">
        <thead>
          <tr>
            <th></th>
            <th>HÌNH</th>
            <th>SẢN PHẨM</th>
            <th>GIÁ TIỀN</th>
            <th>SỐ LƯỢNG</th>
            <th>THÀNH TIỀN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td class="align-middle">
              <input type="checkbox" v-model="selectedItems" :value="item.id" />
            </td>
            <td>
              <router-link :to="{ name: 'ProductDetail', params: { id: item.id }}" class="product-link">
                <img :src="item.image" style="height: 100px; width: 100px" />
              </router-link>
            </td>
            <td class="align-middle">{{ item.name }}</td>
            <td class="align-middle">{{ formatPrice(item.price) }} VND</td>
            <td class="align-middle">
              <div class="quantity-controls">
                <button class="btn-quantity" @click="decrementQuantity(item)">-</button>
                <span class="quantity-display">{{ item.quantity }}</span>
                <button class="btn-quantity" @click="incrementQuantity(item)">+</button>
              </div>
            </td>
            <td class="align-middle">{{ formatPrice(item.price * item.quantity) }} VND</td>
            <td class="align-middle text-center">
              <button class="btn btn-danger" @click="deleteProduct(item)">Xóa</button>
            </td>
          </tr>
          <tr>
            <th colspan="3"></th>
            <th>Tổng tiền</th>
            <th>{{ tongSoLuong }}</th>
            <th>{{ formatPrice(tongTien) }} VND</th>
            <th>
              <button class="btn btn-danger" @click="xoaHet()">XÓA TẤT CẢ</button>
            </th>
          </tr>
        </tbody>
      </table>

      <div class="actions">
        <button 
          class="btn btn-primary"
          @click="handleCheckout"
          :disabled="!isLoggedIn"
        >
          {{ isLoggedIn ? 'Thanh toán' : 'Vui lòng đăng nhập để thanh toán' }}
        </button>
      </div>
    </div>

    <com-hoa-don
      v-if="showInvoice"
      @close="closeInvoice"
    />
  </div>
</template>

<script>
import items from '@/data/items';
import cart from "../data/cart";
import ComHoaDon from './ComHoaDon.vue'
import eventBus from '../eventBus'

export default {
  components: {
    ComHoaDon
  },

  data() {
    return {
      cart: cart,
      selectedItems: [],
      isLoggedIn: false,
      showPaymentSuccess: false,
      showInvoice: false,
      invoiceItems: [],
      currentDate: '',
      currentTime: '',
      invoiceTotal: 0,
      customerName: '',
      customerPhone: ''
    };
  },

  computed: {
    tongTien() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    tongSoLuong() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },

    selectedProducts() {
      return this.cart.filter(item => this.selectedItems.includes(item.id));
    }
  },

  methods: {
    incrementQuantity(item) {
      const product = items.find(i => i.id === item.id);
      if (product && product.quality > 0) {
        item.quantity++;
        product.quality--;
      } else {
        alert('Sản phẩm đã hết hàng!');
      }
    },

    decrementQuantity(item) {
      if (item.quantity > 1) {
        const product = items.find(i => i.id === item.id);
        if (product) {
          item.quantity--;
          product.quality++;
        }
      } else {
        this.deleteProduct(item);
      }
    },

    deleteProduct(item) {
      const product = items.find(i => i.id === item.id);
      if (product) {
        product.quality += item.quantity;
      }
      const index = this.cart.findIndex(x => x.id === item.id);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    },

    xoaHet() {
      this.cart.forEach(cartItem => {
        const product = items.find(i => i.id === cartItem.id);
        if (product) {
          product.quality += cartItem.quantity;
        }
      });
      this.cart.splice(0, this.cart.length);
      this.selectedItems = [];
    },

    formatPrice(price) {
      if (price === undefined || price === null) {
        return "0";
      }
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    handleCheckout() {
      if (this.selectedProducts.length > 0) {
        const now = new Date();
        const currentUser = JSON.parse(localStorage.getItem('currentuser'));

        this.showInvoice = true;
        
        this.$nextTick(() => {
          eventBus.emit('open-invoice', {
            items: this.selectedProducts,
            total: this.selectedProducts.reduce((total, item) => total + (item.price * item.quantity), 0),
            customerName: currentUser.fullName,
            customerPhone: currentUser.phoneOrEmail,
            currentDate: now.toLocaleDateString('vi-VN'),
            currentTime: now.toLocaleTimeString('vi-VN')
          });
        });

      } else {
        alert('Vui lòng chọn sản phẩm để thanh toán.');
      }
    },

    closeInvoice() {
      this.showInvoice = false;
    },
  },

  mounted() {
    const currentUser = localStorage.getItem('currentuser');
    this.isLoggedIn = !!currentUser;

    const soldItems = JSON.parse(localStorage.getItem('soldItems') || '[]');
    items.forEach(item => {
      item.sold = soldItems.includes(item.id);
    });

    // Lắng nghe sự kiện xác nhận thanh toán
    eventBus.on('payment-confirmed', () => {
      // Xóa các sản phẩm đã thanh toán khỏi giỏ hàng
      this.selectedItems.forEach(itemId => {
        const item = this.cart.find(cartItem => cartItem.id === itemId);
        if (item) {
          const product = items.find(i => i.id === item.id);
          if (product) {
            product.sold = true;
          }
          const index = this.cart.findIndex(x => x.id === item.id);
          if (index > -1) {
            this.cart.splice(index, 1);
          }
        }
      });
      
      // Cập nhật localStorage
      localStorage.setItem('soldItems', JSON.stringify(
        items.filter(item => item.sold).map(item => item.id)
      ));
      localStorage.setItem('cart', JSON.stringify(this.cart));
      
      // Reset
      this.selectedItems = [];
      this.showInvoice = false;
      this.showPaymentSuccess = true;
    });

    this.$nextTick(() => {
      window.scrollTo(0, 0);
    });
  },

  beforeUnmount() {
    eventBus.off('clear-cart');
  }
};
</script>

<style>
.cart-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.cart-title {
  font-size: 28px;
  padding-top: 30px;
  color: #333;
}

.image-cart {
  max-width: 20%;
  height: auto;
  margin: 0px auto;
  display: block;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.empty-cart {
  text-align: center;
  font-size: 30px;
  margin-top: 80px;
  margin-bottom: 100px;
  color: #666;
}

.modal-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.table {
  border-collapse: separate;
  border-spacing: 0 15px;
}

.table th {
  background: #f8f9fa;
  padding: 15px;
  font-size: 16px;
  color: #333;
}

.table td {
  padding: 15px;
  vertical-align: middle;
  background: white;
  border-top: 1px solid #eee;
}

.btn {
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-danger {
  background-color: #ff4d4d;
  color: white;
}

.btn-danger:hover {
  background-color: #ff1a1a;
}

.btn-primary {
  background: #3498db;
  color: white;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-quantity {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.quantity-display {
  min-width: 40px;
  text-align: center;
}

.btn-quantity:hover {
  background: #f8f9fa;
}

.align-middle {
  vertical-align: middle;
}

.text-center {
  text-align: center;
}

.actions {
  margin-top: 30px;
  text-align: right;
}

.btn-primary:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.btn-primary:disabled:hover {
  background: #cccccc;
  transform: none;
}

.payment-success-modal,
.invoice-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.invoice-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
}

.customer-info {
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 5px;
}

.invoice-table {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
}

.invoice-table th,
.invoice-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.total-row {
  font-weight: bold;
  background: #f8f9fa;
}

.invoice-actions {
  margin-top: 20px;
  text-align: right;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  margin-left: 10px;
}

@media print {
  .invoice-actions,
  .btn,
  .cart-container > *:not(.invoice-modal) {
    display: none;
  }
  
  .invoice-modal {
    position: static;
    background: white;
  }
  
  .invoice-content {
    box-shadow: none;
  }
}

.product-link {
    text-decoration: none;
    color: inherit;
}

.product-link:hover {
    opacity: 0.8;
}
</style>