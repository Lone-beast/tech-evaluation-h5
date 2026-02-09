#!/bin/bash

echo "🚀 科技特长生评测H5应用"
echo ""
echo "正在启动开发服务器..."
echo ""

# 检查node_modules是否存在
if [ ! -d "node_modules" ]; then
  echo "📦 首次运行，正在安装依赖..."
  npm install
  echo ""
fi

# 启动开发服务器
npm run dev
