<template>
  <div class="result-page">
    <!-- 顶部标题区 -->
    <header class="result-header">
      <div class="header-background">
        <div class="gradient-fill"></div>
      </div>
      <div class="header-content">
        <div class="report-badge">评测报告</div>
        <h1 class="main-title">科技特长生<br>成长规划报告</h1>
        <p class="report-type">{{ evaluation.evaluationResult?.type }}</p>
      </div>
    </header>

    <!-- 内容区域 -->
    <main class="result-main">
      <!-- 编程适配度 -->
      <section class="score-section">
        <div class="section-card">
          <h3 class="section-title">编程适配度分析</h3>
          <div class="score-display">
            <div class="score-value">{{ evaluation.evaluationResult?.programmingMatch?.score || 0 }}</div>
            <div class="score-label">适配评分</div>
          </div>
          <div class="stars-display">
            <span
              v-for="i in 5"
              :key="i"
              class="star"
              :class="{ 'active': i <= (evaluation.evaluationResult?.programmingMatch?.stars || 0) }"
            >★</span>
          </div>
          <div class="recommendation">
            <span class="recommend-label">推荐课程</span>
            <span class="recommend-value">{{ evaluation.evaluationResult?.recommendedCourse?.course }}</span>
          </div>
        </div>
      </section>

      <!-- 能力雷达图 -->
      <section class="radar-section">
        <div class="section-card">
          <h3 class="section-title">六大核心能力</h3>
          <div class="radar-chart-container">
            <div ref="radarChartRef" class="radar-chart"></div>
          </div>
          <div class="dimensions-list">
            <div
              v-for="(score, dimension) in evaluation.evaluationResult?.dimensions"
              :key="dimension"
              class="dimension-item"
            >
              <span class="dimension-name">{{ getDimensionName(dimension) }}</span>
              <div class="dimension-bar-bg">
                <div class="dimension-bar-fill" :style="{ width: score + '%' }"></div>
              </div>
              <span class="dimension-score">{{ score }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 编程学习经历 -->
      <section v-if="evaluation.evaluationResult?.hasCodingExperience" class="experience-section">
        <div class="section-card">
          <h3 class="section-title">编程学习经历</h3>
          <div class="experience-list">
            <div class="experience-row">
              <span class="experience-label">已学习课程</span>
              <span class="experience-value">{{ evaluation.evaluationResult?.codingCourses?.join('、') }}</span>
            </div>
            <div class="experience-row">
              <span class="experience-label">学习时长</span>
              <span class="experience-value">{{ getDurationText(evaluation.evaluationResult?.codingDuration) }}</span>
            </div>
            <div v-if="evaluation.evaluationResult?.cspAward" class="experience-row highlight">
              <span class="experience-label">获奖情况</span>
              <span class="experience-value">{{ evaluation.evaluationResult?.cspAward }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 学习建议 -->
      <section class="advice-section">
        <div class="section-card">
          <h3 class="section-title">专属学习建议</h3>
          <p class="advice-description">{{ evaluation.evaluationResult?.recommendedCourse?.reason }}</p>
          <div class="advice-list">
            <div class="advice-item">根据评测结果，为孩子定制个性化学习路径</div>
            <div class="advice-item">系统化学习，从基础到进阶稳步提升</div>
            <div class="advice-item">专业老师1对1指导，解决学习难题</div>
          </div>
        </div>
      </section>
    </main>

    <!-- 底部CTA -->
    <footer class="result-footer">
      <div class="footer-content">
        <h3 class="cta-title">免费领取编程体验课</h3>
        <p class="cta-subtitle">根据评测结果，为孩子定制专属学习方案</p>
        <button class="cta-button" @click="handleClaim">
          立即领取学习方案
        </button>
        <div class="trust-info">
          已有13,000+孩子完成评测
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useEvaluationStore } from '../stores/evaluation'
import * as echarts from 'echarts'

const evaluation = useEvaluationStore()
const radarChartRef = ref(null)

onMounted(async () => {
  await nextTick()
  initRadarChart()
})

function initRadarChart() {
  if (!radarChartRef.value || !evaluation.evaluationResult) return

  const chart = echarts.init(radarChartRef.value)

  const dimensions = evaluation.evaluationResult.dimensions
  const data = [
    {
      value: [
        dimensions.logic,
        dimensions.creative,
        dimensions.spatial,
        dimensions.focus,
        dimensions.communication,
        dimensions.observation
      ],
      name: '能力评估',
      areaStyle: {
        color: 'rgba(15, 76, 129, 0.2)'
      }
    }
  ]

  const option = {
    radar: {
      indicator: [
        { name: '逻辑推理', max: 100 },
        { name: '创意创造', max: 100 },
        { name: '空间想象', max: 100 },
        { name: '专注坚持', max: 100 },
        { name: '协作沟通', max: 100 },
        { name: '观察探索', max: 100 }
      ],
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: '#374151',
        fontSize: 13,
        fontWeight: 600,
        fontFamily: 'Noto Sans SC, PingFang SC, sans-serif'
      },
      splitLine: {
        lineStyle: {
          color: '#E5E7EB',
          width: 1.5
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['#F9FAFB', '#FFFFFF']
        }
      },
      axisLine: {
        lineStyle: {
          color: '#E5E7EB',
          width: 1.5
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: data,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#0F4C81' },
              { offset: 1, color: '#F59E0B' }
            ]
          }
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(15, 76, 129, 0.25)' },
              { offset: 1, color: 'rgba(245, 158, 11, 0.15)' }
            ]
          }
        },
        itemStyle: {
          color: '#0F4C81',
          borderColor: '#fff',
          borderWidth: 3,
          shadowColor: 'rgba(15, 76, 129, 0.3)',
          shadowBlur: 8,
          shadowOffsetY: 2
        },
        emphasis: {
          lineStyle: {
            width: 4
          },
          symbolSize: 10,
          itemStyle: {
            shadowColor: 'rgba(15, 76, 129, 0.5)',
            shadowBlur: 12
          }
        }
      }
    ]
  }

  chart.setOption(option)

  // 响应式
  window.addEventListener('resize', () => {
    chart.resize()
  })
}

