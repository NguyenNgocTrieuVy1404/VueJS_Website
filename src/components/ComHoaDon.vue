<template>
     <div class="invoice-modal" v-if="show">
      <div class="invoice-content">
        <div class="store-header">
          <h1>Triều Vỹ Store</h1>
          <p>Chuyên cung cấp các sản phẩm giày chính hãng</p>
          <p>Hotline: 1900 1234</p>
        </div>

        <h2>Hóa Đơn Thanh Toán</h2>
        <div class="customer-info">
          <div class="info-group">
            <p><i class="fas fa-user"></i> <strong>Khách hàng:</strong> {{ customerName }}</p>
            <p><i class="fas fa-phone"></i> <strong>Số điện thoại:</strong> {{ customerPhone }}</p>
            <p><i class="fas fa-calendar"></i> <strong>Ngày:</strong> {{ currentDate }}</p>
          </div>
          <div class="info-group">
            <p><i class="fas fa-clock"></i> <strong>Thời gian:</strong> {{ currentTime }}</p>
            <p class="address-container">
              <i class="fas fa-map-marker-alt"></i> 
              <strong>Địa chỉ:</strong>
              <input 
                v-model.trim="customerAddress" 
                type="text" 
                class="address-input"
                placeholder="Nhập địa chỉ giao hàng"
              >
            </p>
          </div>
        </div>
        
        <table class="invoice-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ formatPrice(item.price) }} VND</td>
              <td>{{ item.quantity }}</td>
              <td>{{ formatPrice(calculateItemTotal(item)) }} VND</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="4">Tạm tính:</td>
              <td>{{ formatPrice(calculateSubTotal) }} VND</td>
            </tr>
            <tr class="tax-row">
              <td colspan="4">Thuế VAT (10%):</td>
              <td>{{ formatPrice(calculateTax) }} VND</td>
            </tr>
            <tr class="total-row">
              <td colspan="4">Tổng cộng:</td>
              <td class="total-amount">{{ formatPrice(calculateTotal) }} VND</td>
            </tr>
          </tbody>
        </table>
  
        <div class="invoice-footer">
          <div class="signature-section">
            <div class="customer-signature">
              <p>Khách hàng</p>
              <p>(Ký và ghi rõ họ tên)</p>
            </div>
            <div class="seller-signature">
              <p>Người bán</p>
              <p>(Ký và ghi rõ họ tên)</p>
            </div>
          </div>
          <div class="invoice-actions">
            <button class="btn btn-primary" @click="handleConfirm">
              <i class="fas fa-check"></i> Xác nhận thanh toán
            </button>
            <button class="btn btn-danger" @click="$emit('close')">
              <i class="fas fa-times"></i> Hủy
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal thông báo thanh toán thành công -->
    <div class="success-modal" v-if="showSuccessModal">
      <div class="success-content">
        <div class="success-header">
          <img src="Images/logoTV.png" alt="Logo" class="success-logo" style="width: 100px; height: 100px;">
          <i class="fas fa-check-circle success-icon"></i>
        </div>
        <div class="success-body">
          <h3 class="success-title">Thanh toán thành công!</h3>
          <div class="success-message">
            <p class="thank-you">Cảm ơn quý khách đã mua hàng tại</p>
            <p class="store-name">Triều Vỹ Store!</p>
            <div class="delivery-info">
              <i class="fas fa-truck"></i>
              <p>Chúng tôi sẽ giao hàng trong vòng 24h</p>
            </div>
          </div>
          <div class="success-actions">
            <button class="btn btn-success close-btn" @click="handleCloseSuccess">
              <i class="fas fa-times"></i>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import eventBus from '../eventBus'

  export default {
    data() {
      return {
        showSuccessModal: false,
        show: false,
        items: [],
        customerName: '',
        customerPhone: '',
        customerAddress: '',
        currentDate: '',
        currentTime: ''
      }
    },
    created() {
      // Lắng nghe sự kiện từ ComCart và lấy thông tin địa chỉ từ localStorage
      eventBus.on('open-invoice', (data) => {
        this.show = true
        this.items = data.items
        this.customerName = data.customerName
        this.customerPhone = data.customerPhone
        this.currentDate = data.currentDate
        this.currentTime = data.currentTime

        // Lấy địa chỉ từ localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentuser'))
        if (currentUser && currentUser.address) {
          this.customerAddress = currentUser.address
        }
      })
    },
    beforeUnmount() {
      eventBus.off('open-invoice')
    },
    computed: {
      calculateSubTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },
      calculateTax() {
        return this.calculateSubTotal * 0.1;
      },
      calculateTotal() {
        return this.calculateSubTotal + this.calculateTax;
      }
    },
    methods: {
      calculateItemTotal(item) {
        return item.price * item.quantity;
      },
      formatPrice(price) {
        if (price === undefined || price === null) {
          return "0";
        }
        return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
      handleConfirm() {
        if (!this.customerAddress) {
          alert('Vui lòng nhập địa chỉ giao hàng!');
          return;
        }

        // Cập nhật địa chỉ vào localStorage nếu có thay đổi
        const currentUser = JSON.parse(localStorage.getItem('currentuser'))
        if (currentUser && this.customerAddress !== currentUser.address) {
          currentUser.address = this.customerAddress
          localStorage.setItem('currentuser', JSON.stringify(currentUser))
        }

        this.showSuccessModal = true;
      },
      handleCloseSuccess() {
        this.showSuccessModal = false;
        this.show = false;
        eventBus.emit('payment-confirmed');
        this.$emit('confirm');
      }
    }
  }
  </script>
  
  <style scoped>
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
    padding: 2rem;
    border-radius: 8px;
    width: 80%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    color: #333;
  }

  .store-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #007bff;
  }

  .store-header h1 {
    color: #007bff;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }
  
  .customer-info {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .info-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .info-group p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.95rem;
  }
  
  .info-group i {
    width: 20px;
    color: #007bff;
  }
  
  .address-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .address-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }
  
  .address-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.15);
  }
  
  .address-input::placeholder {
    color: #999;
  }
  
  @media (max-width: 768px) {
    .customer-info {
      grid-template-columns: 1fr;
    }
    
    .address-container {
      flex-wrap: wrap;
    }
    
    .address-input {
      width: 100%;
      margin-top: 4px;
    }
  }
  
  .invoice-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
    color: #333;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .invoice-table th,
  .invoice-table td {
    padding: 1rem;
    text-align: left;
    border: 1px solid #dee2e6;
  }
  
  .invoice-table th {
    background-color: #007bff;
    color: white;
    font-weight: bold;
  }
  
  .total-row {
    font-weight: bold;
    background-color: #f8f9fa;
  }

  .total-amount {
    color: #dc3545;
    font-size: 1.2rem;
  }

  .subtotal-row, .tax-row {
    background-color: #f8f9fa;
  }
  
  .invoice-footer {
    margin-top: 2rem;
    border-top: 2px solid #dee2e6;
    padding-top: 2rem;
  }

  .signature-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    text-align: center;
  }

  .customer-signature, .seller-signature {
    flex: 1;
  }
  
  .invoice-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
  
  .btn-danger {
    background-color: #dc3545;
    color: white;
  }
  
  .btn-danger:hover {
    background-color: #c82333;
    transform: translateY(-2px);
  }

  .success-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
  }

  .success-content {
    background: white;
    padding: 3rem;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }

  .success-icon {
    font-size: 4rem;
    color: #28a745;
    margin-bottom: 1rem;
  }

  .success-content h3 {
    color: #28a745;
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }

  .success-content p {
    margin-bottom: 1.5rem;
    color: #333;
  }

  .success-actions {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .success-actions .btn {
    min-width: 120px;
  }
  
  @media print {
    .invoice-modal {
      position: static;
      background: none;
    }
    
    .invoice-content {
      box-shadow: none;
      padding: 0;
    }
    
    .invoice-actions {
      display: none;
    }
  }
  </style>