# H5 科技特长生评测部署到 Gitee Pages

## 快速开始

### 1. 创建仓库

访问：https://gitee.com/projects/new

填写信息：
- **仓库名称**：evaluation-h5
- **是否公开**：✅ 公开（必须公开，否则无法访问）
- **初始化仓库**：❌ 不勾选（我们要上传现有的代码）
- 点击"创建"

### 2. 上传代码（方法A：使用 Git - 推荐）

在终端执行：

```bash
# 进入项目目录
cd /Users/zengyaojie/work/TRAE/企微召回评测/h5-prototype

# 复制 dist 文件夹内容到根目录（为了方便部署）
cp -r dist/* .
cp dist/index.html index.html 2>/dev/null || true

# 初始化 Git
git init
git add .
git commit -m "Initial commit"

# 添加远程仓库（替换 YOUR_USERNAME 为您的 Gitee 用户名）
git remote add origin https://gitee.com/YOUR_USERNAME/evaluation-h5.git

# 推送代码
git push -u origin master
```

### 3. 上传代码（方法B：网页上传）

如果不想用 Git 命令：

1. 在 Gitee 仓库页面，点击"文件"标签
2. 点击"上传文件"
3. 将 `dist` 文件夹中的所有文件上传：
   - index.html
   - assets 文件夹（包含所有 JS 和 CSS）

### 4. 启用 Gitee Pages

1. 在仓库页面，点击上方的"服务"标签
2. 点击左侧菜单的 "Gitee Pages"
3. 点击"启动"按钮
4. 选择 **master 分支**
5. 部署目录选择根目录 `/`
6. 点击"启动"

等待 1-2 分钟，Gitee Pages 会生成您的访问链接。

### 5. 访问您的 H5

部署成功后，您会看到链接，格式如下：
```
https://YOUR_USERNAME.gitee.io/evaluation-h5
```

**这个链接在中国可以流畅访问！** ✅

---

## 测试链接

部署完成后，在以下环境测试：

1. ✅ 电脑浏览器（Chrome/Safari）
2. ✅ 手机浏览器
3. ✅ 微信内置浏览器
4. ✅ QQ 内置浏览器

---

## 更新部署

如果您修改了代码，重新部署：

```bash
# 重新构建
npm run build

# 复制新文件
rm -f index.html
cp -r dist/* .

# 提交代码
git add .
git commit -m "Update"
git push
```

然后在 Gitee Pages 页面点击"更新"按钮。

---

## 生成二维码

访问：https://cli.im/
输入您的 H5 链接，生成二维码供用户扫描。

---

## 注意事项

1. ⚠️ Gitee Pages 必须是**公开仓库**
2. ⚠️ 首次部署需要 **1-2 分钟**等待
3. ⚠️ 免费版有流量限制，但如果只是评测H5完全够用
4. ✅ 支持自定义域名（在 Gitee Pages 设置中添加）
5. ✅ 国内访问速度快，用户无障碍

---

## 域名绑定（可选）

如果您有域名：

1. 在 Gitee Pages 设置中添加自定义域名
2. 在域名 DNS 设置中添加 CNAME 记录：
   - 主机记录：@
   - 记录值：YOUR_USERNAME.gitee.io
3. 等待 DNS 生效（通常 10 分钟）
