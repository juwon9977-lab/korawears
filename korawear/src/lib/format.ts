const naira = new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 })

export const formatNaira = (value: number): string => `₦${naira.format(value)}`
