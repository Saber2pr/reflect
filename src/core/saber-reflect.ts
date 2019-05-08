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
    const targetMetadata =
      Metadata.get(target) || Metadata.get(Object.getPrototypeOf(target))
    if (!targetMetadata) return

    const metadataMap = targetMetadata.get(propertyKey)
    if (!metadataMap) return

    return metadataMap.get(metadataKey)
  }

  export function metadata(
    metadataKey: MetadataKey,
    metadataValue: MetadataValue
  ) {
    return (target: Object, propertyKey?: string) =>
      defineMetadata(metadataKey, metadataValue, target, propertyKey)
  }
}

export const Reflect: typeof Reflector & IReflect = Object.assign(
  reflect,
  Reflector
)
