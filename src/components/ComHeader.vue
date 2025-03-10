<template>
    <header>
        <div class="container">
            <div class="logo">
                <img src="/Images/luxuryLogo.png" alt="Logo" style="border-radius: 50%;">
                <span class="logo-text"></span>
            </div>
            <nav>
                <ul>
                    <li><router-link to="/" class="nav-link">Trang Chủ</router-link></li>
                    <li class="dropdown">
                        <router-link to="/sanpham" class="nav-link">
                            Sản Phẩm
                            <i class="fas fa-chevron-down"></i>
                        </router-link>
                        <ul class="dropdown-content">
                            <li>
                                <router-link to="/sanpham/Nike">Nike</router-link>
                            </li>
                            <li>
                                <router-link to="/sanpham/Vans">Vans</router-link>
                            </li>
                            <li>
                                <router-link to="/sanpham/MLB">MLB</router-link>
                            </li>
                            <li>
                                <router-link to="/sanpham/Gucci">Gucci</router-link>
                            </li>
                        </ul>
                    </li>
                    <li><router-link to="/gioithieu" class="nav-link">Giới Thiệu</router-link></li>
                    <li><router-link to="/lienhe" class="nav-link">Liên Hệ</router-link></li>
                </ul>
            </nav>
            <div class="cta">
                <div class="search-container">
                    <div class="search-wrapper">
                        <input 
                            type="text" 
                            placeholder="Nhập sản phẩm cần tìm kiếm..." 
                            class="search-input" 
                            v-model="searchQuery" 
                            @keyup.enter="performSearch"
                        />
          
                    </div>
                </div>
                <router-link to="/cart" class="cta-button">
                    <img src="/Images/cart.svg" alt="Giỏ hàng" class="cart-image">
                    <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
                </router-link>
                <div v-if="user" class="user-info">
                    <router-link to="/ComHoSo" class="user-profile">
                        <img :src="user.avatar || 'https://www.svgrepo.com/show/255146/profile-user.svg'" alt="Avatar" class="profile-pic">
                        <span class="profile-text">Profile</span>
                    </router-link>
                    <router-link to="/" @click="logout" class="auth-button logout" style="background: linear-gradient(135deg, #ff0000, #cc0000);">
                        <i class="fas fa-sign-out-alt"></i>
                        Đăng xuất
                    </router-link>
                </div>
                <template v-else>
                    <router-link to="/Register" class="auth-button register">
                        <i class="fas fa-user-plus"></i>
                        Đăng ký
                    </router-link> 
                    <router-link to="/Login" class="auth-button login">
                        <i class="fas fa-sign-in-alt"></i>
                        Đăng nhập
                    </router-link>
                </template>
            </div>
            <!-- đăng kí và đăng nhập -->
        </div> 
    </header>
    <router-view/>
</template>

<script>
import items from '@/data/items' // Import danh sách sản phẩm
import eventBus from '@/eventBus'

export default {
  data() {
    return {
        searchQuery: "", // Biến để lưu từ khóa tìm kiếm
        products: items,
        cartItemCount: 0,
        user: null
    };
  },
  methods: {
    performSearch() {
      if (this.searchQuery.trim() !== "") {
        this.$router.push({ path: '/search', query: { q: this.searchQuery } });
      }
    },
    logout() {
        if (confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
            localStorage.removeItem('currentuser');
            this.user = null;
            this.$router.push('/login');
        }
    }
  },
  mounted() {
      // Check for existing user session
      const currentUser = localStorage.getItem('currentuser');
      if (currentUser) {
          this.user = JSON.parse(currentUser);
      }

      // Listen for login events
      eventBus.on('loginSuccess', (user) => {
          this.user = user;
      });

      this.$nextTick(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      });
    }
}
</script>

