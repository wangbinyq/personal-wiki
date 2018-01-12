## processor mode and privilege levels

processor mode
- Thread mode: application software
- Handler mode: handle exceptions

privilege level, controled by `CONTROL` register in thread mode, always privileged in hanlder mode.
- unprivileged: 
  - limited access to some instruction,
  - cannot access to system ticker, nvic, or system control block
  - restricted accesss to memory or peripherals
- privileged: can use all instructions and has access to all resources

## Stacks

`main stack` and `process stack` control by bit[1] of `CONTROL` register (0, 1)

## Core registers

0 - R7 (Low registers)
R8 - R12 (High Registers)
(General purpose registers)

SP(R13) (Stack Pointer) (PSP, MSP, Banked)

LR(R14) Link Register

PC(R15) Programm Counter (default: reset vector @0x00000004)

(Special registers)
PSR (APSR, IPSR, EPSR) (Programm status register)
PRIMASK FAULTMASK BASEPRI (Exception mask registers)
CONTROL (Control register)

## Exceptions and interrupts

## Data types
- 32 16 8 bits
- little-endian or big-endian

## The Cortex Microcontroller Software Interface Standard (CMSIS)

- a common way to
  - access peripheral registers
  - define expection vectors
- the names of
  - the registers of the peripherals
  - the core exception vectors
- a device-independent interface for ROTS kernels, including a debug channel