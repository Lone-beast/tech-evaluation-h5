<template>
  <div class="question-page">
    <!-- 顶部导航 -->
    <header class="navbar">
      <div class="navbar-container">
        <button
          v-if="evaluation.currentQuestionIndex > 0"
          class="back-button"
          @click="handlePrev"
          aria-label="返回上一题"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="page-title">天赋探索评测</h1>
        <div class="spacer"></div>
      </div>

      <!-- 进度条 -->
      <div class="progress-section">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: evaluation.progress + '%' }"
          ></div>
        </div>
        <div class="progress-label">
          {{ evaluation.currentQuestionIndex + 1 }} / {{ evaluation.totalQuestions }}
        </div>
      </div>
    </header>

    <!-- 问题内容区 -->
    <main class="question-main">
      <transition name="question-slide" mode="out-in">
        <div
          :key="evaluation.currentQuestionIndex"
          class="question-wrapper"
        >
          <!-- 鼓励语（里程碑） -->
          <div v-if="encouragementMessage" class="encouragement-banner">
            <div class="banner-icon">🎉</div>
            <div class="banner-text">{{ encouragementMessage }}</div>
          </div>

          <!-- 问题标题 -->
          <section class="question-section">
            <h2 class="question-title">
              {{ evaluation.currentQuestion?.title }}
            </h2>
            <!-- 维度提示（能力题时显示） -->
            <div v-if="currentDimension" class="dimension-hint">
              <span class="dimension-icon">{{ currentDimension.icon }}</span>
              <span class="dimension-text">正在评估：{{ currentDimension.name }}</span>
            </div>
          </section>

          <!-- 选项列表 -->
          <section class="options-section">
            <div class="options-grid">
              <div
                v-for="(option, index) in evaluation.currentQuestion?.options"
                :key="option.value"
                class="option-card"
                :class="{ 'selected': isSelected(option.value) }"
                @click="handleSelect(option, index)"
                :style="{ '--delay': index * 0.05 + 's' }"
              >
                <div class="option-radio">
                  <div v-if="isSelected(option.value)" class="radio-dot"></div>
                </div>
                <span class="option-text">{{ option.label }}</span>
              </div>
            </div>
          </section>
        </div>
      </transition>
    </main>

    <!-- 底部按钮区 -->
    <footer class="footer">
      <button
        class="next-button"
        :disabled="!canGoNext"
        :class="{ 'disabled': !canGoNext }"
        @click="handleNext"
      >
        <span v-if="evaluation.currentQuestionIndex < evaluation.totalQuestions - 1">
          下一题
        </span>
        <span v-else>查看评测结果</span>
        <svg class="button-arrow" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 9h10m-5-5l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEvaluationStore } from '../stores/evaluation'

const evaluation = useEvaluationStore()

// 当前选中的值（单选）
const selectedValue = ref(null)

// 当前选中的值（多选）
const selectedValues = ref([])

// 维度信息映射
const dimensionInfo = {
  logic: { name: '逻辑推理', icon: '🧠', description: '分析思考、因果判断' },
  creative: { name: '创意创造', icon: '💡', description: '创新思维、想象能力' },
  spatial: { name: '空间想象', icon: '🔷', description: '图形理解、立体思维' },
  focus: { name: '专注坚持', icon: '🎯', description: '目标导向、抗挫折力' },
  communication: { name: '协作沟通', icon: '👥', description: '团队合作、表达能力' },
  observation: { name: '观察探索', icon: '🔍', description: '细节敏感、好奇心' }
}

// 鼓励语（根据进度显示）
const encouragementMessage = computed(() => {
  const progress = evaluation.progress
  const currentIndex = evaluation.currentQuestionIndex

  if (currentIndex === 0) return null
  if (progress === 25) return '太棒了！继续探索孩子的潜力...'
  if (progress === 50) return '已完成一半！让我们更深入地了解...'
  if (progress === 75) return '最后几题了，马上就能看到结果！'
  if (progress === 90) return '精彩！马上就能发现孩子的天赋了！'

  return null
})

// 当前维度信息
const currentDimension = computed(() => {
  const dimension = evaluation.currentQuestion?.dimension
  return dimension ? dimensionInfo[dimension] : null
})

// 是否可以进入下一题
const canGoNext = computed(() => {
  if (evaluation.currentQuestion?.isMultiple) {
    return selectedValues.value.length > 0
  }
  return selectedValue.value !== null
})

// 判断选项是否被选中
function isSelected(value) {
  if (evaluation.currentQuestion?.isMultiple) {
    return selectedValues.value.includes(value)
  }
  return selectedValue.value === value
}

// 处理选项选择
function handleSelect(option, index) {
  if (evaluation.currentQuestion?.isMultiple) {
    // 多选逻辑
    const idx = selectedValues.value.indexOf(option.value)
    if (idx > -1) {
      selectedValues.value.splice(idx, 1)
    } else {
      selectedValues.value.push(option.value)
    }
    evaluation.setAnswer(evaluation.currentQuestion.id, [...selectedValues.value])
  } else {
    // 单选逻辑
    selectedValue.value = option.value
    evaluation.setAnswer(evaluation.currentQuestion.id, option.value)

    // 自动进入下一题（平滑体验）
    setTimeout(() => {
      handleNext()
    }, 250)
  }
}

