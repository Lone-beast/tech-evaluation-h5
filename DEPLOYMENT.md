# H5评测项目部署指南

## 📋 项目说明

这是一个纯前端H5项目，**不需要数据库**，只需部署静态文件即可。

---

## 🚀 部署步骤

### 第一步：构建生产版本

```bash
# 进入项目目录
cd /Users/zengyaojie/work/TRAE/企微召回评测/h5-prototype

# 安装依赖（如果还没安装）
npm install

# 构建生产版本
npm run build
```

构建完成后，会在项目根目录生成 `dist` 文件夹，里面就是要部署的静态文件。

---

## 🌐 部署方案

### 方案一：Nginx 部署（推荐 - 适合自有服务器）

#### 1. 安装 Nginx
```bash
# CentOS/RHEL
yum install nginx -y

# Ubuntu/Debian
apt-get install nginx -y

# macOS
brew install nginx
```

#### 2. 配置 Nginx

创建配置文件 `/etc/nginx/conf.d/evaluation.conf`：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 改成您的域名

    root /var/www/evaluation;  # 静态文件路径
    index index.html;

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 3. 部署文件
```bash
# 创建网站目录
sudo mkdir -p /var/www/evaluation

# 复制构建好的文件到服务器
sudo cp -r dist/* /var/www/evaluation/

# 设置权限
sudo chown -R nginx:nginx /var/www/evaluation
# 或者 Ubuntu/Debian
sudo chown -R www-data:www-data /var/www/evaluation

# 重启 Nginx
sudo systemctl restart nginx
```

#### 4. 配置 HTTPS（可选但推荐）
```bash
# 使用 Let's Encrypt 免费证书
sudo apt-get install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

### 方案二：阿里云 OSS + CDN（推荐 - 国内访问快）

#### 1. 开通阿里云 OSS
- 访问：https://oss.console.aliyun.com/
- 创建 Bucket：`evaluation-h5`
- 权限：**公共读**

#### 2. 上传文件
```bash
# 安装 OSS 命令行工具
npm install -g ossutil

# 配置
ossutil config

# 上传文件
ossutil cp dist/ oss://evaluation-h5/ -rf
```

#### 3. 配置 CDN
- 访问：https://cdn.console.aliyun.com/
- 添加域名：`evaluation.your-domain.com`
- 源站：OSS Bucket
- 开启 HTTPS

---

### 方案三：Vercel 部署（最简单 - 国际访问快）

#### 1. 安装 Vercel CLI
```bash
npm install -g vercel
```

#### 2. 登录并部署
```bash
# 登录
vercel login

# 部署
cd /Users/zengyaojie/work/TRAE/企微召回评测/h5-prototype
vercel --prod
```

#### 3. 配置自定义域名（可选）
在 Vercel 控制台添加自定义域名

---

### 方案四：腾讯云 COS + CDN

#### 1. 创建 COS Bucket
- 访问：https://console.cloud.tencent.com/cos
- 创建存储桶：`evaluation-h5`
- 权限：**公共读**

#### 2. 上传文件
- 使用 COS 控制台直接上传 `dist` 文件夹内容

#### 3. 配置 CDN
- 添加 CDN 加速域名
- 开启 HTTPS

---

## 🔧 常见问题

### 1. 构建失败？
```bash
# 清除缓存重新构建
rm -rf node_modules dist
npm install
npm run build
```

### 2. 部署后页面空白？
检查：
- 确保所有文件都已上传
- 检查 Nginx 配置中的 `root` 路径是否正确
- 查看浏览器控制台是否有错误

### 3. 微信内无法访问？
- 必须使用 HTTPS
- 域名需要备案（国内服务器）
- 添加到微信公众号白名单

### 4. 二维码生成？
访问：https://cli.im/ 或其他在线二维码生成器
输入您的 H5 链接即可生成二维码

---

## 📱 测试部署

部署完成后，访问以下链接测试：
- 桌面端：`http://your-domain.com`
- 移动端：在手机浏览器访问上述链接
- 微信：在微信中打开链接

---

## 💰 费用估算

### 各方案成本对比

| 方案 | 月成本 | 优点 | 缺点 |
|------|--------|------|------|
| **Nginx 自有服务器** | ¥20-100/月 | 完全控制 | 需要运维 |
| **阿里云 OSS + CDN** | ¥10-50/月 | 国内访问快 | 需要备案 |
| **Vercel** | **免费** | 最简单 | 国内访问慢 |
| **腾讯云 COS + CDN** | ¥10-50/月 | 国内访问快 | 需要备案 |

**推荐**：
- 如果主要用户在**国内**：选择阿里云 OSS 或腾讯云 COS
- 如果主要用户在**国外**：选择 Vercel
- 如果已有**服务器**：直接用 Nginx 部署

---

## 🎯 快速开始推荐

**如果您是第一次部署，推荐使用 Vercel（免费且最简单）：**

```bash
# 1. 构建项目
npm run build

# 2. 安装 Vercel CLI
npm install -g vercel

# 3. 部署
vercel --prod
```

3分钟后，您的 H5 就可以在线访问了！

---

## 📞 技术支持

如有问题，检查：
1. 构建是否成功：`ls -la dist/`
2. 文件是否完整上传
3. 服务器 Nginx/配置是否正确
4. 域名 DNS 是否解析到正确的 IP
