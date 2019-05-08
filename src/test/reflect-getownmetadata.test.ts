import { Reflect } from '..'

describe('Reflect.getOwnMetadata', () => {
  it('InvalidTarget', () => {
    expect(() => Reflect.getOwnMetadata('key', undefined, undefined)).toThrow(
      TypeError
    )
  })

  it('WithoutTargetKeyWhenNotDefined', () => {
    let obj = {}
    let result = Reflect.getOwnMetadata('key', obj, undefined)
    expect(result).toEqual(undefined)
  })

  it('WithoutTargetKeyWhenDefined', () => {
    let obj = {}
    Reflect.defineMetadata('key', 'value', obj, undefined)
    let result = Reflect.getOwnMetadata('key', obj, undefined)
    expect(result).toEqual('value')
  })

  it('WithoutTargetKeyWhenDefinedOnPrototype', () => {
    let prototype = {}
    let obj = Object.create(prototype)
    Reflect.defineMetadata('key', 'value', prototype, undefined)
    let result = Reflect.getOwnMetadata('key', obj, undefined)
    expect(result).toEqual(undefined)
  })

  it('WithTargetKeyWhenNotDefined', () => {
    let obj = {}
    let result = Reflect.getOwnMetadata('key', obj, 'name')
    expect(result).toEqual(undefined)
  })

  it('WithTargetKeyWhenDefined', () => {
    let obj = {}
    Reflect.defineMetadata('key', 'value', obj, 'name')
    let result = Reflect.getOwnMetadata('key', obj, 'name')
    expect(result).toEqual('value')
  })

  it('WithTargetKeyWhenDefinedOnPrototype', () => {
    let prototype = {}
    let obj = Object.create(prototype)
    Reflect.defineMetadata('key', 'value', prototype, 'name')
    let result = Reflect.getOwnMetadata('key', obj, 'name')
    expect(result).toEqual(undefined)
  })
})
