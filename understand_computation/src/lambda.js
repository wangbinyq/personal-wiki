const zero = proc => x => x
const one = proc => x => proc(x)
const two = proc => x => proc(proc(x))
const toInteger = proc => proc(x => x + 1)(0)

const t = x => y => x
const f = x => y => y
const If = proc => x => y => proc(x)(y)
const toBoolean = b => If(b)(true)(false)

