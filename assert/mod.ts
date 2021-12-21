/** Check that the type of `value` is identical to type `T`.
 */
export const expectType = <T>(_: T) => {};

/** Check that the type of `value` is not identical to type `T`.
 */
export const expectNotType = <T>(_: any) => {};

/** Check that the type of `value` is assignable to type `T`.
 */

export const expectAssignable = <T>(_: T) => {};

/** Check that the type of `value` is not assignable to type `T`.
 */
export const expectNotAssignable = <T>(_: any) => {};

/** Assert the value to throw an argument error.
 */
export const expectError = <T = any>(_: T) => {};

/** Assert that the `expression` provided is marked as `@deprecated`.
 */
export const expectDeprecated = (_: any) => {};

/** Assert that the `expression` provided is not marked as `@deprecated`.
 */
export const expectNotDeprecated = (_: any) => {};

/** Will print a warning with the type of the expression passed as argument.
 */
export const printType = (_: any) => {};
