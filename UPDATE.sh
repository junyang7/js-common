#!/usr/bin/env bash

set -e

export https_proxy=http://127.0.0.1:7897 http_proxy=http://127.0.0.1:7897 all_proxy=socks5://127.0.0.1:7897


SRC_DIR="./src"
OUT_FILE="./index.js"
PKG_FILE="./package.json"

# === 生成 index.js ===
modules=$(ls "$SRC_DIR"/*.js | LC_ALL=C sort | xargs -n1 basename | sed 's/\.js$//')

# 生成 import 语句
imports=""
for m in $modules; do
    imports+="import $m from \"./src/$m.js\";\n"
done

# 生成 jc 对象
jc_object="const jc = {\n"
for m in $modules; do
    jc_object+="    $m,\n"
done
jc_object+="};"

# 全局变量注入和 Vue 插件
middle_code="if (typeof window !== \"undefined\") {
    window.jc = jc;
}
if (typeof window === \"undefined\" && typeof global !== \"undefined\") {
    global.jc = jc;
}
jc.install = function (Vue) {
    if (!Vue.prototype.\$jc) {
        Vue.prototype.\$jc = jc;
    }
};"

# 导出语句
exports="export default jc;\nexport {jc};"

# 写入文件（注意空行的控制）
echo -e "${imports}\n${jc_object}\n\n${middle_code}\n\n${exports}" > "$OUT_FILE"
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
