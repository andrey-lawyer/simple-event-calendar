export interface IEventForm {
  start: number;
  duration: number;
  title: string;
  _id?: string;
}

export interface IEvents {
  data: IEventForm[];
}
