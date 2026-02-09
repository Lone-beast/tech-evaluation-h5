# H5原型文件清单

## 📁 项目结构

```
h5-prototype/
├── 📄 index.html                  # HTML入口文件
├── 📄 package.json                # 项目配置和依赖
├── 📄 vite.config.js              # Vite构建配置
├── 📄 start.sh                    # 快速启动脚本
├── 📄 README.md                   # 项目说明文档
├── 📄 .gitignore                  # Git忽略文件
└── src/
    ├── 📄 main.js                  # 应用入口
    ├── 📄 App.vue                  # 根组件
    ├── components/                # 组件目录
    │   ├── 📄 QuestionPage.vue    # 问卷页面组件
    │   └── 📄 ResultPage.vue      # 结果页面组件
    └── stores/                    # 状态管理
        └── 📄 evaluation.js       # 评测store
```

## 🎨 核心文件说明

### 1. 入口文件

#### index.html
- 包含HTML结构和全局CSS
- 引入Google Fonts（Noto Sans SC）
- 定义CSS变量（颜色主题）
- 定义全局动画（fadeInUp, slideIn, pulse等）

#### main.js
- 创建Vue应用实例
- 集成Pinia状态管理
- 挂载应用到DOM

### 2. 核心组件

#### App.vue
- 根组件，管理页面切换
- 实现页面过渡动画
- 根据状态切换QuestionPage和ResultPage

#### QuestionPage.vue
- **问卷页面主组件**
- 功能：
  - 顶部导航栏（返回按钮、进度条）
  - 问题展示（支持单选/多选）
  - 选项列表（带动画效果）
  - 底部操作按钮
- 特性：
  - 单选自动进入下一题
  - 多选需手动确认
  - 流畅的切换动画

#### ResultPage.vue
- **评测结果页组件**
- 功能：
  - 编程适配度分析（星级评分）
  - 六大能力雷达图（ECharts实现）
  - 能力对比进度条
  - 编程学习经历展示
  - 个性化学习建议
  - 转化引导区
- 特性：
  - 渐变背景动画
  - 卡片式布局
  - 脉动按钮效果

### 3. 状态管理

#### evaluation.js
- Pinia store，管理评测所有状态
- **状态**：
  - 基础信息：年级
  - 编程经历：hasCodingExperience, codingCourses, codingDuration, cspAward
  - 答案：answers
  - 当前问题索引：currentQuestionIndex
  - 评测结果：evaluationResult
- **方法**：
  - setAnswer() - 设置答案
  - nextQuestion() - 下一题
  - prevQuestion() - 上一题
  - calculateResult() - 计算评测结果
  - recommendCourse() - 课程推荐逻辑

## 🔧 技术要点

### 1. 条件显示逻辑

```javascript
// evaluation.js 中的displayQuestions计算属性
const displayQuestions = computed(() => {
  const baseQuestions = questions.slice(0, 2) // 前2题总是显示

  if (hasCodingExperience.value === true) {
    // 学过编程：显示编程经历题目（3题）
    return [...baseQuestions, ...questions.slice(2, 5)]
  } else if (hasCodingExperience.value === false) {
    // 没学过：直接跳到能力评测
    return [...baseQuestions, ...questions.slice(5)]
  }

  return baseQuestions
})
```

### 2. 推荐算法

```javascript
function recommendCourse(dimensions) {
  // 优先级1：有C++ + 获奖 → 竞赛强化
  // 优先级2：有Python + 获奖 → 转C++竞赛
  // 优先级3：1-3年级 → 图形化
  // 优先级4：4年级 + 逻辑推理≥85 → Python
  // 优先级5：4年级 + 空间想象≥85 → C++
  // 默认：Python
}
```

### 3. 雷达图实现

- 使用ECharts Radar Chart
- 6个维度：逻辑推理、创意创造、空间想象、专注坚持、协作沟通、观察探索
- 渐变色填充
- 响应式自适应

### 4. 动画效果

**CSS动画定义**：
- `fadeInUp` - 元素从下方淡入
- `slideInLeft/Right` - 页面左右切换
- `pulse` - 按钮脉动
- `float` - 图标浮动
- `shimmer` - 进度条闪光

**Vue Transition**：
- 页面切换使用Vue `<transition>` 组件
- 问题切换使用mode="out-in"

## 🎯 核心功能流程

### 问卷流程

```
用户进入
  ↓
第1题：选择年级
  ↓
第2题：是否学过编程？
  ↓ (选"学过")
第2.1题：学习课程（多选）
  ↓
第2.2题：学习时长
  ↓
第2.3题：CSP获奖
  ↓ (选"没学过")
第3-12题：能力评测（10题）
  ↓
计算评测结果
  ↓
展示结果页
```

### 推荐流程

```
获取评测数据
  ↓
判断是否有编程经历
  ↓
┌──────────────┬──────────────────┐
│  无编程经历   │  有编程经历      │
│              │                  │
│  ↓           │  ↓               │
│ 判断年级      │ 判断课程+获奖    │
│              │                  │
└──────────────┴──────────────────┘
  ↓                 ↓
推荐基础课程    推荐进阶/竞赛课程
  ↓                 ↓
展示结果页      展示结果页
```

## 📊 数据结构

### 评测结果数据结构

```javascript
{
  dimensions: {
    logic: 87,        // 逻辑推理得分
    creative: 75,     // 创意创造得分
    spatial: 82,      // 空间想象得分
    focus: 75,        // 专注坚持得分
    communication: 70,// 协作沟通得分
    observation: 88   // 观察探索得分
  },
  type: '逻辑思维型',           // 综合类型
  programmingMatch: {
    score: 82,                   // 编程适配度总分
    stars: 4                     // 星级评分
  },
  recommendedCourse: {
    course: 'Python',            // 推荐课程
    courseType: '体验',          // 课程类型
    reason: '...'               // 推荐理由
  },
  grade: '4',                    // 年级
  hasCodingExperience: false,    // 是否有编程经历
  codingCourses: [],             // 学习的课程
  codingDuration: '',            // 学习时长
  cspAward: ''                   // CSP获奖情况
}
```

## 🚀 快速开始

### 安装依赖
```bash
cd h5-prototype
npm install
```

### 启动开发
```bash
npm run dev
```

访问：http://localhost:3000

### 构建生产版本
```bash
npm run build
```

## 💡 开发提示

1. **修改题目**：编辑 `src/stores/evaluation.js` 中的 `questions` 数组
2. **调整推荐逻辑**：修改 `recommendCourse()` 函数
3. **自定义样式**：修改CSS变量和组件样式
4. **添加埋点**：在组件中添加数据上报逻辑

## 📝 注意事项

1. 所有题目ID必须唯一
2. 答案会缓存在localStorage（可选）
3. 雷达图需要等待DOM渲染完成
4. 页面切换依赖Vue Transition组件
5. ECharts需要响应式处理

---

**文档版本**：v1.0
**最后更新**：2026-02-06
