<template>
  <ion-page>

    <ion-header>
      <ion-toolbar>
        <ion-title>Lab09 Sensors</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- ตัวเลขรอบ -->
      <div style="text-align:center; margin-top:20px;">
        <h1 style="font-size:70px; margin:0;">
          {{ state?.repDisplay ?? 0 }}
        </h1>
        <p style="color:gray; margin-top:4px;">Repetitions</p>
      </div>

      <!-- ข้อความแจ้งเตือน -->
      <ion-card v-if="state?.stats.lastMessage">
        <ion-card-content style="text-align:center;">
          {{ state?.stats.lastMessage }}
        </ion-card-content>
      </ion-card>

      <!-- สถิติ -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>สถิติการออกกำลังกาย</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <p>คะแนน: {{ state?.stats.score ?? 0 }}</p>
          <p>รอบทั้งหมด: {{ state?.stats.repsTotal ?? 0 }}</p>
          <p>รอบถูก: {{ state?.stats.repsOk ?? 0 }}</p>
          <p>รอบผิด: {{ state?.stats.repsBad ?? 0 }}</p>
          <p>Tempo เฉลี่ย: {{ state?.stats.avgRepMs ?? 0 }} ms</p>
          <p>
            Percent ถูก:
            {{
              state?.stats.repsTotal
                ? Math.round((state.stats.repsOk / state.stats.repsTotal) * 100)
                : 0
            }}%
          </p>
        </ion-card-content>
      </ion-card>

      <!-- ปุ่ม -->
      <div style="margin-top:20px;">
        <ion-button expand="block" size="large" @click="start">
          START
        </ion-button>

        <ion-button
          expand="block"
          size="large"
          color="medium"
          @click="stop"
          style="margin-top:10px;"
        >
          STOP
        </ion-button>
      </div>

    </ion-content>

    <ion-footer class="ion-padding">
      663380202-1 นายกุญณัฐ นาลาดทา
    </ion-footer>

  </ion-page>
</template>


<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonFooter,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/vue'
import { ref, onMounted } from "vue";
import { MotionService } from "../core/MotionService";
import { TtsService } from "../core/TtsService";
import { HapticsService } from "../core/HapticsService";
import { ArmWorkoutEngine } from "../core/ArmWorkoutEngine";
import type { WorkoutState } from "../core/types";
import { useRouter } from 'vue-router'
import { engine } from "../core/workoutStore"
const router = useRouter()
const state = ref<WorkoutState | null>(null);


const motion = new MotionService();
const tts = new TtsService();
const haptic = new HapticsService();

onMounted(() => {
  engine.onChange(async (s) => {
    state.value = s;

    if (s.stats.lastMessage === "OK") {
      await tts.speak(String(s.repDisplay));
      await haptic.success();
    } else if (s.stats.lastMessage && s.stats.lastMessage !== "OK") {
      await tts.speak(s.stats.lastMessage);
      await haptic.warning();
    }
  });
});

async function start() {
  await tts.speak("เริ่มกายบริหารแขน ยกขึ้นจนสุดแล้วลดลง");
  engine.start();
  await motion.start((s) => engine.process(s));
}

async function stop() {
  await motion.stop()
  engine.stop()

  router.push('/stats')
}

</script>