<template>
  <div class="splash-page">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="gradient-overlay"></div>
      <div class="geometric-pattern"></div>
      <!-- 添加漂浮元素 -->
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="content-wrapper">
      <!-- 品牌标识 -->
      <div class="brand-card">
        <header class="brand-section">
          <div class="brand-icon">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- 评测分析图标 - 大脑+数据图表 -->
              <rect width="48" height="48" rx="12" fill="currentColor"/>
              <!-- 大脑轮廓 -->
              <path d="M24 14C20 14 17 17 17 21V23H15C13.5 23 12.5 24.5 13 26L14.5 30C15 31.5 16.5 32 18 32H18.5C19 34 21 35 23 35H25C27 35 29 34 29.5 32H30C31.5 32 33 31.5 33.5 30L35 26C35.5 24.5 34.5 23 33 23H31V21C31 17 28 14 24 14Z" fill="white" fill-opacity="0.25"/>
              <!-- 数据图表线条 -->
              <path d="M18 26L22 22L26 26L30 20" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <!-- 数据点 -->
              <circle cx="22" cy="22" r="2" fill="white"/>
              <circle cx="26" cy="26" r="2" fill="white"/>
              <circle cx="30" cy="20" r="2" fill="white"/>
            </svg>
          </div>
          <div class="brand-badge">🔥 热门评测</div>
          <h1 class="brand-title">发现孩子的编程天赋</h1>
          <p class="brand-subtitle">2分钟了解TA是否适合学编程</p>
        </header>
      </div>

      <!-- 核心价值 -->
      <section class="value-section">
        <h3 class="section-title">为什么选择天赋评测？</h3>
        <div class="value-cards">
          <div class="value-card">
            <div class="value-icon">🎯</div>
            <div class="value-content">
              <h4 class="value-title">精准定位天赋</h4>
              <p class="value-description">
                70%的孩子在兴趣班选择上存在迷茫，天赋测评帮助发现<strong>真正的潜力方向</strong>
              </p>
            </div>
          </div>

          <div class="value-card">
            <div class="value-icon">⚡</div>
            <div class="value-content">
              <h4 class="value-title">放大优势效应</h4>
              <p class="value-description">
                研究表明，发挥优势比弥补短板效率高<strong>6倍</strong>，让孩子在擅长领域发光
              </p>
            </div>
          </div>

          <div class="value-card">
            <div class="value-icon">📊</div>
            <div class="value-content">
              <h4 class="value-title">科学评估体系</h4>
              <p class="value-description">
                六大核心维度 · 基于心理学理论 · <strong>10,000+</strong>学员数据验证
              </p>
            </div>
          </div>

          <div class="value-card">
            <div class="value-icon">🎓</div>
            <div class="value-content">
              <h4 class="value-title">专属成长规划</h4>
              <p class="value-description">
                不止测评结果，更提供<strong>个性化学习路径</strong>和详细培养建议
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 你将获得 -->
      <section class="deliverables-section">
        <h3 class="section-title">你将获得什么？</h3>
        <div class="deliverables-grid">
          <div class="deliverable-item">
            <span class="deliverable-icon">🎯</span>
            <span class="deliverable-text">天赋类型识别</span>
          </div>
          <div class="deliverable-item">
            <span class="deliverable-icon">📊</span>
            <span class="deliverable-text">编程适配度分析</span>
          </div>
          <div class="deliverable-item">
            <span class="deliverable-icon">📈</span>
            <span class="deliverable-text">六大能力雷达图</span>
          </div>
          <div class="deliverable-item">
            <span class="deliverable-icon">💡</span>
            <span class="deliverable-text">能力详细解读</span>
          </div>
          <div class="deliverable-item">
            <span class="deliverable-icon">🎓</span>
            <span class="deliverable-text">专属培养建议</span>
          </div>
          <div class="deliverable-item">
            <span class="deliverable-icon">🚀</span>
            <span class="deliverable-text">未来发展方向</span>
          </div>
        </div>
      </section>

      <!-- 数据信任 -->
      <section class="trust-section">
        <div class="trust-stats">
          <div class="stat-item">
            <div class="stat-value">13,000+</div>
            <div class="stat-label">家长已使用</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">98%</div>
            <div class="stat-label">好评率</div>
          </div>
        </div>
      </section>

      <!-- 行动区域 -->
      <footer class="action-section">
        <p class="action-description">
          AI + 心理学深度融合 · 科学解码孩子的天赋密码
        </p>
        <button class="primary-button" @click="handleStart">
          <span>开始评测</span>
          <svg class="button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12m-5-5l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="trust-badges">
          <div class="badge">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.78 5.28a.75.75 0 00-1.06-1.06L6.75 8.19 5.28 6.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z"/>
            </svg>
            <span>2-3分钟完成</span>
          </div>
          <div class="badge">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.78 5.28a.75.75 0 00-1.06-1.06L6.75 8.19 5.28 6.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z"/>
            </svg>
            <span>基于10,000+学员数据</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['start'])

