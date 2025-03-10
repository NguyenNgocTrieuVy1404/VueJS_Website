<template>
  <div class="about-container">
    <h1 class="title">CHÀO MỪNG ĐẾN VỚI TRIEUVY STORE!</h1>
    
    <div class="content">
      <section class="intro">
        <div class="section-header">
          <i class="fas fa-store"></i>
          <h2>Giới thiệu</h2>
        </div>
        <p>
          TRIEUVY STORE là cửa hàng giày uy tín hàng đầu, chuyên cung cấp các sản phẩm giày chính hãng từ các thương hiệu nổi tiếng. Chúng tôi tự hào mang đến cho khách hàng những sản phẩm chất lượng với giá cả cạnh tranh tại Việt Nam và ngoại quốc nhất.
        </p>
      </section>

      <section class="mission">
        <div class="section-header">
          <i class="fas fa-bullseye"></i>
          <h2>Sứ mệnh</h2>
        </div>
        <p>
          Chúng tôi cam kết mang đến cho khách hàng những trải nghiệm mua sắm tuyệt vời thông qua dịch vụ chuyên nghiệp và tận tâm. Chúng tôi hiểu rằng giày không chỉ là một sản phẩm thời trang, mà còn là yếu tố quan trọng trong việc thể hiện phong cách và sự tự tin của mỗi người.
        </p>
      </section>

      <section class="products">
        <div class="section-header">
          <i class="fas fa-shoe-prints"></i>
          <h2>Danh mục sản phẩm</h2>
        </div>
        <div class="product-grid">
          <div class="product-category">
            <img src="https://xamsneaker.com/wp-content/uploads/Nike-Air-Jordan-1-Low-Panda-2023-Rep11-800x650-1.jpg" alt="Nike" class="brand-icon">
            <h3>Nike</h3>
            <p>Các dòng Nike chính hãng mới nhất với đầy đủ phiên bản và màu sắc</p>
          </div>
          <div class="product-category">
            <img src="https://xamsneaker.com/wp-content/uploads/vans-old-sklool-rep11-800x650-1.jpg" alt="Vans" class="brand-icon">
            <h3>Vans</h3>
            <p>Từ dòng Vans Classic đến các mẫu Limited Edition độc đáo</p>
          </div>
          <div class="product-category">
            <img src="https://xamsneaker.com/wp-content/uploads/mlb-chunky-liner-ny-black-white-rep11-likeauth-800x650-1.jpg" alt="MLB" class="brand-icon">
            <h3>MLB</h3>
            <p>Bộ sưu tập MLB thời thượng với thiết kế hiện đại</p>
          </div>
        </div>
      </section>

      <section class="commitments">
        <div class="section-header">
          <i class="fas fa-shield-alt"></i>
          <h2>Cam kết của chúng tôi</h2>
        </div>
        <div class="commitment-grid">
          <div class="commitment-item">
            <i class="fas fa-check-circle"></i>
            <span>100% chính hãng</span>
          </div>
          <div class="commitment-item">
            <i class="fas fa-award"></i>
            <span>Bảo hành chính thức</span>
          </div>
          <div class="commitment-item">
            <i class="fas fa-tags"></i>
            <span>Giá cả cạnh tranh</span>
          </div>
          <div class="commitment-item">
            <i class="fas fa-headset"></i>
            <span>Hỗ trợ 24/7</span>
          </div>
          <div class="commitment-item">
            <i class="fas fa-sync-alt"></i>
            <span>Đổi trả trong 30 ngày</span>
          </div>
        </div>
      </section>

      <section class="services">
        <div class="section-header">
          <i class="fas fa-concierge-bell"></i>
          <h2>Dịch vụ khách hàng</h2>
        </div>
        <div class="service-grid">
          <div class="service-item">
            <i class="fas fa-user-tie"></i>
            <h3>Tư vấn chuyên nghiệp</h3>
            <p>Đội ngũ nhân viên giàu kinh nghiệm, tận tâm</p>
          </div>
          <div class="service-item">
            <i class="fas fa-tools"></i>
            <h3>Hỗ trợ kỹ thuật</h3>
            <p>Sửa chữa, bảo trì nhanh chóng và chuyên nghiệp</p>
          </div>
          <div class="service-item">
            <i class="fas fa-truck"></i>
            <h3>Giao hàng toàn quốc</h3>
            <p>Miễn phí giao hàng cho đơn từ 500.000đ</p>
          </div>
          <div class="service-item">
            <i class="fas fa-credit-card"></i>
            <h3>Thanh toán linh hoạt</h3>
            <p>Hỗ trợ nhiều phương thức thanh toán</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComGioiThieu",
  mounted() {
    this.$nextTick(() => {
      window.scrollTo(0, 0);
    });
  }
};
</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f7fa;
}

