"""Candidate exercises.

Implement each test below and remove its ``@pytest.mark.skip`` decorator when
done. Copy patterns from ``tests/examples/test_deck_lifecycle.py`` and use the
``client`` fixture. Read the client methods in ``src/deckofcards/client.py`` and
the API docs at https://deckofcardsapi.com/.

Rules:
  - Do not modify ``src/``. The client may contain bugs.
  - If a test fails because the client is wrong, let it fail and document the
    discrepancy (a comment here is fine). Do not "fix" the client to go green.
  - Assertions should be meaningful — verify actual values (card codes, counts,
    movement), not just ``success is True``.
"""

import pytest


@pytest.mark.skip(reason="Implement this test")
def test_exercise01_unshuffled_deck_first_card_is_ace_of_spades(client):
    """Exercise 1 — Unshuffled deck: the first drawn card should be the Ace of
    Spades (``AS``).

    References:
      - "A Brand New Deck" and "Draw a Card" — https://deckofcardsapi.com/
      - Create an unshuffled deck: GET /deck/new/  (shuffled: false)
      - Draw: GET /deck/{deck_id}/draw/?count=1
      - Client: DeckOfCardsApiClient.create_new_deck, .draw_cards
    """
    raise NotImplementedError


@pytest.mark.skip(reason="Implement this test")
def test_exercise02_partial_deck_has_twelve_cards(client):
    """Exercise 2 — Partial deck built from
    ``AS, 2S, KS, AD, 2D, KD, AC, 2C, KC, AH, 2H, KH`` should have exactly 12
    remaining cards.

    References:
      - "A Partial Deck" (?cards=) — https://deckofcardsapi.com/
      - Client: DeckOfCardsApiClient.create_partial_deck
    """
    raise NotImplementedError


@pytest.mark.skip(reason="Implement this test")
@pytest.mark.parametrize("deck_count,expected_cards", [(2, 104)])
def test_exercise03_multi_deck_has_expected_card_count(client, deck_count, expected_cards):
    """Exercise 3 — Data-driven: a deck built from ``deck_count`` decks contains
    ``expected_cards`` cards (2 decks -> 104 cards).

    References:
      - Multiple decks (?decks=) — https://deckofcardsapi.com/
      - Client: DeckOfCardsApiClient.create_multi_deck
    """
    raise NotImplementedError


@pytest.mark.skip(reason="Implement this test")
def test_exercise04_pile_workflow_moves_cards_between_deck_and_pile(client):
    """Exercise 4 — Pile workflow: cards move correctly between the deck and a
    named pile.

    Note: piles operate on already-drawn cards. A card must be drawn from the
    deck before it can be added to a pile.

    References:
      - "Piles" (add / list / draw) — https://deckofcardsapi.com/
      - Client: DeckOfCardsApiClient.add_to_pile, .list_pile, .draw_from_pile
    """
    raise NotImplementedError