function getDimensionName(key) {
  const names = {
    logic: '逻辑推理',
    creative: '创意创造',
    spatial: '空间想象',
    focus: '专注坚持',
    communication: '协作沟通',
    observation: '观察探索'
  }
  return names[key] || key
}

function getDurationText(duration) {
  const texts = {
    '<3': '3个月以内',
    '3-6': '3-6个月',
    '6-12': '6个月-1年',
    '>12': '1年以上'
  }
  return texts[duration] || duration
}

function handleClaim() {
  alert('领取功能：收集用户联系方式')
}
</script>

<style scoped>
.result-page {
  min-height: 100vh;
  background: var(--color-bg-secondary);
  padding-bottom: 240px;
}

/* 顶部标题区 */
.result-header {
  position: relative;
  padding: var(--space-10) var(--space-6) var(--space-16);
  overflow: hidden;
}

.header-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.gradient-fill {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary) 0%, #1a365d 100%);
}

.header-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
}

.report-badge {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-4);
}

.main-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-3);
  color: var(--color-white);
}

.report-type {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  margin: 0;
}

/* 主内容区 */
.result-main {
  padding: 0 var(--space-5);
  margin-top: calc(-1 * var(--space-8));
  position: relative;
  z-index: 2;
}

.section-card {
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  margin-bottom: var(--space-4);
  box-shadow: var(--shadow-sm);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-5);
}

/* 评分部分 */
.score-section {
  animation: fadeInUp 0.6s ease-out;
}

.score-display {
  text-align: center;
  padding: var(--space-6) 0;
}

.score-value {
  font-size: 72px;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-2);
  position: relative;
  display: inline-block;
  animation: scoreCountIn 1s ease-out;
}

.score-value::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%);
  border-radius: var(--radius-full);
}

.score-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.stars-display {
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

.star {
  font-size: 28px;
  color: var(--color-gray-200);
  transition: color var(--transition-base);
}

.star.active {
  color: var(--color-accent);
}

.recommendation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
}

.recommend-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.recommend-value {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

/* 雷达图部分 */
.radar-section {
  animation: fadeInUp 0.6s ease-out 0.1s both;
}

.radar-chart-container {
  width: 100%;
  height: 280px;
  margin-bottom: var(--space-5);
}

.radar-chart {
  width: 100%;
  height: 100%;
}

.dimensions-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.dimension-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.dimension-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  min-width: 80px;
}

.dimension-bar-bg {
  flex: 1;
  height: 6px;
  background: var(--color-gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.dimension-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%);
  border-radius: var(--radius-full);
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.dimension-bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

.dimension-score {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  min-width: 36px;
  text-align: right;
}

/* 学习经历 */
.experience-section {
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.experience-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
}

.experience-row.highlight {
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  border: 1px solid #FCD34D;
}

.experience-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.experience-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

/* 学习建议 */
.advice-section {
  animation: fadeInUp 0.6s ease-out 0.3s both;
}

.advice-description {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
  margin-bottom: var(--space-5);
}

.advice-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.advice-item {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
  padding-left: var(--space-5);
  position: relative;
}

.advice-item::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-success);
  font-weight: var(--font-weight-bold);
}

/* 底部CTA */
.result-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-bg-primary);
  border-top: 1px solid var(--color-gray-200);
  padding: var(--space-5);
  padding-bottom: max(var(--space-5), env(safe-area-inset-bottom));
  z-index: var(--z-fixed);
  box-shadow: var(--shadow-lg);
  animation: slideUp 0.6s ease-out;
}

.footer-content {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2);
}

.cta-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-4);
}

.cta-button {
  width: 100%;
  height: 52px;
  background: linear-gradient(135deg, var(--color-accent) 0%, #D97706 100%);
  color: var(--color-white);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);
  margin-bottom: var(--space-3);
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(245, 158, 11, 0.4);
}

.cta-button:active {
  transform: translateY(0);
}

.trust-info {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

/* 动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scoreCountIn {
  from {
    opacity: 0;
    transform: scale(0.5) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}
</style>
