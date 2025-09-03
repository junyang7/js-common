#!/usr/bin/env bash

set -e

SRC_DIR="./src"
OUT_FILE="./index.js"
PKG_FILE="./package.json"

# === 生成 index.js ===
modules=$(ls "$SRC_DIR"/*.js | LC_ALL=C sort | xargs -n1 basename | sed 's/\.js$//')

imports=""
for m in $modules; do
    imports+="import $m from \"./src/$m.js\";\n"
done

default_exports="export default {\n"
for m in $modules; do
    default_exports+="    $m,\n"
done
default_exports+="};\n"

named_exports="export {\n"
for m in $modules; do
    named_exports+="    $m,\n"
done
named_exports+="};\n"

echo -e "$imports\n$default_exports\n$named_exports" > "$OUT_FILE"
echo "✅ Generated $OUT_FILE"

# === 更新 package.json version 字段 ===
timestamp=$(date +%Y%m%d%H%M)

# 取出当前 version
current_version=$(grep -o '"version": *"[^"]*"' "$PKG_FILE" | head -n1 | sed 's/.*"version": *"\([^"]*\)".*/\1/')
base=${current_version%%+*}
new_version="${base}+${timestamp}"

# 用 sed 替换 version 字段
sed -i.bak "s/\"version\": *\"[^\"]*\"/\"version\": \"${new_version}\"/" "$PKG_FILE" && rm -f "$PKG_FILE.bak"

echo "✅ Updated version: $current_version → $new_version"

# === 提交并推送 ===
git add .
git commit -m "build: update index.js & bump version to ${new_version}" || echo "ℹ️ No changes to commit"
git push

echo "🚀 All done!"
