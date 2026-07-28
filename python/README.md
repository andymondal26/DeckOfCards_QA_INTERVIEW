# Python — API Testing Exercise

Test the [Deck of Cards API](https://deckofcardsapi.com/) through the provided `DeckOfCardsApiClient`.

> New here? Read the [repository overview](../README.md) first — it explains the exercise, the ground rules, and what we're evaluating. This file only covers the Python-specific setup.

**Prerequisites:** Python 3.9+, internet access

> **Suggested time:** ~30-45 minutes.

## Setup

```bash
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
pytest
```

Expect **3 passing** example tests and **4 skipped** exercises.

> **Import note:** the project uses a `src/` layout. A root `conftest.py` puts `src/` on the path so `pytest` works straight from a clone. Alternatively run `pip install -e .` and delete `conftest.py`.

## Project layout

```
python/
├── src/deckofcards/          # Library under test — do not modify
│   ├── client.py             # DeckOfCardsApiClient (requests-based)
│   └── models.py             # Response dataclasses + parsers
└── tests/
    ├── conftest.py           # Shared `client` fixture (session-scoped)
    ├── examples/test_deck_lifecycle.py       # 3 worked examples (passing)
    └── exercises/test_candidate_exercises.py # 4 exercises (skipped) — your work goes here
```

## Your task

Implement the skipped tests in `tests/exercises/test_candidate_exercises.py`. Remove each `@pytest.mark.skip` when done.

Copy patterns from `tests/examples/test_deck_lifecycle.py`. Use `DeckOfCardsApiClient` — read its methods and the API docs.

| #   | Area                                                            | Expected outcome                                                       |
| --- | --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1   | Unshuffled deck — first drawn card                              | First card of a brand-new, unshuffled deck is the Ace of Spades (`AS`) |
| 2   | Partial deck — `AS, 2S, KS, AD, 2D, KD, AC, 2C, KC, AH, 2H, KH` | Deck has exactly 12 remaining cards                                    |
| 3   | Multi-deck card count (`@pytest.mark.parametrize`, `(2, 104)`)  | 2 decks contain 104 cards                                              |
| 4   | Pile workflow                                                   | Cards move correctly between the deck and a named pile                 |

## Rules & scope

- **Do not modify** `src/`**.** The client may contain bugs. Your job is to write tests that assert the **correct** API behavior.
- If a test fails because the client is wrong, **let it fail** and briefly document the discrepancy (a comment in the test or a note in this repo is fine). Do not "fix" the client to make a test go green.
- Assertions should be meaningful — verify actual values (card codes, counts, movement), not just `success is True`.

## What we're looking for

- Correct, specific assertions that reflect real API behavior.
- Clear documentation of any bug you discover (what you expected vs. what happened).
- Readable, well-structured test code that follows the example patterns.

## Notes & gotchas

- **Tests hit the live API** at `deckofcardsapi.com`. Network access is required, and occasional slowness or rate-limiting can cause intermittent failures — re-run before assuming a real bug.
- **Piles operate on already-drawn cards.** A card must be drawn from the deck before it can be added to a pile.
- **Exercise 3 is data-driven** (`@pytest.mark.parametrize`), not a plain test.

## Useful API references

- [A Brand New Deck](https://deckofcardsapi.com/) — unshuffled deck (`deck/new/`)
- [Draw a Card](https://deckofcardsapi.com/) — `deck/{id}/draw/?count=`
- [A Partial Deck](https://deckofcardsapi.com/) — `?cards=`
- [Piles](https://deckofcardsapi.com/) — add / list / draw
- [Returning cards to the deck](https://deckofcardsapi.com/) — `deck/{id}/return/`
