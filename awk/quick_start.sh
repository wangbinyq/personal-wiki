#! /bin/env sh

# awk program is constructure by `pattern { action }`
awk '$3 > 0 { print $1, $2 * $3 }' emp.data
awk '$3 == 0 { print $1 }' emp.data

echo ----
# pattern or action can be ignore, but not both
awk '$3 == 0' emp.data # 默认 action 为 print $0
awk '{print $1}' emp.data


awk '{print $1}' emp.data emp2.data

# awk 的数据结构只有数字和字符串

# $0 stand for entire line, $n (n = 1, 2, 3...)
awk '{print $0}' emp.data

# NF 字段数量, $NF 最后一个字段
awk '{print NF, $1, $NF}' emp.data

# NR 当前行数, 从 1 开始
awk '{print NR, $1, $NF}' emp.data

# print, printf, 括号可选
awk '{ printf("%-8s $%6.2f\n", $1, $2 * $3) }' emp.data

awk '{ printf("%6.2f %s\n", $2 * $3, $0) }' emp.data | sort -n

# 支持逻辑运算
awk '$2 >= 4 && $3 >= 20' emp.data

# 特殊的模式 BEGIN, END 分别在文件第一行之前和最后一行最后执行
# 可以再同一行放置多个语句, 语句之间用分号隔开
# print "" : 打印空行, print 打印当前行
awk 'BEGIN { print "NAME RATE HOURS"; print "" } { print }' emp.data


# 变量不需要声明
awk '$3 > 15 { emp = emp + 1} END { print emp, "employees worked more than 15 hours"}' emp.data
awk '{ pay = pay + $2 * $3} END { print NR, "employees"; print "total pay is", pay; print "average pay is", pay / NR}' emp.data

# 找到每小时工资最高的雇员, 默认值为 0, ""
awk '$2 > maxrate {maxrate = $2; maxemp = $1} END {print "heightest hourly rate:", maxrate, "for", maxemp}' emp.data

# 字符串拼接
awk '{names = names $1 " "} END { print names }' emp.data

# 内建函数
awk '{print $1, length($1)}' emp.data # length 字符串长度

# 流程控制, 只能在 action 中引用 if, while/do, for, 语法同 C

# 数组, 倒序打印
awk '{line[NR] = $0} END { i = NR; while (i>0) {print line[i]; i = i - 1} }' emp.data

echo 'one liner'
awk 'END {print NR}' emp.data # 总行数
awk 'NR == 10' emp.data # 打印第十行
awk '{print $NF}' emp.data # 打印每行最后一个字段
awk '{filed = $NF} END {print field}' emp.data # 打印最后一行最后一个字段
