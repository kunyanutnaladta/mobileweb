<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Workout Summary</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>สรุปผลการออกกำลังกาย</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <p>รอบทั้งหมด: {{ stats.repsTotal }}</p>
          <p>รอบถูก: {{ stats.repsOk }}</p>
          <p>รอบผิด: {{ stats.repsBad }}</p>
          <p>คะแนน: {{ stats.score }}</p>
          <p>Tempo เฉลี่ย: {{ stats.avgRepMs }} ms</p>
          <p>
            Percent ถูก:
            {{
              stats.repsTotal
                ? Math.round((stats.repsOk / stats.repsTotal) * 100)
                : 0
            }}%
          </p>
        </ion-card-content>
      </ion-card>

      <ion-button expand="block" router-link="/home">
        กลับหน้าแรก
      </ion-button>
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
} from '@ionic/vue'
import { ArmWorkoutEngine } from "../core/ArmWorkoutEngine"
import { engine } from "../core/workoutStore"

const stats = engine.state.stats


</script>