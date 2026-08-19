export function formatCurrency(value: string): string {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return ''
  }

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(digits) / 100)
}

export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/\./g, '').replace(',', '.'.replace('R$', ''))) || 0
}
