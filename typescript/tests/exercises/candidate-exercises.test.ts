/**
 * Candidate exercises.
 *
 * Implement each test below and switch `it.skip` / `it.skip.each` to
 * `it` / `it.each` when done. Copy patterns from
 * `tests/examples/deck-lifecycle.test.ts` and use the shared `client`.
 * Read the client methods in `src/client.ts` and the API docs at
 * https://deckofcardsapi.com/.
 *
 * Rules:
 *   - Do not modify `src/`. The client may contain bugs.
 *   - If a test fails because the client is wrong, let it fail and document the
 *     discrepancy (a comment here is fine). Do not "fix" the client to go green.
 *   - Assertions should be meaningful — verify actual values (card codes,
 *     counts, movement), not just `success === true`.
 */

import { describe, expect, it } from 'vitest';

import { client } from '../fixtures.js';

// Keep `client`/`expect` referenced so the skipped scaffolding type-checks and
// lints cleanly before you start. Remove if you like once implementing.
void client;
void expect;

describe('Candidate exercises', () => {
  // Exercise 1 — Unshuffled deck: the first drawn card should be the Ace of
  // Spades (`AS`).
  //   - "A Brand New Deck" and "Draw a Card" — https://deckofcardsapi.com/
  //   - Create an unshuffled deck: GET /deck/new/  (shuffled: false)
  //   - Draw: GET /deck/{deck_id}/draw/?count=1
  //   - Client: createNewDeck, drawCards
  it.skip('Exercise 1: unshuffled deck — first card is the Ace of Spades', async () => {
    throw new Error('Not implemented');
  });

  // Exercise 2 — Partial deck built from
  // `AS, 2S, KS, AD, 2D, KD, AC, 2C, KC, AH, 2H, KH` should have exactly 12
  // remaining cards.
  //   - "A Partial Deck" (?cards=) — https://deckofcardsapi.com/
  //   - Client: createPartialDeck
  it.skip('Exercise 2: partial deck — has exactly 12 cards', async () => {
    throw new Error('Not implemented');
  });

  // Exercise 3 — Data-driven: a deck built from `deckCount` decks contains
  // `expectedCards` cards (2 decks -> 104 cards).
  //   - Multiple decks (?decks=) — https://deckofcardsapi.com/
  //   - Client: createMultiDeck
  it.skip.each([{ deckCount: 2, expectedCards: 104 }])(
    'Exercise 3: $deckCount decks contain $expectedCards cards',
    async ({ deckCount, expectedCards }) => {
      void deckCount;
      void expectedCards;
      throw new Error('Not implemented');
    },
  );

  // Exercise 4 — Pile workflow: cards move correctly between the deck and a
  // named pile. Piles operate on already-drawn cards, so a card must be drawn
  // from the deck before it can be added to a pile.
  //   - "Piles" (add / list / draw) — https://deckofcardsapi.com/
  //   - Client: addToPile, listPile, drawFromPile
  it.skip('Exercise 4: pile workflow — moves cards between deck and pile', async () => {
    throw new Error('Not implemented');
  });
});
