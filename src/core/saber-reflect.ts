/*
 * @Author: saber2pr
 * @Date: 2019-05-08 14:52:48
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-09 12:52:47
 */
import { IReflect, reflect } from './shim/reflect'
import { IReflector } from './type'
import { decorate } from './decorate'
import { defineMetadata } from './defineMetadata'
import { deleteMetadata } from './deleteMetadata'
import { getMetadata, getOwnMetadata } from './getMetadata'
import { getMetadataKeys } from './getMetadataKeys'
import { getOwnMetadataKeys } from './getOwnMetadataKeys'
import { hasMetadata } from './hasMetadata'
import { hasOwnMetadata } from './hasOwnMetadata'
import { metadata } from './metadata'

export const Reflector: Readonly<IReflector> = {
  decorate,
  defineMetadata,
  deleteMetadata,
  getMetadata,
  getMetadataKeys,
  getOwnMetadata,
  getOwnMetadataKeys,
  hasMetadata,
  hasOwnMetadata,
  metadata
}

export const Reflect: typeof Reflector & IReflect = Object.assign(
  reflect,
  Reflector
)
