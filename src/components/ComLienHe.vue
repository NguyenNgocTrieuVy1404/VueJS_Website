<template>
  <div class="contact-wrapper">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="main-title">Liên Hệ Với Chúng Tôi</h1>
        <div class="text-animation-wrapper">
          <p class="smooth-typing">Hãy ghé thăm cửa hàng của chúng tôi</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content-container">
      <!-- Contact Cards -->
      <div class="contact-grid">
        <div class="contact-card">
          <div class="icon-box">
            <i class="fas fa-phone-alt"></i>
          </div>
          <h3>Hotline</h3>
          <p class="contact-info">1900 3697</p>
          <p class="support-time">Hỗ trợ 24/7</p>
        </div>

        <div class="contact-card">
          <div class="icon-box">
            <i class="fas fa-envelope"></i>
          </div>
          <h3>Email</h3>
          <p class="contact-info">trieuvy@sneaker.com</p>
          <p class="support-time">Phản hồi trong 24h</p>
        </div>

        <div class="contact-card">
          <div class="icon-box">
            <i class="fas fa-clock"></i>
          </div>
          <h3>Giờ mở cửa</h3>
          <p class="contact-info">8:00 - 22:00</p>
          <p class="support-time">Tất cả các ngày trong tuần</p>
        </div>
      </div>

      <!-- Map Section -->
      <div class="map-section">
        <h2>Vị Trí Cửa Hàng</h2>
        <div class="address-info">
          <i class="fas fa-map-marker-alt"></i>
          <p>Công Viên Gia Định - Hoàng Minh Giám, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh</p>
        </div>
        <div class="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9558661915477!2d106.67742587460232!3d10.820634989322883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e195f816b7%3A0xfb5c0101490d8870!2zQ8O0bmcgdmnDqm4gR2lhIMSQ4buLbmg!5e0!3m2!1svi!2s!4v1710402095900!5m2!1svi!2s" 
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComLienHe'
}
</script>

<style scoped>
.contact-wrapper {
  background-color: #ffffff;
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #00b4db, #0083b0);
  padding: 60px 0;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: -50px;
  left: 0;
  width: 100%;
  height: 100px;
  background: #ffffff;
  clip-path: polygon(0 50%, 100% 0, 100% 100%, 0% 100%);
}

.main-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
}

.content-container {
  max-width: 1400px;
  margin: -50px auto 50px;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* Contact Cards */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 50px;
}

.contact-card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.08);
}

.icon-box {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #00b4db, #0083b0);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 28px;
  box-shadow: 0 5px 15px rgba(0,131,176,0.2);
}

.contact-card h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.4rem;
}

.contact-info {
  color: #00b4db;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.support-time {
  color: #666;
  font-size: 0.95rem;
}

/* Map Section */
.map-section {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
}

.map-section h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 2rem;
}

.address-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  color: #00b4db;
  font-size: 1.2rem;
}

.address-info i {
  font-size: 24px;
}

.map-container {
  height: 600px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.map-container iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

/* Responsive Design */
@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .map-container {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .content-container {
    padding: 0 15px;
    margin-top: -30px;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .map-section {
    padding: 20px;
  }
}

.text-animation-wrapper {
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.smooth-typing {
  font-size: 1.3rem;
  opacity: 0.9;
  position: relative;
  white-space: nowrap;
}

.smooth-typing::after {
  content: '';
  position: absolute;
  top: 0;
  right: -4px;
  width: 2px;
  height: 100%;
  background: #fff;
  animation: blink 0.8s infinite;
}

.smooth-typing {
  animation: smoothTyping 4s linear infinite;
}

@keyframes smoothTyping {
  0% {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
  20% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  80% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  100% {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>


