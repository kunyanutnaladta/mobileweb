<template>
  <ion-page>
    <ion-content class="login-wrapper" fullscreen>

      <!-- container สำหรับจัดกลางจอ -->
      <div class="center-container">

        <div class="login-card">

          <!-- LEFT SIDE -->
          <div class="login-left">
            <h1>Welcome Back</h1>
            <p>Access your dashboard and manage everything in one place.</p>
          </div>

          <!-- RIGHT SIDE -->
          <div class="login-right">

            <h2>Sign in</h2>

            <!-- Email -->
            <ion-item lines="none">
              <ion-input v-model="email" placeholder="Email"></ion-input>
            </ion-item>

            <!-- Password -->
            <ion-item lines="none">
              <ion-input v-model="password" type="password" placeholder="Password"></ion-input>
            </ion-item>

            <!-- Login -->
            <ion-button expand="block" class="main-btn" @click="loginEmail">
              Sign in
            </ion-button>

            <!-- Divider -->
            <div class="divider">
              <span>OR</span>
            </div>

            <!-- Google -->
            <ion-button expand="block" fill="outline" @click="showGoogle = !showGoogle">
              Continue with Google
            </ion-button>

            <div v-if="showGoogle">
              <ion-button expand="block" class="google-btn" @click="loginGoogle">
                Login Google
              </ion-button>
            </div>

            <!-- Phone -->
            <ion-button expand="block" fill="outline" @click="showPhone = !showPhone">
              Continue with Phone
            </ion-button>

            <div v-if="showPhone">

              <div id="recaptcha-container"></div>

              <ion-item lines="none">
                <ion-input v-model="phone" placeholder="+668xxxxxxxx"></ion-input>
              </ion-item>

              <ion-button expand="block" @click="loginPhone">
                Send OTP
              </ion-button>

              <ion-item lines="none">
                <ion-input v-model="code" placeholder="OTP Code"></ion-input>
              </ion-item>

              <ion-button expand="block" @click="confirmPhone">
                Confirm OTP
              </ion-button>

            </div>

            <!-- Register -->
            <div class="register">
              Don't have an account?
              <span @click="goRegister">Create Account</span>
            </div>

          </div>

        </div>

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/auth/auth-service'

const router = useRouter()

const email = ref('')
const password = ref('')
const phone = ref('')
const code = ref('')
const verificationId = ref('')

const showGoogle = ref(false)
const showPhone = ref(false)

async function loginEmail() {
  await authService.loginWithEmailPassword({
    email: email.value,
    password: password.value
  })
  router.push('/tabs/tab1')
}

async function loginGoogle() {
  await authService.loginWithGoogle()
  router.push('/tabs/tab1')
}

async function loginPhone() {
  const result = await authService.startPhoneLogin({
    phoneNumberE164: phone.value
  })
  verificationId.value = result.verificationId
}

async function confirmPhone() {
  await authService.confirmPhoneCode({
    verificationId: verificationId.value,
    verificationCode: code.value
  })
  router.push('/tabs/tab1')
}

function goRegister(){
  router.push('/register')
}
</script>

<style scoped>

/* Background */

.login-wrapper{
  --background: linear-gradient(135deg,#1e3c72,#2a5298);
}

/* Center container */

.center-container{
  display:flex;
  justify-content:center;
  align-items:center;

  height:100vh;
  width:100%;
}

/* Login card */

.login-card{
  display:flex;

  width:850px;
  max-width:92%;

  background:white;

  border-radius:20px;

  overflow:hidden;

  box-shadow:0 35px 80px rgba(0,0,0,0.25);
}

/* LEFT */

.login-left{
  flex:1;

  background:linear-gradient(135deg,#2e86de,#4facfe);

  color:white;

  display:flex;
  flex-direction:column;
  justify-content:center;

  padding:60px 45px;
}

.login-left h1{
  font-size:36px;
  font-weight:700;
  margin-bottom:15px;
}

.login-left p{
  opacity:.9;
  line-height:1.6;
}

/* RIGHT */

.login-right{
  flex:1;
  padding:55px 45px;
}

.login-right h2{
  margin-bottom:25px;
  font-weight:600;
}

/* Input */

ion-item{
  --background:#f4f6fb;
  border-radius:12px;
  margin-bottom:14px;
}

/* Buttons */

ion-button{
  height:46px;
  border-radius:12px;
  margin-bottom:12px;
  font-weight:600;
}

.main-btn{
  --background:#2e86de;
}

.google-btn{
  --background:#ea4335;
  color:white;
}

/* Divider */

.divider{
  text-align:center;
  margin:20px 0;
  position:relative;
}

.divider span{
  background:white;
  padding:0 12px;
  color:#888;
  font-size:14px;
}

.divider:before{
  content:'';
  position:absolute;
  top:50%;
  left:0;
  width:100%;
  height:1px;
  background:#e2e6f0;
  z-index:-1;
}

/* Register */

.register{
  text-align:center;
  margin-top:22px;
  font-size:14px;
}

.register span{
  color:#2e86de;
  font-weight:600;
  cursor:pointer;
}

/* Mobile */

@media (max-width:768px){

.login-card{
flex-direction:column;
}

.login-left{
padding:35px;
text-align:center;
}

.login-right{
padding:35px 25px;
}

}

</style>