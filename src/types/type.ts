export interface Company {
  id: string;
  name: string;
}

export interface Capacity {
  Participant: string;
  [key: string]: number | string | null | undefined;
  Total: number | string | null | undefined;
}
