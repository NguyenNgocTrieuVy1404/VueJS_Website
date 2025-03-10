<template>
  <div class="main-container">
    <div class="content">
      <!-- Nội dung chính của bạn sẽ ở đây -->
    </div>
    <footer>
      <div class="footer-container">
        <div class="footer-column">
          <h2 class="text-left">Thông tin liên hệ</h2>
          <div class="contact-info">
            <p><span>Email:</span> nguyenngoctrieuvy.k55ltk@gmail.com</p>
            <p><span>Điện thoại:</span> 0942368957</p>
            <p><span>Địa chỉ:</span> 11, Đường Trường Chinh, Thành phố Hồ Chí Minh</p>
          </div>
        </div>
        <div class="footer-column text-center">
          <h2>Sản phẩm</h2>
          <p><router-link :to="{ name: 'Nike' }">Nike</router-link></p>
          <p><router-link :to="{ name: 'Vans' }">Vans</router-link></p>
          <p><router-link :to="{ name: 'MLB' }">MLB</router-link></p>
          <p><router-link :to="{ name: 'Gucci' }">Gucci</router-link></p>
        </div>
        <div class="footer-column text-center">
          <h2>Follow chúng tôi</h2>
          <p>
            <a href="https://www.facebook.com/profile.php?id=100034355212341" target="_blank">Facebook</a>
          </p>
          <p>
            <a href="https://www.instagram.com/_trieuvy04?igsh=eDFyNXN2aWNpa2F1&utm_source=qr" target="_blank">Instagram</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
 
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

.main-container {
  display: flex;
  flex-direction: column;
  min-height: 30vh;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
}

footer {
  background: linear-gradient(135deg, #000428, #004e92, #ffffff);
  color: #ffffff;
  padding: 20px;
  width: 100%;
}

.footer-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-column {
  flex: 1;
  padding: 10px;
  min-width: 200px;
  box-sizing: border-box;
  text-align: left;
}

.footer-column h2 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;
  text-align: left;
}

.footer-column p {
  font-size: 16px;
  margin: 8px 0;
  line-height: 1.5;
}

.contact-info p {
  display: flex;
  align-items: baseline;
}

.contact-info span {
  min-width: 100px;
  font-weight: bold;
}

.footer-column a {
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
  cursor: pointer;
}

.footer-column a:hover {
  text-decoration: underline;
  color: #ffa726;
}

.text-center {
  text-align: center;
}

.text-center h2 {
  text-align: center;
}
</style>