// 下一题
function handleNext() {
  if (!canGoNext.value) return

  // 重置选择
  selectedValue.value = null
  selectedValues.value = []

  evaluation.nextQuestion()
}

// 上一题
function handlePrev() {
  evaluation.prevQuestion()

  // 重新设置已选值
  const currentId = evaluation.currentQuestion?.id
  if (evaluation.currentQuestion?.isMultiple) {
    selectedValues.value = evaluation.answers[currentId] || []
  } else if (currentId === 2) {
    selectedValue.value = evaluation.hasCodingExperience
  } else if (currentId === 1) {
    selectedValue.value = evaluation.grade
  } else {
    selectedValue.value = null
  }
}
</script>

<style scoped>
.question-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-secondary);
}

/* 导航栏 */
.navbar {
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-gray-200);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  margin-bottom: var(--space-4);
}

.back-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-base);
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
}

.back-button:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

.back-button:active {
  transform: scale(0.96);
}

.page-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
  flex: 1;
  text-align: center;
}

.spacer {
  width: 40px;
}

/* 进度条 */
.progress-section {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0 var(--space-5) var(--space-4);
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--color-gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%);
  border-radius: var(--radius-full);
  transition: width var(--transition-slow) cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: progressShimmer 2s infinite;
}

@keyframes progressShimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  min-width: 48px;
  text-align: right;
}

/* 主内容区 */
.question-main {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-6) var(--space-5);
}

.question-wrapper {
  max-width: 640px;
  margin: 0 auto;
}

/* 鼓励语横幅 */
.encouragement-banner {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  border: 1.5px solid #FCD34D;
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-6);
  animation: slideDown 0.5s ease-out;
  box-shadow: 0 4px 12px rgba(252, 211, 77, 0.3);
}

.banner-icon {
  font-size: 24px;
  flex-shrink: 0;
  animation: bounce 1s ease-in-out infinite;
}

.banner-text {
  flex: 1;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: #92400E;
  line-height: var(--line-height-tight);
}

/* 问题标题 */
.question-section {
  margin-bottom: var(--space-8);
}

.question-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4);
}

/* 维度提示 */
.dimension-hint {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: linear-gradient(135deg, rgba(15, 76, 129, 0.06) 0%, rgba(245, 158, 11, 0.06) 100%);
  border: 1px solid rgba(15, 76, 129, 0.1);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  animation: fadeIn 0.4s ease-out;
}

.dimension-icon {
  font-size: var(--font-size-lg);
}

.dimension-text {
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
}

/* 选项区域 */
.options-section {
  margin-bottom: var(--space-16);
}

.options-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.option-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--color-bg-primary);
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  animation: fadeInUp var(--transition-slow) ease-out both;
  animation-delay: var(--delay);
  position: relative;
  overflow: hidden;
}

.option-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(15, 76, 129, 0.03) 0%, rgba(15, 76, 129, 0.05) 100%);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.option-card:hover {
  border-color: var(--color-gray-300);
  background: var(--color-bg-secondary);
  transform: translateX(4px);
}

.option-card:hover::before {
  opacity: 1;
}

.option-card.selected {
  border-color: var(--color-primary);
  background: linear-gradient(135deg, #F0F7FF 0%, #E6F2FF 100%);
  box-shadow: 0 4px 16px rgba(15, 76, 129, 0.12);
  transform: translateX(4px);
}

.option-card.selected::before {
  opacity: 1;
}

.option-card:active {
  transform: translateX(4px) scale(0.99);
}

.option-radio {
  width: 22px;
  height: 22px;
  border: 2.5px solid var(--color-gray-300);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--transition-fast);
  position: relative;
  background: var(--color-bg-primary);
}

.option-card:hover .option-radio {
  border-color: var(--color-primary);
  transform: scale(1.05);
}

.option-card.selected .option-radio {
  border-color: var(--color-primary);
  border-width: 2.5px;
  background: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(15, 76, 129, 0.1);
}

.radio-dot {
  width: 10px;
  height: 10px;
  background: var(--color-white);
  border-radius: 50%;
  animation: scaleIn var(--transition-fast) ease-out;
}

.option-text {
  flex: 1;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
}

/* 底部按钮 */
.footer {
  background: var(--color-bg-primary);
  border-top: 1px solid var(--color-gray-200);
  padding: var(--space-4) var(--space-5);
  padding-bottom: max(var(--space-4), env(safe-area-inset-bottom));
}

.next-button {
  width: 100%;
  max-width: 400px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  margin: 0 auto;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-lg);
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-base);
}

.next-button:hover:not(.disabled) {
  background: var(--color-primary-light);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.next-button:active:not(.disabled) {
  transform: translateY(0);
}

.next-button.disabled {
  background: var(--color-gray-200);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
  box-shadow: none;
}

.button-arrow {
  transition: transform var(--transition-base);
}

.next-button:hover:not(.disabled) .button-arrow {
  transform: translateX(2px);
}

/* 问题切换动画 */
.question-slide-enter-active,
.question-slide-leave-active {
  transition: all var(--transition-base);
}

.question-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.question-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
  position: absolute;
  width: 100%;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
