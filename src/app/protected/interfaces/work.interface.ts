export interface WorkResponse {
  status: boolean
  message: string
  image: Image;
  factura: Image;
  _id: string;
  nombre: string;
  descripcion: string;
  folio: number;
  fecha: Date;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  public_id: string;
  secure_url: string;
}