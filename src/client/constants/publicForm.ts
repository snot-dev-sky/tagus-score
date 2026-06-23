/**
 * Portuguese districts → concelhos used by the public lead form.
 *
 * The district keys mirror the valid districts the API accepts
 * (see server `constants/districts.ts`); `town` (concelho) is sent free-form,
 * so the lists below cover the principal concelhos of each district.
 */
export const CONCELHOS: Record<string, string[]> = {
  Aveiro: [
    'Águeda', 'Anadia', 'Aveiro', 'Estarreja', 'Ílhavo', 'Oliveira de Azeméis', 'Ovar',
    'Santa Maria da Feira', 'São João da Madeira',
  ],
  Beja: ['Aljustrel', 'Beja', 'Castro Verde', 'Ferreira do Alentejo', 'Moura', 'Odemira', 'Serpa'],
  Braga: [
    'Barcelos', 'Braga', 'Esposende', 'Fafe', 'Guimarães', 'Póvoa de Lanhoso',
    'Vila Nova de Famalicão', 'Vila Verde', 'Vizela',
  ],
  Bragança: ['Bragança', 'Macedo de Cavaleiros', 'Miranda do Douro', 'Mirandela', 'Mogadouro', 'Vinhais'],
  'Castelo Branco': ['Castelo Branco', 'Covilhã', 'Fundão', 'Idanha-a-Nova', 'Oleiros', 'Sertã'],
  Coimbra: [
    'Cantanhede', 'Coimbra', 'Figueira da Foz', 'Lousã', 'Montemor-o-Velho',
    'Oliveira do Hospital', 'Penacova', 'Soure',
  ],
  Évora: ['Borba', 'Estremoz', 'Évora', 'Montemor-o-Novo', 'Reguengos de Monsaraz', 'Vendas Novas'],
  Faro: [
    'Albufeira', 'Faro', 'Lagoa', 'Lagos', 'Loulé', 'Olhão', 'Portimão', 'Silves', 'Tavira',
    'Vila Real de Santo António',
  ],
  Guarda: ['Gouveia', 'Guarda', 'Pinhel', 'Sabugal', 'Seia', 'Trancoso', 'Vila Nova de Foz Côa'],
  Leiria: [
    'Alcobaça', 'Batalha', 'Caldas da Rainha', 'Leiria', 'Marinha Grande', 'Nazaré', 'Peniche',
    'Pombal', 'Porto de Mós',
  ],
  Lisboa: [
    'Alenquer', 'Amadora', 'Cascais', 'Lisboa', 'Loures', 'Mafra', 'Odivelas', 'Oeiras', 'Sintra',
    'Torres Vedras', 'Vila Franca de Xira',
  ],
  Portalegre: ['Campo Maior', 'Elvas', 'Nisa', 'Ponte de Sor', 'Portalegre', 'Sousel'],
  Porto: [
    'Gondomar', 'Maia', 'Matosinhos', 'Paredes', 'Penafiel', 'Porto', 'Póvoa de Varzim',
    'Santo Tirso', 'Trofa', 'Valongo', 'Vila do Conde', 'Vila Nova de Gaia',
  ],
  Santarém: [
    'Abrantes', 'Almeirim', 'Cartaxo', 'Entroncamento', 'Ourém', 'Rio Maior', 'Santarém', 'Tomar',
    'Torres Novas',
  ],
  Setúbal: [
    'Alcochete', 'Almada', 'Barreiro', 'Moita', 'Montijo', 'Palmela', 'Santiago do Cacém',
    'Seixal', 'Sesimbra', 'Setúbal', 'Sines',
  ],
  'Viana do Castelo': [
    'Arcos de Valdevez', 'Caminha', 'Monção', 'Ponte de Lima', 'Valença', 'Viana do Castelo',
    'Vila Nova de Cerveira',
  ],
  'Vila Real': ['Chaves', 'Montalegre', 'Peso da Régua', 'Valpaços', 'Vila Pouca de Aguiar', 'Vila Real'],
  Viseu: [
    'Lamego', 'Mangualde', 'Moimenta da Beira', 'Nelas', 'São Pedro do Sul', 'Tabuaço', 'Tondela',
    'Viseu',
  ],
  Açores: ['Angra do Heroísmo', 'Horta', 'Lagoa', 'Ponta Delgada', 'Praia da Vitória', 'Ribeira Grande'],
  Madeira: ['Calheta', 'Câmara de Lobos', 'Funchal', 'Machico', 'Ribeira Brava', 'Santa Cruz', 'Santana'],
};

export const DISTRICTS = Object.keys(CONCELHOS);

export const TIPOLOGIAS = ['T0', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'Moradia'];

// €0 – €10.000.000, em passos de 25.000 (default €250.000).
export const BUDGET_MIN = 0;
export const BUDGET_MAX = 10_000_000;
export const BUDGET_STEP = 25_000;
export const BUDGET_DEFAULT = 250_000;

// Formata um valor em euros com separador de milhares (ex.: €250.000).
export const formatEuro = (n: number): string => '€' + Number(n).toLocaleString('de-DE');
