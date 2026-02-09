# 科技特长生评测H5应用

这是一个基于Vue 3 + Vant 4 + ECharts开发的移动端H5评测应用。

## 功能特性

✅ **问卷系统**
- 动态题目显示（12-15题）
- 条件显示逻辑（编程学习经历题目）
- 流畅的页面切换动画
- 进度条实时显示
- 答案缓存

✅ **评测结果页**
- 编程适配度分析（星级评分）
- 六大能力雷达图可视化
- 当前水平vs目标水平对比
- 编程学习经历展示
- 个性化学习建议
- 转化引导区

✅ **视觉设计**
- 科技未来主义风格
- 高饱和度撞色配色（橙+蓝+紫）
- 流畅的动画效果
- 响应式移动端布局

## 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **Vant 4** - 移动端UI组件库
- **ECharts 5** - 数据可视化图表库
- **Pinia** - Vue状态管理
- **Vite** - 下一代前端构建工具
- **SASS** - CSS预处理器

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
h5-prototype/
├── index.html              # HTML入口
├── package.json            # 项目配置
├── vite.config.js          # Vite配置
├── src/
│   ├── main.js             # 应用入口
│   ├── App.vue             # 根组件
│   ├── components/         # 组件目录
│   │   ├── QuestionPage.vue    # 问卷页面
│   │   └── ResultPage.vue      # 结果页面
│   └── stores/             # 状态管理
│       └── evaluation.js   # 评测store
└── README.md               # 项目说明
```

## 核心功能说明

### 1. 问卷系统

**动态题目显示**
- 基础信息（2题）：年级、编程学习经历
- 编程经历（3题，条件显示）：学习课程、学习时长、CSP获奖
- 能力评测（10题）：6大核心维度

**条件显示逻辑**
```javascript
// 如果选择"学过编程"
if (hasCodingExperience === true) {
  // 显示编程经历题目（3题）
}

// 如果选择"没学过编程"
if (hasCodingExperience === false) {
  // 直接跳到能力评测
}
```

### 2. 评测算法

**推荐逻辑**

| 用户类型 | 推荐依据 | 推荐课程 |
|---------|---------|---------|
| 无编程经历 | 年级 + 能力评测 | 图形化/Python/C++ |
| 有编程经历 | 学习课程 + 时长 + 获奖 | 进阶/竞赛课程 |

**示例1：无编程经历 + 4年级 + 逻辑推理≥85**
→ 推荐Python体验课

**示例2：有编程经历 + Python学习 + CSP获奖**
→ 推荐C++竞赛课

### 3. 结果页组件

**雷达图**
- 使用ECharts Radar Chart
- 6大维度可视化
- 渐变色填充
- 响应式自适应

**能力对比**
- 当前水平 vs 目标水平
- 进度条动画展示
- 差距可视化

## 设计风格

### 配色方案

```css
--primary-orange: #FF6600  /* 活力橙 - 主要操作 */
--primary-blue: #0066CC    /* 智慧蓝 - 专业感 */
--primary-purple: #9900CC   /* 创新紫 - 创意感 */
```

### 动画效果

- 页面切换：slide-in-left / slide-in-right
- 元素入场：fadeInUp
- 按钮脉动：pulse
- 图标浮动：float
- 进度条闪光：shimmer

## 浏览器支持

- Chrome (推荐)
- Safari
- Firefox
- Edge
- 微信内置浏览器

## 性能优化

- 组件懒加载
- 图片懒加载
- CSS动画硬件加速
- ECharts按需引入

## 数据埋点

| 事件 | 参数 |
|-----|------|
| evaluation_start | 来源、年级 |
| question_answer | 问题ID、答案、耗时 |
| evaluation_complete | 全部答案、总耗时 |
| result_view | 结果类型、推荐课程 |
| course_claim | 课程类型、联系方式 |

## 后续优化

- [ ] 添加分享功能
- [ ] 生成报告图片
- [ ] 接入真实后端API
- [ ] 添加用户登录
- [ ] 历史报告查看
- [ ] AI对话功能

## License

MIT

## 部署状态

GitHub Pages 自动部署已配置，每次推送到 main 分支会自动更新。
访问地址：https://lone-beast.github.io/tech-evaluation-h5/