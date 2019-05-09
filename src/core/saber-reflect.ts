/*
 * @Author: saber2pr
 * @Date: 2019-05-08 14:52:48
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-09 10:25:44
 */
import { IReflect, reflect } from './shim/reflect'

export namespace Reflector {
  type MetadataKey = string | number | symbol
  type MetadataValue = any
  type MetadataMap = Map<MetadataKey, MetadataValue>
  type PropertyKey = string | symbol
  const DEFAULTKAY = 'reflect:default'

  const Metadata = new WeakMap<Object, Map<PropertyKey, MetadataMap>>()

  function getOwnMetadataMap(
    target: Object,
    propertyKey: PropertyKey = DEFAULTKAY
  ) {
    if (typeof target !== 'object' && typeof target !== 'function') {
      throw new TypeError()
    }

    const targetMetadata = Metadata.get(target)
    if (!targetMetadata) return

    const metadataMap = targetMetadata.get(propertyKey)
    if (!metadataMap) return

    return metadataMap
  }

  function getMetadataMap(
    target: Object,
    propertyKey: PropertyKey = DEFAULTKAY
  ) {
    if (Boolean(getOwnMetadataMap(target, propertyKey))) {
      return getOwnMetadataMap(target, propertyKey)
    }

    const targetMetadata = Metadata.get(Object.getPrototypeOf(target))
    if (!targetMetadata) return

    const metadataMap = targetMetadata.get(propertyKey)
    if (!metadataMap) return

    return metadataMap
  }

  export function defineMetadata(
    metadataKey: MetadataKey,
    metadataValue: MetadataValue,
    target: Object,
    propertyKey: PropertyKey = DEFAULTKAY
  ) {
    if (typeof target !== 'object' && typeof target !== 'function') {
      throw new TypeError()
    }

    if (propertyKey && !['string', 'symbol'].includes(typeof propertyKey)) {
      throw new TypeError()
    }

    const targetMetadata =
      Metadata.get(target) || new Map<PropertyKey, MetadataMap>()
    Metadata.set(target, targetMetadata)

    const metadataMap: MetadataMap =
      targetMetadata.get(propertyKey) || new Map()
    targetMetadata.set(propertyKey, metadataMap)

    metadataMap.set(metadataKey, metadataValue)
  }

  export function getMetadata<T>(
    metadataKey: MetadataKey,
    target: Object,
    propertyKey?: PropertyKey
  ): T {
    const metadataMap = getMetadataMap(target, propertyKey)
    if (!metadataMap) return

    return metadataMap.get(metadataKey)
  }

  export function getOwnMetadata<T>(
    metadataKey: MetadataKey,
    target: Object,
    propertyKey?: PropertyKey
  ): T {
    const metadataMap = getOwnMetadataMap(target, propertyKey)
    if (!metadataMap) return

    return metadataMap.get(metadataKey)
  }

  export function getMetadataKeys(target: Object, propertyKey?: PropertyKey) {
    const ownKeys = getOwnMetadataKeys(target, propertyKey)

    const protoKeys = getOwnMetadataKeys(
      Object.getPrototypeOf(target),
      propertyKey
    )

    return [].concat(...ownKeys, ...protoKeys)
  }

  export function getOwnMetadataKeys(
    target: Object,
    propertyKey?: PropertyKey
  ) {
    const ownKeys = []

    const metadataMap = getOwnMetadataMap(target, propertyKey)
    if (!metadataMap) return ownKeys

    ownKeys.push(...Array.from(metadataMap.keys()))

    return [].concat(...ownKeys)
  }

  export function metadata(
    metadataKey: MetadataKey,
    metadataValue: MetadataValue
  ) {
    return (target: Object, propertyKey?: string) =>
      defineMetadata(metadataKey, metadataValue, target, propertyKey)
  }

  export function hasMetadata(
    metadataKey: MetadataKey,
    target: Object,
    propertyKey?: PropertyKey
  ) {
    return Boolean(getMetadata(metadataKey, target, propertyKey))
  }

  export function hasOwnMetadata(
    metadataKey: MetadataKey,
    target: Object,
    propertyKey?: PropertyKey
  ) {
    return Boolean(getOwnMetadata(metadataKey, target, propertyKey))
  }

  export function deleteMetadata(
    metadataKey: MetadataKey,
    target: Object,
    propertyKey?: PropertyKey
  ) {
    const metadataMap = getOwnMetadataMap(target, propertyKey)
    if (!metadataMap) return false

    return metadataMap.delete(metadataKey)
  }

  export function decorate(
    decorators: (PropertyDecorator | MethodDecorator)[],
    target: Object | Function,
    propertyKey?: string | symbol,
    attributes?: PropertyDescriptor
  ): PropertyDescriptor {
    if (0 === decorators.length) {
      throw new TypeError()
    }

    return decorators.reduceRight(
      (target, decorator) =>
        decorator(target, propertyKey, attributes) || target,
      <any>target
    )
  }
}

export const Reflect: typeof Reflector & IReflect = Object.assign(
  reflect,
  Reflector
)
