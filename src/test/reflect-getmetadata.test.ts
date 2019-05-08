import { Reflect } from '..'

describe('Reflect.getMetadata', () => {
  it('InvalidTarget', () => {
    expect(() => Reflect.getMetadata('key', undefined, undefined)).toThrow(
      TypeError
    )
  })

  it('WithoutTargetKeyWhenNotDefined', () => {
    let obj = {}
    let result = Reflect.getMetadata('key', obj, undefined)
    expect(result).toEqual(undefined)
  })

  it('WithoutTargetKeyWhenDefined', () => {
    let obj = {}
    Reflect.defineMetadata('key', 'value', obj, undefined)
    let result = Reflect.getMetadata('key', obj, undefined)
    expect(result).toEqual('value')
  })

  it('WithoutTargetKeyWhenDefinedOnPrototype', () => {
    let prototype = {}
    let obj = Object.create(prototype)
    Reflect.defineMetadata('key', 'value', prototype, undefined)
    let result = Reflect.getMetadata('key', obj, undefined)
    expect(result).toEqual('value')
  })

  it('WithTargetKeyWhenNotDefined', () => {
    let obj = {}
    let result = Reflect.getMetadata('key', obj, 'name')
    expect(result).toEqual(undefined)
  })

  it('WithTargetKeyWhenDefined', () => {
    let obj = {}
    Reflect.defineMetadata('key', 'value', obj, 'name')
    let result = Reflect.getMetadata('key', obj, 'name')
    expect(result).toEqual('value')
  })

  it('WithTargetKeyWhenDefinedOnPrototype', () => {
    let prototype = {}
    let obj = Object.create(prototype)
    Reflect.defineMetadata('key', 'value', prototype, 'name')
    let result = Reflect.getMetadata('key', obj, 'name')
    expect(result).toEqual('value')
  })
})
