<template>
  <div class="login-container">
    <h2>Đăng nhập</h2>
    <div class="form-group">
      <div class="input-group">
        <i class="fas fa-user"></i>
        <input 
          v-model="username"  
          placeholder="Tên đăng nhập" 
          class="form-input"
        />
      </div>
      <div class="input-group">
        <i class="fas fa-lock"></i>
        <input 
          v-model="password" 
          type="password" 
          placeholder="Mật khẩu" 
          class="form-input"
        />
      </div>
      <button @click="login" class="login-btn">
        <i class="fas fa-sign-in-alt"></i>
        Đăng nhập
      </button>
      <p v-if="error" class="error-message">{{error}}</p>
      <div class="register-link">
        Chưa có tài khoản? 
        <router-link to="/register">Đăng ký ngay</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import users from '@/data/users'
import eventBus from '@/eventBus'
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      users: users
    };
  },
  methods:{
    login() {
      if (!this.username || !this.password) {
        this.error = "Vui lòng nhập đầy đủ thông tin";
        return;
      }

      const user = this.users.find(x => x.username === this.username && x.password === this.password)
      if (user) {
        localStorage.setItem('currentuser', JSON.stringify(user))
        eventBus.emit('loginSuccess', user)
        this.$router.push('/')
      } else {
        this.error = "Tên đăng nhập hoặc mật khẩu không chính xác";
      }
    }
  }
};
</script>

<style>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  margin-top: 100px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  position: relative;
}

.input-group i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.form-input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 3px rgba(33,150,243,0.2);
}

.login-btn {
  background: #2196F3;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.login-btn:hover {
  background: #1976D2;
  transform: translateY(-1px);
}

.login-btn:active {
  transform: translateY(1px);
}

.error-message {
  color: #dc3545;
  text-align: center;
  font-size: 14px;
  background: #ffe6e6;
  padding: 10px;
  border-radius: 4px;
}

.register-link {
  text-align: center;
  color: #666;
}

.register-link a {
  color: #2196F3;
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
