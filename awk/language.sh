#! /bin/env sh

# pattern1, pattern2 {statements}, 对从 pattern1 开始匹配到 pattern2 的每一行执行 action
# 可以用来表示范围
awk 'NR==2, NR==3' countries

# FS 表示分割字段方式, 默认为空格和制表符 FS = ""
# 通常在 BEGIN 时改变 FS

# < 字符串小于: 比较字符串出现的顺序


# 字符串模式匹配
# /regexpr/ 
# expression ~ /regexpr/ 表达式的字符串能被匹配 // /regexpr/  是 $0 /regexpr/ 的简写
# expression !~ /regexpr/

# print, printf 的输出可以重定向到文件, 管道和终端
# OFS, ORS 输出分隔符