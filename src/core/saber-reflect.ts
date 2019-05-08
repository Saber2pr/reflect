/*
 * @Author: saber2pr
 * @Date: 2019-05-08 14:52:48
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-08 23:21:08
 */
import { IReflect, reflect } from './shim/reflect'

export namespace Reflector {
  type MetadataKey = string | number | symbol
  type MetadataValue = any
  type MetadataMap = Map<MetadataKey, MetadataValue>
  type PropertyKey = string | symbol

  const Metadata = new WeakMap<Object, Map<PropertyKey, MetadataMap>>()

  function getOwnMetadataMap(target: Object, propertyKey?: PropertyKey) {
    const targetMetadata = Metadata.get(target)
    if (!targetMetadata) return

    const metadataMap = targetMetadata.get(propertyKey)
    if (!metadataMap) return

    return metadataMap
  }

  function getMetadataMap(target: Object, propertyKey?: PropertyKey) {
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
    propertyKey?: PropertyKey
  ) {
    if (undefined === target) {
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
    if (undefined === target) {
      throw new TypeError()
    }

    const metadataMap = getOwnMetadataMap(target, propertyKey)
    if (!metadataMap) return

    return metadataMap.get(metadataKey)
  }

  export function getMetadataKeys(target: Object, propertyKey?: PropertyKey) {
    if (undefined === target) {
      throw new TypeError()
    }

    const ownKeys = getOwnMetadataKeys(target, propertyKey)
    
    const protoKeys = Object.keys(Object.getPrototypeOf(target)).map(key =>
      Array.from(getMetadataMap(target, key).keys())
    )

    return [].concat(...protoKeys, ...ownKeys)
  }

  export function getOwnMetadataKeys(target: Object, propertyKey?: PropertyKey) {
    if (undefined === target) {
      throw new TypeError()
    }

    const ownKeys = []

    if (propertyKey) {
      const metadataMap = getOwnMetadataMap(target, propertyKey)
      if (!metadataMap) return
      ownKeys.push(...Array.from(metadataMap.keys()))
    }

    const keys = Object.keys(target).map(key =>
      Array.from(getOwnMetadataMap(target, key).keys())
    )

    return [].concat(...keys, ...ownKeys)
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
    const metadataMap = getMetadataMap(target, propertyKey)
    if (!metadataMap) return

    return metadataMap.delete(metadataKey)
  }
}

export const Reflect: typeof Reflector & IReflect = Object.assign(
  reflect,
  Reflector
)
