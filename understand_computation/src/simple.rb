class Number < Struct.new(:value)
  def reducible?
    false
  end

  def to_s
      value.to_s
  end

def inspect
  "«#{self}»"
  end
end

class Add < Struct.new(:left, :right)
  def reducible?
    true
  end

  def reduce(envirenment)
    if left.reducible?
      Add.new(left.reduce(envirenment), right)
    elsif right.reducible?
      Add.new(left, right.reduce(envirenment))
    else
      Number.new(left.value + right.value)
    end
  end

  def to_s
      "#{left} + #{right}"
  end

  def inspect
      "«#{self}»"
  end
end

class Multiply < Struct.new(:left, :right)
  def reducible?
    true
  end

  def reduce(envirenment)
    if left.reducible?
      Multiply.new(left.reduce(envirenment), right)
    elsif right.reducible?
      Multiply.new(left, right.reduce(envirenment))
    else
      Number.new(left.value * right.value)
    end
  end

  def to_s
      "#{left} * #{right}"
  end

  def inspect
      "«#{self}»"
  end
end

class Boolean < Struct.new(:value)
  def to_s
      value.to_s
  end

  def inspect
      "«#{self}»"
  end

  def reducible?
      false
  end
end

class LessThan < Struct.new(:left, :right)
  def to_s
      "#{left} < #{right}"
  end

  def inspect
      "«#{self}»"
  end

  def reducible?
      true
  end

  def reduce(envirenment)
      if left.reducible?
          LessThan.new(left.reduce(envirenment), right)
      elsif right.reducible?
          LessThan.new(left, right.reduce(envirenment))
      else
          Boolean.new(left.value < right.value)
      end
  end
end

class Variable < Struct.new(:name)
  def to_s
      name.to_s
  end

  def inspect
      "«#{self}»"
  end

  def reducible?
      true
  end

  def reduce(envirenment)
    envirenment[name]
  end
end

class Machine < Struct.new(:expression, :envirenment)
  def step
    self.expression = expression.reduce(envirenment)
  end

  def run
    while expression.reducible?
        puts expression
        step
    end
    puts expression
  end
end

expression = Add.new(
  Multiply.new(Number.new(1), Number.new(2)),
  Multiply.new(Number.new(3), Number.new(4))
)

machine = Machine.new(expression)
machine.run

Machine.new(
  LessThan.new(Number.new(5), Add.new(Number.new(2), Number.new(2)))
  ).run

Machine.new(
    Add.new(Variable.new(:x), Variable.new(:y)),
    { x: Number.new(3), y: Number.new(4) }
).run