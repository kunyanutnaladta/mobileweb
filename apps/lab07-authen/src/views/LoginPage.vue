<template>
  <ion-page>
    <ion-content class="login-wrapper" fullscreen>

      <div class="login-card">

        <!-- ฝั่งซ้าย -->
        <div class="login-left">
          <h1>WELCOME</h1>
          <p>Your headline name</p>
        </div>

        <!-- ฝั่งขวา -->
        <div class="login-right">
          <h2>Sign in</h2>

          <ion-item lines="none">
            <ion-input v-model="email" placeholder="Email"></ion-input>
          </ion-item>

          <ion-item lines="none">
            <ion-input v-model="password" type="password" placeholder="Password"></ion-input>
          </ion-item>

          <ion-button expand="block" class="main-btn" @click="loginEmail">
            Sign in
          </ion-button>

          <ion-button expand="block" fill="outline" @click="loginGoogle">
            Sign in with Google
          </ion-button>

          <div id="recaptcha-container"></div>

          <ion-item lines="none">
            <ion-input v-model="phone" placeholder="+668xxxxxxxx"></ion-input>
          </ion-item>

          <ion-button expand="block" fill="outline" @click="loginPhone">
            Login by Phone
          </ion-button>

          <ion-item lines="none">
            <ion-input v-model="code" placeholder="OTP Code"></ion-input>
          </ion-item>

          <ion-button expand="block" @click="confirmPhone">
            Confirm OTP
          </ion-button>

        </div>

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/auth/auth-service';

const router = useRouter();

const email = ref('');
const password = ref('');
const phone = ref('');
const code = ref('');
const verificationId = ref('');

async function loginEmail() {
  await authService.loginWithEmailPassword({
    email: email.value,
    password: password.value
  });
  router.push('/tabs/tab1');
}

async function loginGoogle() {
  await authService.loginWithGoogle();
  router.push('/tabs/tab1');
}

async function loginPhone() {
  const result = await authService.startPhoneLogin({
    phoneNumberE164: phone.value
  });
  verificationId.value = result.verificationId;
}

async function confirmPhone() {
  await authService.confirmPhoneCode({
    verificationId: verificationId.value,
    verificationCode: code.value
  });
  router.push('/tabs/tab1');
}
</script>

<style scoped>
.login-wrapper {
  --background: linear-gradient(135deg, #1e5fa8, #2e86de);

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
}

/* การ์ดกลางจอ */
.login-card {
  display: flex;
  width: 720px;
  max-width: 90%;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0,0,0,0.25);

  margin: 70px auto 0; /* ขยับลงจากด้านบน */
}

/* ฝั่งซ้าย */
.login-left {
  flex: 1;
  background: linear-gradient(135deg, #1e5fa8, #2e86de);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 40px;
}

.login-left h1 {
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 10px;
}

.login-left p {
  opacity: 0.9;
}

/* ฝั่งขวา */
.login-right {
  flex: 1;
  padding: 50px 40px;
}

.login-right h2 {
  margin-bottom: 20px;
  font-weight: 600;
}

/* ช่อง input */
ion-item {
  --background: #f3f5f9;
  border-radius: 10px;
  margin-bottom: 14px;
}

/* ปุ่มหลัก */
.main-btn {
  margin-top: 8px;
  margin-bottom: 12px;
  height: 44px;
  font-weight: 600;
}

/* ปุ่มอื่น */
ion-button {
  height: 44px;
  margin-bottom: 12px;
  border-radius: 10px;
}

/* มือถือ */
@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
  }

  .login-left {
    padding: 30px;
    text-align: center;
  }

  .login-right {
    padding: 30px 20px;
  }
}
</style>
