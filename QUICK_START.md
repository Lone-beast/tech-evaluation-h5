# 🎯 Gitee Pages 快速部署清单

## ✅ 准备工作（已完成）
- [x] 构建生产版本：`npm run build`
- [x] 文件已复制到项目根目录

---

## 📋 操作清单

### 1️⃣ 创建仓库
- [ ] 访问：https://gitee.com/
- [ ] 登录/注册账号
- [ ] 点击 "+" → "新建仓库"
- [ ] 仓库名：`evaluation-h5`
- [ ] ✅ 选择"公开"
- [ ] 点击"创建"

### 2️⃣ 上传文件（二选一）

#### 方法A：Git 命令（推荐）
```bash
cd /Users/zengyaojie/work/TRAE/企微召回评测/h5-prototype
git init
git add .
git commit -m "首次部署"
git remote add origin https://gitee.com/你的用户名/evaluation-h5.git
git push -u origin master
```

#### 方法B：网页上传
- [ ] 在仓库页面点击"文件"标签
- [ ] 点击"上传文件"
- [ ] 上传 `index.html` 和 `assets` 文件夹
- [ ] 点击"提交"

### 3️⃣ 启用 Pages
- [ ] 点击顶部"服务"标签
- [ ] 点击左侧"Gitee Pages"
- [ ] 点击"启动"
- [ ] 选择 `master` 分支
- [ ] 目录选择根目录 `/`
- [ ] 点击"启动"

### 4️⃣ 获取链接
- [ ] 等待 1-2 分钟
- [ ] 复制链接：`https://你的用户名.gitee.io/evaluation-h5/`
- [ ] 在浏览器测试
- [ ] 在微信中测试

---

## 🎉 部署成功！

您的 H5 链接：
```
https://_______.gitee.io/evaluation-h5/
```

生成二维码：https://cli.im/

---

## 📱 测试检查
- [ ] 电脑浏览器能打开
- [ ] 手机浏览器能打开
- [ ] 微信中能打开
- [ ] 样式显示正常
- [ ] 功能正常

---

**预估时间**：5 分钟 ⏱️

**难度**：⭐⭐☆☆☆（很简单）

现在就开始吧！🚀
