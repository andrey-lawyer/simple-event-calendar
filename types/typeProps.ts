export interface IFormAuthProps {
  type: "register" | "login";
}

export interface IUpdateButtonProps {
  path: string | undefined;
}

export interface IDeleteButtonProps {
  idEvent: string | undefined;
}

export interface IFormEventProps {
  type: "add" | "update";
  id?: string | undefined | string[];
}