<style>
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: linear-gradient(135deg, #000080, #000066); /* Thay đổi màu sang navy */
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

body {
    margin: 0;
    padding-top: 85px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 40px;
    height: 70px;
    white-space: nowrap;
}

.logo {
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
    gap: 15px;
}

.logo img {
    height: 46px; /* Giảm kích thước logo xuống 45px */
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.logo-text {
    color: white;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 1px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.logo img:hover {
    transform: scale(1.08) rotate(2deg);
}

nav {
    flex-grow: 1;
    white-space: nowrap;
}

nav ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
}

nav ul li {
    position: relative;  
    margin: 0 18px; 
}

.nav-link {
    text-decoration: none;
    color: #fff;
    font-weight: 600;
    padding: 10px 18px;
    border-radius: 8px;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    letter-spacing: 0.3px;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: translateY(-3px);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2.5px;
    background: #fff;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform: translateX(-50%);
    border-radius: 2px;
}

.nav-link:hover::after {
    width: 75%;
}

.dropdown-content {
    display: none;
    position: absolute;
    background: rgba(255, 255, 255, 0.98);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.18);
    min-width: 220px;
    top: 100%;
    left: 0;
    z-index: 1000;
    padding: 10px 0;
    margin-top: 8px;
    backdrop-filter: blur(10px);
}

.dropdown:hover .dropdown-content {
    display: block;
    animation: dropdownFade 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes dropdownFade {
    from {
        opacity: 0;
        transform: translateY(-12px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dropdown-content li {
    padding: 0;
    margin: 5px 0;
}

.dropdown-content li a {
    color: #2c3e50;
    padding: 12px 25px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    font-weight: 500;
}

.dropdown-content li:last-child a {
    border-bottom: none;
}

.dropdown-content li a:hover {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    color: #000080; /* Thay đổi màu hover sang navy */
    padding-left: 30px;
}

.menu-icon {
    width: 22px;
    height: 22px;
    object-fit: contain;
}

.cta {
    display: flex;
    align-items: center;
    gap: 20px;
    white-space: nowrap;
}

.search-container {
    position: relative;
    margin-right: 15px;
}

.search-wrapper {
    position: relative;
}

.search-input {
    background: rgba(255, 255, 255, 0.95);
    border: none;
    color: #2c3e50;
    padding: 12px 45px 12px 20px;
    border-radius: 25px;
    width: 260px;
    font-size: 14px;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

.search-input:focus {
    outline: none;
    width: 300px;
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.15);
    background: #fff;
}

.search-input::placeholder {
    color: #95a5a6;
    font-style: italic;
}

.search-hint {
    position: absolute;
    top: 100%;
    left: 0;
    background: rgba(255, 255, 255, 0.98);
    padding: 10px 15px;
    border-radius: 12px;
    margin-top: 8px;
    font-size: 13px;
    color: #7f8c8d;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    width: 250px;
    z-index: 1000;
}

.cta-button {
    position: relative;
    background: rgba(255, 255, 255, 0.18);
    padding: 12px;
    border-radius: 50%;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.cta-button:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px);
}

.cart-image {
    width: 32px; 
    height: 32px; 
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cta-button:hover .cart-image {
    transform: scale(1.12);
}

.cart-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #ff4757;
    color: #fff;
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 12px;
    min-width: 20px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(255,71,87,0.3);
    font-weight: 600;
}

.auth-buttons {
    display: flex;
    gap: 15px;
    margin-right: 35px;
    padding: 0 15px 8px;
}

.auth-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-size: 14px;
    position: relative;
    overflow: hidden;
}

.auth-button i {
    font-size: 16px;
    transition: transform 0.4s ease;
}

.auth-button.register {
    background: linear-gradient(135deg, #000080, #000066); /* Thay đổi màu sang navy */
    color: white;
    border: 2px solid rgba(255,255,255,0.2);
}

.auth-button.login {
    background: linear-gradient(135deg, #000080, #000066); /* Thay đổi màu sang navy */
    color: white;
    border: 2px solid rgba(255,255,255,0.2);
}

.auth-button.logout {
    background: linear-gradient(135deg, #ff0000, #cc0000); /* Thay đổi màu sang đỏ */
    color: white;
    border: 2px solid rgba(255,255,255,0.2);
}

.auth-button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.auth-button:hover i {
    transform: translateX(3px) rotate(5deg);
}

.auth-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        120deg,
        transparent,
        rgba(255,255,255,0.3),
        transparent
    );
    transition: 0.6s;
}

.auth-button:hover::before {
    left: 100%;
}

.auth-button.register:hover {
    background: linear-gradient(135deg, #000066, #000033); /* Thay đổi màu hover sang navy đậm hơn */
}

.auth-button.login:hover {
    background: linear-gradient(135deg, #000066, #000033); /* Thay đổi màu hover sang navy đậm hơn */
}

.auth-button.logout:hover {
    background: linear-gradient(135deg, #cc0000, #990000); /* Thay đổi màu hover sang đỏ đậm hơn */
}

.user-info {
    display: flex;
    align-items: center;
    gap: 18px;
    color: white;
    font-weight: 500;
    white-space: nowrap;
}

.user-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
}

.profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.profile-text {
    color: white;
    font-size: 10px;
    margin-top: 2px;
    font-weight: 500;
}

@media (max-width: 768px) {
    .container {
        padding: 10px 20px;
    }
    
    nav ul li {
        margin: 0 8px;
    }
    
    .search-input {
        width: 180px;
    }
    
    .search-input:focus {
        width: 220px;
    }
    
    .search-hint {
        width: 160px;
    }
    
    .auth-button {
        padding: 8px 15px;
        font-size: 14px;
    }
}
</style>