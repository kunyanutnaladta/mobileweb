<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-card>
        <ion-card-header>
          <ion-card-title>User Info</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <!-- ถ้ายังไม่ login -->
          <div v-if="!user">
            <p>Not logged in</p>
            <ion-button expand="block" @click="goLogin">
              Login
            </ion-button>
          </div>

          <!-- ถ้า login แล้ว -->
          <div v-else>
            <p><strong>UID:</strong> {{ user.uid }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Phone:</strong> {{ user.phoneNumber }}</p>
            <p><strong>Name:</strong> {{ user.displayName }}</p>
          </div>
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/vue';

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/auth/auth-service';

const router = useRouter();
const user = ref<any>(null);

onMounted(async () => {
  user.value = await authService.getCurrentUser();
});

function goLogin() {
  router.push('/login');
}
</script>