.title {
  padding-top: 100px;
  font-size: 3.5rem;
  color: #0000FF;
  text-align: center;
  margin-bottom: 50px;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(135, 206, 235, 0.5);
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(45deg, #0000FF, #87CEEB);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleGlow 2s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  from {
    text-shadow: 0 0 5px rgba(135, 206, 235, 0.5);
  }
  to {
    text-shadow: 0 0 20px rgba(135, 206, 235, 0.8);
  }
}

.content {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

section {
  margin-bottom: 40px;
  padding: 30px;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

section:hover {
  transform: translateY(-5px);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  border-bottom: 3px solid #3498db;
  padding-bottom: 15px;
}

.section-header i {
  font-size: 2rem;
  color: #3498db;
  margin-right: 15px;
}

h2 {
  color: #2c3e50;
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
}

.product-grid, .service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.product-category, .service-item {
  text-align: center;
  padding: 25px;
  border-radius: 12px;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.product-category:hover, .service-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.product-category i, .service-item i {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 15px;
}

.brand-icon {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.brand-icon:hover {
  transform: scale(1.05);
}

.product-category {
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border: 1px solid #eaeaea;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.product-category:hover {
  background: linear-gradient(145deg, #f0f0f0, #ffffff);
}

.commitment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.commitment-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.commitment-item:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

.commitment-item i {
  font-size: 1.5rem;
  color: #3498db;
  margin-right: 15px;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
    padding-top: 80px;
  }

  .content {
    padding: 20px;
  }

  section {
    padding: 20px;
  }

  .product-grid, .service-grid {
    grid-template-columns: 1fr;
  }

  .commitment-grid {
    grid-template-columns: 1fr;
  }
}

.intro {
  background: linear-gradient(145deg, #e3f2fd, #bbdefb);
  border-left: 5px solid #2196f3;
}

.mission {
  background: linear-gradient(145deg, #e8f5e9, #c8e6c9);
  border-left: 5px solid #4caf50;
}

.products {
  background: linear-gradient(145deg, #fff3e0, #ffe0b2);
  border-left: 5px solid #ff9800;
}

.commitments {
  background: linear-gradient(145deg, #f3e5f5, #e1bee7);
  border-left: 5px solid #9c27b0;
}

.services {
  background: linear-gradient(145deg, #fce4ec, #f8bbd0);
  border-left: 5px solid #e91e63;
}

.section-header {
  background: rgba(255, 255, 255, 0.7);
  padding: 15px;
  border-radius: 10px;
  margin: -10px -10px 20px -10px;
}

.section-header i {
  font-size: 2rem;
}

/* Màu icon cho từng phần */
.intro .section-header i { color: #1976d2; }
.mission .section-header i { color: #388e3c; }
.products .section-header i { color: #f57c00; }
.commitments .section-header i { color: #7b1fa2; }
.services .section-header i { color: #c2185b; }

/* Màu cho commitment items */
.commitment-grid {
  gap: 15px;
}

.commitment-item {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  padding: 20px;
  transition: all 0.3s ease;
}

.commitment-item:nth-child(1) { border-bottom: 3px solid #2196f3; }
.commitment-item:nth-child(2) { border-bottom: 3px solid #4caf50; }
.commitment-item:nth-child(3) { border-bottom: 3px solid #ff9800; }
.commitment-item:nth-child(4) { border-bottom: 3px solid #9c27b0; }
.commitment-item:nth-child(5) { border-bottom: 3px solid #e91e63; }

/* Màu cho service items */
.service-item {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
}

.service-item:nth-child(1) { border-top: 5px solid #2196f3; }
.service-item:nth-child(2) { border-top: 5px solid #4caf50; }
.service-item:nth-child(3) { border-top: 5px solid #ff9800; }
.service-item:nth-child(4) { border-top: 5px solid #e91e63; }
</style>