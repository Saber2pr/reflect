import { Reflect } from '..'

describe('Reflect.metadata', () => {
  it('ReturnsDecoratorFunction', () => {
    let result = Reflect.metadata('key', 'value')
    expect(typeof result).toEqual('function')
  })

  it('DecoratorThrowsWithInvalidTargetWithTargetKey', () => {
    let decorator = Reflect.metadata('key', 'value')
    expect(() => decorator(undefined, 'name')).toThrow(TypeError)
  })

  it('DecoratorThrowsWithInvalidTargetKey', () => {
    let decorator = Reflect.metadata('key', 'value')
    expect(() => decorator({}, <any>{})).toThrow(TypeError)
  })

  it('OnTargetWithoutTargetKey', () => {
    let decorator = Reflect.metadata('key', 'value')
    let target = function() {}
    decorator(target)

    let result = Reflect.hasOwnMetadata('key', target, undefined)
    expect(result).toEqual(true)
  })

  it('OnTargetWithTargetKey', () => {
    let decorator = Reflect.metadata('key', 'value')
    let target = {}
    decorator(target, 'name')

    let result = Reflect.hasOwnMetadata('key', target, 'name')
    expect(result).toEqual(true)
  })
})
