/*
 * @Author: saber2pr
 * @Date: 2019-05-08 14:52:48
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-08 15:09:19
 */
import { IReflect, reflect } from './shim/reflect'

export namespace Reflector {
  type MetadataKey = string | number | symbol
  type MetadataValue = any
  type MetadataMap = Map<MetadataKey, MetadataValue>

  const Metadata = new WeakMap<Object, Map<string, MetadataMap>>()

  function getOwnMetadataMap(target: Object, propertyKey?: string) {
    const targetMetadata = Metadata.get(target)
    if (!targetMetadata) return

    const metadataMap = targetMetadata.get(propertyKey)
    if (!metadataMap) return

    return metadataMap
  }

  function getMetadataMap(target: Object, propertyKey?: string) {
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
    propertyKey?: string
  ) {
    const targetMetadata =
      Metadata.get(target) || new Map<string, MetadataMap>()
    Metadata.set(target, targetMetadata)

    const metadataMap: MetadataMap =
      targetMetadata.get(propertyKey) || new Map()
    targetMetadata.set(propertyKey, metadataMap)

    metadataMap.set(metadataKey, metadataValue)
  }

  export function getMetadata<T>(
    metadataKey: MetadataKey,
    target: Object,
    propertyKey?: string
  ): T {
    const metadataMap = getMetadataMap(target, propertyKey)
    if (!metadataMap) return

    return metadataMap.get(metadataKey)
  }

  export function getOwnMetadata<T>(
    metadataKey: MetadataKey,
    target: Object,
    propertyKey?: string
  ): T {
    const metadataMap = getOwnMetadataMap(target, propertyKey)
    if (!metadataMap) return

    return metadataMap.get(metadataKey)
  }

  export function getMetadataKeys(target: Object, propertyKey?: string) {
    if (propertyKey) {
      const metadataMap = getMetadataMap(target, propertyKey)
      if (!metadataMap) return
      return Array.from(metadataMap.keys())
    }

    const maps = Object.keys(Object.getPrototypeOf(target)).map(key =>
      Array.from(getMetadataMap(target, key).keys())
    )

    return [].concat(...maps)
  }

  export function getOwnMetadataKeys(target: Object, propertyKey?: string) {
    if (propertyKey) {
      const metadataMap = getOwnMetadataMap(target, propertyKey)
      if (!metadataMap) return
      return Array.from(metadataMap.keys())
    }

    const maps = Object.keys(Object.getPrototypeOf(target)).map(key =>
      Array.from(getOwnMetadataMap(target, key).keys())
    )

    return [].concat(...maps)
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
    propertyKey?: string
  ) {
    return Boolean(getMetadata(metadataKey, target, propertyKey))
  }

  export function hasOwnMetadata(
    metadataKey: MetadataKey,
    target: Object,
    propertyKey?: string
  ) {
    return Boolean(getOwnMetadata(metadataKey, target, propertyKey))
  }

  export function deleteMetadata(
    metadataKey: MetadataKey,
    target: Object,
    propertyKey?: string
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
