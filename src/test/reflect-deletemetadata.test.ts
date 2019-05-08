import { Reflect } from '..'

describe('Reflect.deleteMetadata', () => {
  it('InvalidTarget', () => {
    expect(() => Reflect.deleteMetadata('key', undefined, undefined)).toThrow(
      TypeError
    )
  })

  it('WhenNotDefinedWithoutTargetKey', () => {
    let obj = {}
    let result = Reflect.deleteMetadata('key', obj, undefined)
    expect(result).toEqual(false)
  })

  it('WhenDefinedWithoutTargetKey', () => {
    let obj = {}
    Reflect.defineMetadata('key', 'value', obj, undefined)
    let result = Reflect.deleteMetadata('key', obj, undefined)
    expect(result).toEqual(true)
  })

  it('WhenDefinedOnPrototypeWithoutTargetKey', () => {
    let prototype = {}
    Reflect.defineMetadata('key', 'value', prototype, undefined)
    let obj = Object.create(prototype)
    let result = Reflect.deleteMetadata('key', obj, undefined)
    expect(result).toEqual(false)
  })

  it('AfterDeleteMetadata', () => {
    let obj = {}
    Reflect.defineMetadata('key', 'value', obj, undefined)
    Reflect.deleteMetadata('key', obj, undefined)
    let result = Reflect.hasOwnMetadata('key', obj, undefined)
    expect(result).toEqual(false)
  })
})
