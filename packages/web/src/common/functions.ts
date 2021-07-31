export function copyObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

const timerAsync = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const sleep = async (time: number) => {
  await timerAsync(time);
};
