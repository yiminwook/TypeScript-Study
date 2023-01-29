/* eslint-disable @typescript-eslint/no-unused-vars */
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
  userName = userInput;
}
//never: undefined도 반환하지 않는다.
function generateError(message: string, code: number): never {
  throw { message, errorCode: code };
}
generateError('An error occurred!', 500);
