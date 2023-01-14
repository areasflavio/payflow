export interface Ticket {
  id: string;
  title: string;
  due: Date;
  value: number;
  code: string;
}

export const mockTickets: Ticket[] = [
  {
    id: '131bb0af-b2b3-5310-bd26-8dc3e5cbed86',
    title: 'Tia Maria',
    due: new Date('1/10/2100'),
    value: 563.4,
    code: '105871685',
  },
  {
    id: '831739e7-4065-527b-83d4-f4a524f9c065',
    title: 'Aluguel',
    due: new Date('6/4/2103'),
    value: 754.28,
    code: '35412840',
  },
  {
    id: '2c4eb6bc-9fc1-5882-933e-b65479dc1615',
    title: 'Mercado',
    due: new Date('1/3/2033'),
    value: 621.95,
    code: '53253947',
  },
  {
    id: 'eabbed4e-d204-5fcd-80bb-8540de61aea8',
    title: 'Roupas',
    due: new Date('10/21/2023'),
    value: 247.41,
    code: '39921196',
  },
  {
    id: 'd6e31a86-5792-59cc-8c2c-ee2c132a295a',
    title: 'Tênis',
    due: new Date('9/10/2068'),
    value: 395.1,
    code: '92726268',
  },
  {
    id: '44f7216f-5a2a-5b32-95c5-3e4bda730b11',
    title: 'Monitor',
    due: new Date('11/30/2093'),
    value: 966.84,
    code: '57298371',
  },
  {
    id: 'eaf00878-62c4-5b23-896a-9f54bc91c080',
    title: 'Restaurante',
    due: new Date('11/16/2051'),
    value: 455.24,
    code: '95480576',
  },
  {
    id: 'cf903ba6-de2f-57ac-b1c4-184205b94a7d',
    title: 'Academia',
    due: new Date('7/23/2103'),
    value: 115.35,
    code: '18023326',
  },
];
