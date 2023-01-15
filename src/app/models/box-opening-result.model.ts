export interface BoxItemVariant {
  id: string;
  name: string;
  value: number
}

export interface BoxOpening {
  id: string;
  itemVariant: BoxItemVariant;
}

export interface BoxOpeningResult {
  openBox: {
    boxOpenings: BoxOpening[];
  }
}
