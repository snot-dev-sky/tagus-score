const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Valida o formato UUID antes de tocar na DB (a coluna form_id é uuid; uma string
// malformada faria a query rebentar com 500 em vez de devolver um 404 limpo).
export function isValidUuid(value?: string): boolean {
  return typeof value === 'string' && UUID_REGEX.test(value);
}
