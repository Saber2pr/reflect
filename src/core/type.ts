/*
 * @Author: saber2pr
 * @Date: 2019-05-09 12:34:29
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-09 13:00:28
 */
export type MetadataKey = string | number | symbol
export type MetadataValue = any
export type MetadataMap = Map<MetadataKey, MetadataValue>
export type PropertyKey = string | symbol
export const DEFAULTKAY = 'reflect:default'

export interface IReflector {
  decorate(
    decorators: (PropertyDecorator | MethodDecorator)[],
    target: Object | Function
  ): PropertyDescriptor
  decorate(
    decorators: (PropertyDecorator | MethodDecorator)[],
    target: Object | Function,
    propertyKey: string | symbol
  ): PropertyDescriptor
  decorate(
    decorators: (PropertyDecorator | MethodDecorator)[],
    target: Object | Function,
    propertyKey: string | symbol,
    attributes: PropertyDescriptor
  ): PropertyDescriptor

  defineMetadata(
    metadataKey: string | number | symbol,
    metadataValue: any,
    target: Object
  ): void
  defineMetadata(
    metadataKey: string | number | symbol,
    metadataValue: any,
    target: Object,
    propertyKey: PropertyKey
  ): void

  deleteMetadata(metadataKey: string | number | symbol, target: Object): boolean
  deleteMetadata(
    metadataKey: string | number | symbol,
    target: Object,
    propertyKey: PropertyKey
  ): boolean

  getMetadata<T>(metadataKey: string | number | symbol, target: Object): T
  getMetadata<T>(
    metadataKey: string | number | symbol,
    target: Object,
    propertyKey: PropertyKey
  ): T

  getMetadataKeys(target: Object): (string | number | symbol)[]
  getMetadataKeys(
    target: Object,
    propertyKey: PropertyKey
  ): (string | number | symbol)[]

  getOwnMetadata<T>(metadataKey: string | number | symbol, target: Object): T
  getOwnMetadata<T>(
    metadataKey: string | number | symbol,
    target: Object,
    propertyKey: PropertyKey
  ): T

  getOwnMetadataKeys(target: Object): (string | number | symbol)[]
  getOwnMetadataKeys(
    target: Object,
    propertyKey: PropertyKey
  ): (string | number | symbol)[]

  hasMetadata(
    metadataKey: string | number | symbol,
    target: Object,
    propertyKey: PropertyKey
  ): boolean
  hasMetadata(metadataKey: string | number | symbol, target: Object): boolean

  hasOwnMetadata(metadataKey: string | number | symbol, target: Object): boolean
  hasOwnMetadata(
    metadataKey: string | number | symbol,
    target: Object,
    propertyKey: PropertyKey
  ): boolean

  metadata(
    metadataKey: string | number | symbol,
    metadataValue: any
  ): (target: Object, propertyKey?: string) => void
}
