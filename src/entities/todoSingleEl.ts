export interface ISingleElementList {
  name: string;
  description: string;
  id: number;
  day: Date;
}
export interface InGreenElement {
  name: string;
  id: number;
  taskLevel: number;
}

export interface ISingleUserList {
  name: string;
  elem: InGreenElement[];
  id: number;
}
