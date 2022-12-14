export const randomUUID = () => {
  let num1 = Math.random().toString(36).substring(2);
  let num2 = Math.random().toString(36).substring(2);
  let num3 = Math.random().toString(36).substring(2);

  return num1 + num2 + num3;
};
