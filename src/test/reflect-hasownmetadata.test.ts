import { Reflect } from '..'

describe('Reflect.hasOwnMetadata', () => {
  it('InvalidTarget', () => {
    expect(() => Reflect.hasOwnMetadata('key', undefined, undefined)).toThrow(
      TypeError
    )
  })

  it('WithoutTargetKeyWhenNotDefined', () => {
    let obj = {}
    let result = Reflect.hasOwnMetadata('key', obj, undefined)
    expect(result).toEqual(false)
  })

  it('WithoutTargetKeyWhenDefined', () => {
    let obj = {}
    Reflect.defineMetadata('key', 'value', obj, undefined)
    let result = Reflect.hasOwnMetadata('key', obj, undefined)
    expect(result).toEqual(true)
  })

  it('WithoutTargetKeyWhenDefinedOnPrototype', () => {
    let prototype = {}
    let obj = Object.create(prototype)
    Reflect.defineMetadata('key', 'value', prototype, undefined)
    let result = Reflect.hasOwnMetadata('key', obj, undefined)
    expect(result).toEqual(false)
  })

  it('WithTargetKeyWhenNotDefined', () => {
    let obj = {}
    let result = Reflect.hasOwnMetadata('key', obj, 'name')
    expect(result).toEqual(false)
  })

  it('WithTargetKeyWhenDefined', () => {
    let obj = {}
    Reflect.defineMetadata('key', 'value', obj, 'name')
    let result = Reflect.hasOwnMetadata('key', obj, 'name')
    expect(result).toEqual(true)
  })

  it('WithTargetKeyWhenDefinedOnPrototype', () => {
    let prototype = {}
    let obj = Object.create(prototype)
    Reflect.defineMetadata('key', 'value', prototype, 'name')
    let result = Reflect.hasOwnMetadata('key', obj, 'name')
    expect(result).toEqual(false)
  })
})
