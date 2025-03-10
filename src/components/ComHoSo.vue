<template>
    <div class="profile-container">
        <div class="profile-header">
            <h2>Hồ Sơ Của Tôi</h2>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        
        <div class="profile-content">
            <div class="profile-info">
                <div class="info-group">
                    <label>Họ và tên:</label>
                    <input type="text" v-model="userInfo.fullName" :disabled="!isEditing">
                </div>
                
                <div class="info-group">
                    <label>Email:</label>
                    <input type="email" v-model="userInfo.email" disabled>
                </div>
                
                <div class="info-group">
                    <label>Số điện thoại:</label>
                    <input type="tel" v-model="userInfo.phone" :disabled="!isEditing">
                </div>
                
                <div class="info-group">
                    <label>Địa chỉ:</label>
                    <textarea v-model="userInfo.address" :disabled="!isEditing"></textarea>
                </div>

                <div class="button-group">
                    <button v-if="!isEditing" @click="startEditing" class="edit-btn">
                        <i class="fas fa-edit"></i> Chỉnh sửa
                    </button>
                    <template v-else>
                        <button @click="saveChanges" class="save-btn">
                            <i class="fas fa-save"></i> Lưu thay đổi
                        </button>
                        <button @click="cancelEditing" class="cancel-btn">
                            <i class="fas fa-times"></i> Hủy
                        </button>
                    </template>
                </div>
            </div>
            
            <div class="profile-avatar">
                <img :src="userInfo.avatar || 'https://www.svgrepo.com/show/255146/profile-user.svg'" alt="Avatar">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isEditing: false,
            userInfo: {
                fullName: '',
                email: '',
                phone: '',
                address: '',
                avatar: ''
            },
            originalInfo: null
        }
    },
    mounted() {
        // Lấy thông tin user từ localStorage ngay khi component được tạo
        this.loadUserInfo();
    },
    methods: {
        loadUserInfo() {
            const currentUser = localStorage.getItem('currentuser');
            if (currentUser) {
                const userData = JSON.parse(currentUser);
                this.userInfo = {
                    fullName: userData.fullName || '',
                    email: userData.email || '',
                    phone: userData.phone || '',
                    address: userData.address || '',
                    avatar: userData.avatar || 'https://www.svgrepo.com/show/255146/profile-user.svg'
                };
                this.originalInfo = { ...this.userInfo };
            }
        },
        startEditing() {
            this.isEditing = true;
            this.originalInfo = { ...this.userInfo };
        },
        async saveChanges() {
            try {
                // Lưu thông tin mới vào localStorage
                const currentUser = JSON.parse(localStorage.getItem('currentuser'));
                const updatedUser = {
                    ...currentUser,
                    ...this.userInfo
                };
                localStorage.setItem('currentuser', JSON.stringify(updatedUser));
                this.isEditing = false;
                alert('Cập nhật thông tin thành công!');
            } catch (error) {
                alert('Có lỗi xảy ra khi cập nhật thông tin!');
                console.error(error);
            }
        },
        cancelEditing() {
            this.userInfo = { ...this.originalInfo };
            this.isEditing = false;
        }
    }
}
</script>

<style scoped>
.profile-container {
    max-width: 1000px;
    margin: 40px auto;
    padding: 30px;
    background: linear-gradient(135deg, #fff, #f8f9fa);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.profile-header {
    padding: 30px;
    border-bottom: 2px solid #eee;
    text-align: center;
    background: linear-gradient(45deg, #000080, #1a237e);
    border-radius: 15px;
    margin-bottom: 30px;
}

.profile-header h2 {
    color: #fff;
    font-size: 2.5em;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.profile-header p {
    color: #fff;
    font-size: 1.1em;
    opacity: 0.9;
}

.profile-content {
    display: flex;
    padding: 40px;
    gap: 50px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.profile-info {
    flex: 1;
}

.info-group {
    margin-bottom: 25px;
    transition: all 0.3s ease;
}

.info-group:hover {
    transform: translateY(-2px);
}

.info-group label {
    display: block;
    margin-bottom: 10px;
    color: #000080;
    font-weight: 600;
    font-size: 1.1em;
}

.info-group input,
.info-group textarea {
    width: 100%;
    padding: 15px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    font-size: 1em;
    transition: all 0.3s ease;
    background: #fff;
}

.info-group input:focus,
.info-group textarea:focus {
    border-color: #000080;
    box-shadow: 0 0 10px rgba(0,0,128,0.1);
}

.info-group input:disabled,
.info-group textarea:disabled {
    background-color: #f8f9fa;
    border-color: #e9ecef;
}

.profile-avatar {
    width: 250px;
    text-align: center;
    padding: 20px;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.profile-avatar img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #000080;
    padding: 5px;
    background: #fff;
    transition: all 0.3s ease;
}

.profile-avatar img:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0,0,128,0.2);
}

.button-group {
    margin-top: 40px;
    display: flex;
    gap: 20px;
    justify-content: flex-start;
}

.edit-btn,
.save-btn,
.cancel-btn {
    padding: 12px 30px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1em;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.edit-btn {
    background: linear-gradient(45deg, #000080, #1a237e);
    color: white;
}

.save-btn {
    background: linear-gradient(45deg, #28a745, #218838);
    color: white;
}

.cancel-btn {
    background: linear-gradient(45deg, #dc3545, #c82333);
    color: white;
}

.edit-btn:hover,
.save-btn:hover,
.cancel-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* Animation cho loading state */
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .profile-content {
        flex-direction: column-reverse;
        padding: 20px;
    }
    
    .profile-avatar {
        width: 100%;
        margin-bottom: 30px;
    }

    .button-group {
        justify-content: center;
    }
}
</style> 