# hash
symbol = :symbol
hash = {width: 100, height: 2250, depth: 250}

puts hash
puts hash[:width]

# proc
multiply = -> x, y { x * y }
puts multiply
puts multiply.call(10, 20)
puts multiply[10, 20]

# if
val = if 2 < 3
  'less'
else
  'more'
end
puts val

# case
quantify = 
  -> number {
    case number
    when 1
       'one'
    when 2
      'a couple'
    else
      'many'
    end
  }
puts quantify.call(100)

# while
x = 1
while x < 1000
  x = x * 2
end
puts x

# object
o = Object.new

def o.add(x, y)
  x + y
end

def o.add_twice(x, y)
  add(x, y) + add(x, y)
end

puts o.add(2, 3)
puts o.add_twice(2, 3)

## main object
def multiply(a, b)
  a * b
end
puts multiply(2, 3)

# class
class Calculator
  def divide(x, y)
    x / y
  end
end

c = Calculator.new
puts c.class
puts c.divide(10, 2)

c = c.class
while c.superclass
  print c, ' superclass: ', c.superclass
  puts
  c = c.superclass
end


## inheritance
class MultiplyingCalculator < Calculator
  def multiply(x, y)
    x * y
  end
end

mc = MultiplyingCalculator.new
puts mc.class
puts mc.class.superclass
puts mc.multiply(10, 2)
puts mc.divide(10, 2)

## super
class BinaryMultiplyingCalculator < MultiplyingCalculator
  def multiply(x, y)
    result = super(x, y)
    result.to_s(2)
  end
end

bmc = BinaryMultiplyingCalculator.new
puts bmc.multiply(10, 2)

# module
module Addition
  def add(x, y)
    x + y
  end
end

class AddingCalculator
  include Addition
end

ac = AddingCalculator.new
puts ac.add(10, 2)

# other
width, height, depth = [100, 2250, 251]

puts "hello #{width}"

## variadic

def join_with_commans(*words)
  words.join(',')
end

puts join_with_commans('one', 'two', 'three')

## block do end {}
def do_three_times
  yield 'first'
  yield 'second'
  yield 'third'
end

do_three_times { |n| puts "#{n} hello" }

def number_names
  [yield('one'), yield('two'), yield('three')].join(', ')
end

puts number_names { |name| name.upcase.reverse }

## struct
class Point < Struct.new(:x, :y)
  def +(other_point)
    Point.new(x + other_point.x, y + other_point.y)
  end

  def to_s
    "#<Point (#{x}, #{y})>"
  end
end

a = Point.new(2, 3)
b = Point.new(10, 20)

puts (a + b)

## monkey patching

class Point
  def -(other_point)
    Point.new(x - other_point.x, y - other_point.y)
  end
end

puts (a - b)

## constant
NUMBERS = [4, 8, 15, 16, 23, 42]