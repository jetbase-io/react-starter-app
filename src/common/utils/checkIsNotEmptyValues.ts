export const checkIsNotEmptyValues = <T>(object: T, keys: (keyof T)[]) => {
  if (!keys.length) {
    return object
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = object[key]

    if (!value) {
      throw new Error(`Required key '${String(key)}' is not defined or invalid`)
    }
  }

  return object
}
