import { useEffect, useMemo, useState } from "react";
import type { SavedPlace, Units } from "../types";
import { fetchCityCoords, fetchWeather } from "../utils/api";

type Mode = "hourly" | "daily";

const getLS = <T,>(k: string, d: T): T => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : d; } catch { return d; }
};
const setLS = (k: string, v: any) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export default function useForecast() {
  const [units, setUnits] = useState<Units>(getLS<Units>("units","metric"));
  const [mode, setMode] = useState<Mode>(getLS<Mode>("mode","daily"));
  const [places, setPlaces] = useState<SavedPlace[]>(getLS<SavedPlace[]>("places", []));
  const [current, setCurrent] = useState<SavedPlace | null>(getLS<SavedPlace | null>("current", null));

  const [forecast, setForecast] = useState<any>(getLS<any>("forecast", null));
  const [loading, setLoading] = useState(false);

  // persist prefs
  useEffect(() => setLS("units", units), [units]);
  useEffect(() => setLS("mode", mode), [mode]);
  useEffect(() => setLS("places", places), [places]);
  useEffect(() => setLS("current", current), [current]);

  // helper: cache per-location+units
  const cacheKey = (p: SavedPlace | null, u: Units) => p ? `wx:${u}:${p.lat},${p.lon}` : "";
  const putCache = (p: SavedPlace, u: Units, data: any) => setLS(cacheKey(p, u), { t: Date.now(), data });
  const getCache = (p: SavedPlace, u: Units) => getLS<{t:number,data:any}|null>(cacheKey(p,u), null);

  // fetch with cache
  const loadForecast = async (place: SavedPlace) => {
    setLoading(true);
    const cached = getCache(place, units);
    if (cached && Date.now() - cached.t < 15 * 60 * 1000) {
      setForecast(cached.data);
      setLoading(false);
      return;
    }
    const data = await fetchWeather(place.lat, place.lon, units);
    setForecast(data);
    setLS("forecast", data);
    putCache(place, units, data);
    setLoading(false);
  };

  // select place
  const selectPlace = (p: SavedPlace) => {
    setCurrent(p);
    loadForecast(p);
  };

  // add place (search by city text)
  const addPlace = async (city: string) => {
    const [g] = await fetchCityCoords(city);
    if (!g) return;
    const newPlace: SavedPlace = { label: `${g.name}${g.state ? ", "+g.state : ""}, ${g.country}`, lat: g.lat, lon: g.lon };
    setPlaces(prev => {
      const exists = prev.find(x => x.lat===newPlace.lat && x.lon===newPlace.lon);
      const next = exists ? prev : [newPlace, ...prev].slice(0, 12);
      return next;
    });
    selectPlace(newPlace);
  };

  // delete place
  const deletePlace = (p: SavedPlace) => {
    setPlaces(prev => prev.filter(x => !(x.lat===p.lat && x.lon===p.lon)));
    if (current && current.lat===p.lat && current.lon===p.lon) {
      setCurrent(null);
      setForecast(null);
    }
  };

  // detect geolocation (permission-based)
  const detectLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(pos => {
      const p: SavedPlace = { label: "My Location", lat: pos.coords.latitude, lon: pos.coords.longitude };
      selectPlace(p);
    }, () => {});
  };

  // on first load: try cached forecast or geolocate
  useEffect(() => {
    if (current) loadForecast(current);
    else detectLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  return useMemo(() => ({
    units, setUnits,
    mode, setMode,
    places, addPlace, deletePlace, selectPlace,
    current, detectLocation,
    forecast, loading
  }), [units, mode, places, current, forecast, loading]);
}
