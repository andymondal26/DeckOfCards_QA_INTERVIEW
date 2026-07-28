/**
 * Response models for the Deck of Cards API.
 *
 * The wire format uses snake_case (e.g. `deck_id`); these models expose
 * idiomatic camelCase. The `parse*` helpers map raw JSON into typed objects.
 */

export interface Card {
  code: string;
  value: string;
  suit: string;
  image: string;
}

export interface DeckResponse {
  success: boolean;
  deckId: string;
  shuffled: boolean;
  remaining: number;
}

export interface DrawResponse {
  success: boolean;
  deckId: string;
  cards: Card[];
  remaining: number;
}

export interface PileInfo {
  remaining: number;
  cards?: Card[];
}

export interface PileResponse {
  success: boolean;
  deckId: string;
  remaining: number;
  piles?: Record<string, PileInfo>;
  cards?: Card[];
}

type Json = Record<string, unknown>;

function parseCard(data: Json): Card {
  return {
    code: (data.code as string) ?? '',
    value: (data.value as string) ?? '',
    suit: (data.suit as string) ?? '',
    image: (data.image as string) ?? '',
  };
}

function parseCards(data: unknown): Card[] {
  return Array.isArray(data) ? data.map((c) => parseCard(c as Json)) : [];
}

export function parseDeckResponse(data: Json): DeckResponse {
  return {
    success: Boolean(data.success),
    deckId: (data.deck_id as string) ?? '',
    shuffled: Boolean(data.shuffled),
    remaining: (data.remaining as number) ?? 0,
  };
}

export function parseDrawResponse(data: Json): DrawResponse {
  return {
    success: Boolean(data.success),
    deckId: (data.deck_id as string) ?? '',
    cards: parseCards(data.cards),
    remaining: (data.remaining as number) ?? 0,
  };
}

function parsePileInfo(data: Json): PileInfo {
  const info: PileInfo = { remaining: (data.remaining as number) ?? 0 };
  if (data.cards !== undefined) {
    info.cards = parseCards(data.cards);
  }
  return info;
}

export function parsePileResponse(data: Json): PileResponse {
  const response: PileResponse = {
    success: Boolean(data.success),
    deckId: (data.deck_id as string) ?? '',
    remaining: (data.remaining as number) ?? 0,
  };

  if (data.piles && typeof data.piles === 'object') {
    const piles: Record<string, PileInfo> = {};
    for (const [name, info] of Object.entries(data.piles as Json)) {
      piles[name] = parsePileInfo(info as Json);
    }
    response.piles = piles;
  }

  if (data.cards !== undefined) {
    response.cards = parseCards(data.cards);
  }

  return response;
}
