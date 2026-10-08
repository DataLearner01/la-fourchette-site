import type { Lang } from './routes';

export type Localised = Record<Lang, string>;

// 11000 -> "11 000", with a non-breaking space so a price never wraps.
export const formatPrice = (value: number) =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
