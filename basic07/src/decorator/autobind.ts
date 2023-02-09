/* eslint-disable @typescript-eslint/no-unused-vars */
namespace App {
  export function Autobind(_: any, _2: string, decriptor: PropertyDescriptor) {
    const originalMethod = decriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }
}
