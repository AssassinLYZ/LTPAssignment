export const generateUniqueID = (): string => {
  const timestamp: number = new Date().getTime();
  const randomSuffix: number = Math.floor(Math.random() * 10000);
  return `${timestamp}${randomSuffix}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
