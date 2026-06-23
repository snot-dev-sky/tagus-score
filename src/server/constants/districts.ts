/**
 * Valid Portuguese districts (18 mainland districts + 2 autonomous regions).
 * Used to validate the `district` field on public lead submissions.
 * Note: `district` is the district, `town` is the city within it.
 */
export const DISTRICTS = [
  'Aveiro',
  'Beja',
  'Braga',
  'Bragança',
  'Castelo Branco',
  'Coimbra',
  'Évora',
  'Faro',
  'Guarda',
  'Leiria',
  'Lisboa',
  'Portalegre',
  'Porto',
  'Santarém',
  'Setúbal',
  'Viana do Castelo',
  'Vila Real',
  'Viseu',
  'Açores',
  'Madeira',
] as const;

export type District = (typeof DISTRICTS)[number];

const DISTRICT_SET: Set<string> = new Set(DISTRICTS);

export function isValidDistrict(district: string): boolean {
  return DISTRICT_SET.has(district);
}
