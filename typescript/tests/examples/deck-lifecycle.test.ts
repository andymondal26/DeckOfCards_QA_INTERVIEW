import { describe, expect, it } from 'vitest';

import { client } from '../fixtures.js';

describe('Deck lifecycle (worked examples)', () => {
  it('creates a shuffled deck with 52 cards', async () => {
    const deck = await client.createNewDeck(true);

    expect(deck.success).toBe(true);
    expect(deck.deckId.trim()).not.toBe('');
    expect(deck.shuffled).toBe(true);
    expect(deck.remaining).toBe(52);
  });

  it('decrements the remaining count when drawing cards', async () => {
    const deck = await client.createNewDeck(true);
    const draw = await client.drawCards(deck.deckId, 3);

    expect(draw.success).toBe(true);
    expect(draw.cards).toHaveLength(3);
    expect(draw.remaining).toBe(49);

    const codes = draw.cards.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it('returns cards with the expected shape', async () => {
    const deck = await client.createNewDeck(true);
    const draw = await client.drawCards(deck.deckId, 1);
    expect(draw.cards).toHaveLength(1);
    const card = draw.cards[0]!;

    expect(card.code).toMatch(/^[2-9TJQKA][SHDC]$/);
    expect(['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS']).toContain(card.suit);
    expect(card.image.startsWith('https://deckofcardsapi.com/static/img/')).toBe(true);
  });
});
