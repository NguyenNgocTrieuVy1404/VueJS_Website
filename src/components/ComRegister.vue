<template>
  <div class="register-container">
    <h2>Đăng ký tài khoản</h2>
    <div class="form-group">
      <input v-model="fullName" placeholder="Họ và tên" class="form-input" />
      <input v-model="email" placeholder="Email" class="form-input" />
      <input v-model="phone" placeholder="Số điện thoại" class="form-input" />
      <input v-model="username" placeholder="Tên đăng nhập" class="form-input" />
      <input v-model="password" type="password" placeholder="Mật khẩu" class="form-input" />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Xác nhận mật khẩu"
        class="form-input"
      />
      <button @click="register" class="register-btn">Đăng ký</button>
    </div>
    <p v-if="error" class="error-message">{{error}}</p>
  </div>
</template>

<script>
import users from '@/data/users'
export default {
  data() {
    return {
      fullName: "",
      email: "",
      phone: "",
      username: "",
      password: "", 
      confirmPassword: "",
      error: "",
      users: users
    };
  },
  methods:{
    register() {
        // Validate required fields
        if (!this.fullName || !this.email || !this.phone || !this.username || !this.password) {
            this.error = "Vui lòng điền đầy đủ thông tin"
            return
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(this.email)) {
            this.error = "Email không hợp lệ"
            return
        }

        // Validate phone number
        const phoneRegex = /^[0-9]{10}$/
        if (!phoneRegex.test(this.phone)) {
            this.error = "Số điện thoại không hợp lệ"
            return
        }

        // Check password confirmation
        if(this.password !== this.confirmPassword) {
            this.error = "Mật khẩu không trùng khớp"
            return
        }

        // Check if username exists
        const existingUser = this.users.find(x => x.username === this.username)
        if(existingUser) {
            this.error = "Tên đăng nhập đã tồn tại"
            return
        }

        // Create new user
        const newUser = {
            id: this.users.length + 1,
            fullName: this.fullName,
            email: this.email,
            phone: this.phone,
            username: this.username,
            password: this.password
        }

        this.users.push(newUser)
        
        // Save to localStorage
        const users = JSON.parse(localStorage.getItem('users')) || []
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))

        alert('Đăng ký thành công')
        
        // Reset form
        this.fullName = ''
        this.email = ''
        this.phone = ''
        this.username = ''
        this.password = ''
        this.confirmPassword = ''
        this.error = ''
        
        // Redirect to login
        this.$router.push('/login')
    }
  }
};
</script>

<style>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3); /* Tăng độ đậm của shadow */
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-input:focus {
  outline: none;
  border-color: #4CAF50;
}

.register-btn {
  background: #2196F3; /* Đổi màu nút sang xanh dương */
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.register-btn:hover {
  background: #1976D2; /* Màu hover tối hơn */
}

.error-message {
  color: #f44336;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}
</style>