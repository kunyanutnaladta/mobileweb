<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lab08: Gemini Vision</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- input file -->
      <input
        ref="fileEl"
        type="file"
        accept="image/*"
        hidden
        @change="onFileChange"
      />

      <ion-button expand="block" @click="fileEl?.click()">
        เลือกไฟล์ภาพ
      </ion-button>

      <ion-button expand="block" @click="onTakePhoto">
        ถ่ายภาพ (Camera)
      </ion-button>

      <!-- ✅ ใช้ img ธรรมดาแทน ion-img -->
      <img
        v-if="previewUrl"
        :src="previewUrl"
        class="preview-img"
      />

      <ion-button
        expand="block"
        :disabled="!img || loading"
        @click="onAnalyze"
      >
        วิเคราะห์ภาพ
      </ion-button>

      <ion-spinner v-if="loading" />

      <!-- แสดงผลลัพธ์ -->
      <ion-card v-if="result">
        <ion-card-header>
          <ion-card-title>ผลการวิเคราะห์</ion-card-title>
        </ion-card-header>

        <ion-card-content>

          <p><strong>คำอธิบายภาพ:</strong></p>
          <p>{{ result.caption }}</p>

          <p><strong>Tags:</strong></p>
          <ion-chip v-for="tag in result.tags" :key="tag">
            <ion-label>{{ tag }}</ion-label>
          </ion-chip>

          <div v-if="result.objects?.length">
            <p><strong>วัตถุที่ตรวจพบ:</strong></p>
            <ul>
              <li v-for="obj in result.objects" :key="obj.name">
                {{ obj.name }}
                <span v-if="obj.confidence">
                  ({{ (obj.confidence * 100).toFixed(0) }}%)
                </span>
              </li>
            </ul>
          </div>

          <div v-if="result.safety">
            <p><strong>ความปลอดภัย:</strong></p>
            <p>
              {{ result.safety.isSensitive ? "⚠️ อาจเป็นภาพอ่อนไหว" : "✅ ปลอดภัย" }}
            </p>
            <p v-if="result.safety.notes">
              {{ result.safety.notes }}
            </p>
          </div>

        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonLabel
} from "@ionic/vue";

import { PhotoService } from "../core/photo.service";
import { GeminiVisionService } from "../core/gemini.service";
import type { Base64Image, ImageAnalysisResult } from "../core/ai.interface";

const fileEl = ref<HTMLInputElement | null>(null);
const img = ref<Base64Image | null>(null);
const previewUrl = ref("");
const result = ref<ImageAnalysisResult | null>(null);
const loading = ref(false);

async function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  img.value = await PhotoService.fromFile(file);
  previewUrl.value = URL.createObjectURL(file);
  result.value = null;
}

async function onTakePhoto() {
  loading.value = true;
  try {
    const b64 = await PhotoService.fromCamera();
    img.value = b64;
    previewUrl.value = `data:${b64.mimeType};base64,${b64.base64}`;
    result.value = null;
  } finally {
    loading.value = false;
  }
}

async function onAnalyze() {
  if (!img.value) return;

  loading.value = true;
  try {
    result.value = await GeminiVisionService.analyze(img.value);
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการวิเคราะห์ภาพ");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.preview-img {
  max-height: 200px;      /* 🔥 คุมความสูงรูป */
  width: 100%;
  object-fit: contain;
  border-radius: 12px;
  margin: 12px 0;
  display: block;
}

ion-card {
  margin-top: 16px;
}
</style>
<style scoped>
.preview-img {
  width: 100%;
  max-height: 180px;   /* มือถือ */
  object-fit: contain;
  border-radius: 12px;
  margin: 12px 0;
  display: block;
}

/* Tablet */
@media (min-width: 600px) {
  .preview-img {
    max-height: 250px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .preview-img {
    max-height: 320px;
  }
}

ion-card {
  margin-top: 16px;
}
</style>