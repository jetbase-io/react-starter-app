export const fmt = (n: number) =>
  n.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  })
