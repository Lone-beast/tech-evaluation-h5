<template>
  <div class="app-container">
    <!-- 启动页 -->
    <transition name="fade">
      <SplashPage v-if="showSplash" @start="handleStart" />
    </transition>

    <!-- 评测页面 -->
    <transition :name="transitionName" mode="out-in">
      <QuestionPage v-if="!showSplash && !evaluationStore.showResult" />
      <ResultPage v-else-if="!showSplash && evaluationStore.showResult" />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEvaluationStore } from './stores/evaluation'
import SplashPage from './components/SplashPage.vue'
import QuestionPage from './components/QuestionPage.vue'
import ResultPage from './components/ResultPage.vue'

const evaluationStore = useEvaluationStore()
const showSplash = ref(true)
const transitionName = ref('slide-in-right')

function handleStart() {
  showSplash.value = false
}
</script>

<style>
.app-container {
  min-height: 100vh;
  background: var(--white);
  position: relative;
}

/* 页面切换动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-in-left-enter-active, .slide-in-left-leave-active,
.slide-in-right-enter-active, .slide-in-right-leave-active {
  transition: all 0.4s ease;
}
.slide-in-left-enter-from { transform: translateX(100%); }
.slide-in-left-leave-to { transform: translateX(-30%); opacity: 0; }
.slide-in-right-enter-from { transform: translateX(-100%); }
.slide-in-right-leave-to { transform: translateX(30%); opacity: 0; }
</style>
