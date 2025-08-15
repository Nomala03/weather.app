import type { Units } from "../types";

export const formatWind = (v: number, units: Units) => `${Math.round(v)} ${units==="metric"?"m/s":"mph"}`;
