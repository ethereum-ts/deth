import { MachineWord } from '../MachineWord'
import { ExecutionContext } from '../ExecutionContext'
import { GasCost } from './gasCosts'

export function opPush (bytes: string) {
  const word = MachineWord.fromHexString(bytes)
  const count = bytes.length / 2
  return (ctx: ExecutionContext) => {
    ctx.gasUsed += GasCost.VERYLOW
    ctx.programCounter += count
    ctx.stack.push(word)
  }
}

export function opDup (n: number) {
  return (ctx: ExecutionContext) => {
    ctx.gasUsed += GasCost.VERYLOW
    ctx.stack.dup(n)
  }
}

export function opSwap (n: number) {
  return (ctx: ExecutionContext) => {
    ctx.gasUsed += GasCost.VERYLOW
    ctx.stack.swap(n)
  }
}

export function opPop (ctx: ExecutionContext) {
  ctx.gasUsed += GasCost.BASE
  ctx.stack.pop()
}