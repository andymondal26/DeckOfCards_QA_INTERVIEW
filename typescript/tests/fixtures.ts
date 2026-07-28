import { DeckOfCardsApiClient } from '../src/index.js';

/**
 * A single API client shared across the test suite.
 *
 * Mirrors the collection fixture in the .NET version: one client instance is
 * reused by every test rather than constructing a new one each time.
 */
export const client = new DeckOfCardsApiClient();
