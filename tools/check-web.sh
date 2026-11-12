#!/bin/sh
# 用正在运行的 Web 开发服务器检查单个文件能不能编译（比 lsp lint 可靠）：
#   tools/check-web.sh uni_modules/antdv-next-uni/components/am-foo/am-foo.uvue pages/components/foo.uvue
# 语法错误 → HTTP 500；类型错误 → 服务器日志里的 warning（下面会打印出来，只看路径是你自己文件的）。
# 需要先启动：cli launch web --project "$PWD" > unpackage/web.log 2>&1 &
LOG="${WEB_LOG:-unpackage/web.log}"
PORT="${WEB_PORT:-19596}"
for file in "$@"; do
  start=$(wc -l < "$LOG" | tr -d ' ')
  code=$(curl -s -m 90 -o /dev/null -w "%{http_code}" "http://localhost:$PORT/$file?import")
  sleep 2
  echo "== $file -> HTTP $code"
  tail -n +"$((start + 1))" "$LOG" | sed 's/\x1b\[[0-9;]*m//g' | tr '\r' '\n' | grep -v "hmr update\|page reload\|^$" | cut -c14-260
done
