export interface IEventForm {
  start: number;
  duration: number;
  title: string;
  _id?: string;
  intersect?: number;
}

export interface IEvents {
  data: IEventForm[];
}
