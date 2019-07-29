export interface Coordinates {
  lat: number;
  lng: number;
}
export interface MarkerWithoutId extends Coordinates {
    text: string;
}
export interface Marker extends MarkerWithoutId {
    id: number;
}
