export interface Coordinates {
  lat: number;
  lng: number;
}
export interface Marker extends Coordinates {
    id: number;
    text: string;
}
