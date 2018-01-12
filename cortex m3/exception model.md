## states

- Inactive
- Pending: waiting to be serviced
- Active: being serviced
- Active and pending: being serviced and there is a pending exception from the same source.

## types

- Reset: power up or a warm reset
- NMI
- MemManage
- BusFault
- UsageFault
- SVCall
- PendSV
- SysTick
- Interrupt (IRQ)

## handlers

- Interrupt Service Routines (ISRs): IRQ
- Fault handlers: MemManage, BusFault UsageFault
- System handlers: NMI, PendSV, SVCall SysTick

## Vector table

The vector table contains the reset value of the stack pointer, and the start addresses, also called
exception vectors, for all exception handlers.

## priority grouping

- group priority: can preempt low group priority handler
- subpriority