function handleStart() {
  emit('start')
}
</script>

<style scoped>
.splash-page {
  min-height: 100vh;
  background: var(--color-bg-secondary);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1e5a8a 0%, #0F4C81 50%, #1a365d 100%);
  opacity: 1;
}

.geometric-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.06;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.2) 0%, transparent 40%),
    linear-gradient(var(--color-gray-100) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-gray-100) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
}

/* 漂浮装饰元素 */
.floating-shapes {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%);
  animation: float 6s ease-in-out infinite;
  filter: blur(40px);
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 5%;
  right: -60px;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 45%;
  left: -40px;
  animation-delay: 2s;
}

.shape-3 {
  width: 120px;
  height: 120px;
  bottom: 15%;
  right: 15%;
  animation-delay: 4s;
}

/* 内容包装器 */
.content-wrapper {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--space-10) var(--space-6);
  animation: fadeIn 0.6s ease-out;
}

/* 品牌卡片 */
.brand-card {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-2xl);
  padding: var(--space-8) var(--space-6);
  margin-bottom: var(--space-6);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* 品牌区域 */
.brand-section {
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
  position: relative;
  z-index: 2;
}

.brand-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--space-5);
  color: var(--color-accent);
  animation: scaleIn 0.6s ease-out, subtlePulse 3s ease-in-out infinite 0.6s;
  filter: drop-shadow(0 8px 24px rgba(245, 158, 11, 0.5));
}

.brand-badge {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-4);
  box-shadow:
    0 4px 12px rgba(255, 107, 107, 0.5),
    0 2px 4px rgba(0, 0, 0, 0.1);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.brand-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--color-white);
  margin-bottom: var(--space-3);
  letter-spacing: -0.02em;
  line-height: var(--line-height-tight);
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.1);
}

.brand-subtitle {
  font-size: var(--font-size-lg);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.01em;
  line-height: var(--line-height-relaxed);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 价值卡片区域 */
.value-section {
  margin-bottom: var(--space-8);
  animation: fadeInUp 1s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-white);
  text-align: center;
  margin-bottom: var(--space-5);
  opacity: 0.95;
}

.value-cards {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.value-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-5);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.value-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.value-card:hover::before {
  left: 100%;
}

.value-card:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateX(6px) translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
}

.value-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: rgba(245, 158, 11, 0.2);
  border-radius: var(--radius-base);
}

.value-content {
  flex: 1;
}

.value-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-white);
  margin-bottom: var(--space-2);
  line-height: var(--line-height-tight);
}

.value-description {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

.value-description strong {
  color: var(--color-accent);
  font-weight: var(--font-weight-semibold);
}

/* 你将获得 */
.deliverables-section {
  margin-bottom: var(--space-8);
  animation: fadeInUp 1s ease-out;
  animation-delay: 0.3s;
  animation-fill-mode: both;
}

.deliverables-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.deliverable-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: all var(--transition-base);
}

.deliverable-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.2);
}

.deliverable-icon {
  font-size: 28px;
  line-height: 1;
}

.deliverable-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-white);
  line-height: var(--line-height-tight);
}

/* 信任数据区域 */
.trust-section {
  margin-bottom: var(--space-8);
  animation: fadeInUp 1s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
}

.trust-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  padding: var(--space-5);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-4);
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-accent);
  margin-bottom: var(--space-2);
  line-height: 1;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
}

/* 行动区域 */
.action-section {
  margin-top: auto;
  text-align: center;
  animation: fadeInUp 1s ease-out;
  animation-delay: 0.6s;
  animation-fill-mode: both;
}

.action-description {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-white);
  margin-bottom: var(--space-6);
  opacity: 0.95;
}

.primary-button {
  width: 100%;
  max-width: 320px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin: 0 auto var(--space-5);
  background: linear-gradient(135deg, var(--color-accent) 0%, #D97706 100%);
  color: var(--color-white);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.primary-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.primary-button:hover::before {
  left: 100%;
}

.primary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(245, 158, 11, 0.45);
}

.primary-button:active {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.35);
}

.button-icon {
  transition: transform var(--transition-base);
}

.primary-button:hover .button-icon {
  transform: translateX(4px);
}

/* 信任徽章 */
.trust-badges {
  display: flex;
  gap: var(--space-5);
  justify-content: center;
}

.badge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.75);
}

.badge svg {
  opacity: 0.8;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

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

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes subtlePulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}
</style>
