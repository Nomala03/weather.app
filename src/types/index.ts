export type Units = "metric" | "imperial";
export type Theme = "light" | "dark" | "system";

export type GeoResult = {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
};

export type CurrentWeather = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  icon?: string;
  timeISO: string;
};

export type HourlyPoint = {
  timeISO: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
};

export type DailyPoint = {
  dateISO: string;
  tMin: number;
  tMax: number;
  precipProb?: number;
};

export type ForecastBundle = {
  place: GeoResult;
  current: CurrentWeather;
  hourly: HourlyPoint[];
  daily: DailyPoint[];
  alerts?: string[]; // simplified severe weather alerts text lines
};

export type SavedPlace = {
  label: string;   // "Johannesburg, ZA"
  lat: number;
  lon: number;
};
