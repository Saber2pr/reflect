import { Reflect } from '..'

describe('Reflect.defineMetadata', () => {
  it('InvalidTarget', () => {
    expect(() =>
      Reflect.defineMetadata('key', 'value', undefined, undefined)
    ).toThrow(TypeError)
  })

  it('ValidTargetWithoutTargetKey', () => {
    expect(() =>
      Reflect.defineMetadata('key', 'value', {}, undefined)
    ).not.toThrow()
  })

  it('ValidTargetWithTargetKey', () => {
    expect(() =>
      Reflect.defineMetadata('key', 'value', {}, 'name')
    ).not.toThrow()
  })
})
