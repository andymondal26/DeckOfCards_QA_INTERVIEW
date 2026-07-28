/**
 * HTTP client for the Deck of Cards API.
 *
 * Do not modify this module. It may contain bugs; the exercise is to write
 * tests that assert the *correct* API behavior and document any discrepancies.
 */

import {
  parseDeckResponse,
  parseDrawResponse,
  parsePileResponse,
  type DeckResponse,
  type DrawResponse,
  type PileResponse,
} from './models.js';

export const DEFAULT_BASE_URL = 'https://deckofcardsapi.com/api';

export interface DeckOfCardsApiClientOptions {
  baseUrl?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export class DeckOfCardsApiClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl: typeof fetch;

  constructor(options: DeckOfCardsApiClientOptions = {}) {
    const base = options.baseUrl ?? DEFAULT_BASE_URL;
    this.baseUrl = base.replace(/\/+$/, '') + '/';
    this.timeoutMs = options.timeoutMs ?? 30_000;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  createNewDeck(_shuffle = false): Promise<DeckResponse> {
    return this.get('deck/new/shuffle/', parseDeckResponse);
  }

  shuffleDeck(deckId: string, remainingOnly = false): Promise<DeckResponse> {
    const query = remainingOnly ? '?remaining=true' : '';
    return this.get(`deck/${deckId}/shuffle/${query}`, parseDeckResponse);
  }

  drawCards(deckId: string, count = 1): Promise<DrawResponse> {
    return this.get(`deck/${deckId}/draw/?count=${count}`, parseDrawResponse);
  }

  createPartialDeck(cardCodes: Iterable<string>, shuffle = true): Promise<DeckResponse> {
    const cards = [...cardCodes].join(',');
    const prefix = shuffle ? 'shuffle/' : '';
    return this.get(`deck/new/${prefix}?card=${encodeURIComponent(cards)}`, parseDeckResponse);
  }

  createMultiDeck(deckCount: number, shuffle = true): Promise<DeckResponse> {
    const prefix = shuffle ? 'shuffle/' : '';
    return this.get(`deck/new/${prefix}?decks=${deckCount}`, parseDeckResponse);
  }

  addToPile(deckId: string, pileName: string, cardCodes: Iterable<string>): Promise<PileResponse> {
    const cards = [...cardCodes].join(',');
    return this.get(
      `deck/${deckId}/pile/${pileName}/add/?cards=${encodeURIComponent(cards)}`,
      parsePileResponse,
    );
  }

  listPile(deckId: string, pileName: string): Promise<PileResponse> {
    return this.get(`deck/${deckId}/pile/${pileName}/lists/`, parsePileResponse);
  }

  drawFromPile(deckId: string, pileName: string, count = 1): Promise<PileResponse> {
    return this.get(`deck/${deckId}/pile/${pileName}/draw/?count=${count}`, parsePileResponse);
  }

  returnCardsToDeck(deckId: string, cardCodes?: Iterable<string>): Promise<PileResponse> {
    const path =
      cardCodes === undefined
        ? `deck/${deckId}/return/`
        : `deck/${deckId}/return/?cards=${encodeURIComponent([...cardCodes].join(','))}`;
    return this.get(path, parsePileResponse);
  }

  private async get<T>(
    relativeUrl: string,
    parse: (data: Record<string, unknown>) => T,
  ): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const response = await this.fetchImpl(this.baseUrl + relativeUrl, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`Request to ${relativeUrl} failed with status ${response.status}`);
      }
      const payload = (await response.json()) as Record<string, unknown> | null;
      if (payload === null) {
        throw new Error(`Empty response from ${relativeUrl}`);
      }
      return parse(payload);
    } finally {
      clearTimeout(timer);
    }
  }
}
