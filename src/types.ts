export type CellValue = 'mine' | number;

export interface Cell {
  value: CellValue;
  state: 'hidden' | 'revealed' | 'flagged';
}
