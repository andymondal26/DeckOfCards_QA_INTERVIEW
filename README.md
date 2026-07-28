# QA Engineer — API Testing Interview

Welcome, and thanks for taking the time to work through this exercise.

This is a short, practical API-testing task built around the public
[Deck of Cards API](https://deckofcardsapi.com/). You'll be given a small client
library that talks to the API and a test suite with a few worked examples. Your
job is to **write tests** that prove the API behaves the way it should.

The same exercise is available in **three languages** — pick the one you're most
comfortable with. The tasks, rules, and evaluation criteria are identical in each.

## 1. Pick your language

Open the folder for your language and follow the README inside it. Each folder is
fully self-contained.

| Language      | Folder                       | Test runner | Quick start                          |
| ------------- | ---------------------------- | ----------- | ------------------------------------ |
| C# / .NET     | [`csharp/`](./csharp/)       | xUnit       | `dotnet test`                        |
| Python        | [`python/`](./python/)       | pytest      | `pip install -r requirements.txt && pytest` |
| TypeScript    | [`typescript/`](./typescript/) | Vitest    | `npm install && npm test`            |

Before you start, each project should report **3 passing** example tests and
**4 skipped** exercises. That's your signal the environment is set up correctly.

## 2. What you'll do

Each language folder contains:

- `src/` — a **`DeckOfCardsApiClient`** that wraps the REST API. **Treat this as
  read-only.** It may contain bugs.
- `tests/examples/` — three worked examples that already pass. Use them as your
  template for style and structure.
- `tests/exercises/` — four tests that are **skipped** and left for you to
  implement. This is where all your work goes.

Implement the four exercises below, removing the `skip` marker on each as you go.

| #   | Area                              | Expected outcome                                                              |
| --- | --------------------------------- | ----------------------------------------------------------------------------- |
| 1   | Unshuffled deck — first card      | The first card drawn from a brand-new, unshuffled deck is the Ace of Spades (`AS`) |
| 2   | Partial deck                      | A deck built from `AS, 2S, KS, AD, 2D, KD, AC, 2C, KC, AH, 2H, KH` has exactly 12 cards |
| 3   | Multi-deck card count (data-driven) | A deck built from 2 decks contains 104 cards                                |
| 4   | Pile workflow                     | Cards move correctly between the deck and a named pile                        |

The exact method names and data-driven syntax differ per language — the folder
README spells them out.

## 3. Ground rules

- **Do not modify `src/`.** The client is the "system under test." If it has a
  bug, your test should reveal it, not hide it.
- **Let failing tests fail.** If an assertion fails because the client is wrong,
  leave it failing and **document the discrepancy** (a code comment or a note is
  fine): what you expected vs. what actually happened. Do **not** change the
  client to make a test go green.
- **Assert real values.** Check card codes, counts, and card movement — not just
  `success == true`.
- **Tests hit the live API**, so network access is required. Occasional slowness
  or rate-limiting can cause flaky failures — re-run before assuming a real bug.

## 4. What we're evaluating

- **Correctness** — specific assertions that reflect real API behavior.
- **Bug hunting** — spotting when the client and the API disagree, and clearly
  documenting it.
- **Craft** — readable, well-structured tests that follow the example patterns.

We care far more about clear, correct, well-reasoned tests than about finishing
all four. If you get stuck, leave a comment explaining your thinking — we read those.

## 5. Repository structure

```
.
├── README.md            # You are here — overview + ground rules
├── csharp/              # C# / .NET (xUnit) version
│   ├── src/             #   client under test
│   └── tests/           #   examples/ + exercises/
├── python/              # Python (pytest) version
│   ├── src/
│   └── tests/
└── typescript/          # TypeScript (Vitest) version
    ├── src/
    └── tests/
```

Every language folder mirrors the same shape: a `src/` client, an `examples/`
suite that passes, and an `exercises/` suite for you to implement — plus a README
with language-specific setup and hints.

## Useful API references

All exercises can be solved with these endpoints (docs at
[deckofcardsapi.com](https://deckofcardsapi.com/)):

- **A Brand New Deck** — `deck/new/` (unshuffled)
- **Draw a Card** — `deck/{id}/draw/?count=`
- **A Partial Deck** — `deck/new/?cards=`
- **Piles** — `deck/{id}/pile/{name}/add|list|draw`
- **Returning cards** — `deck/{id}/return/`

Good luck — we're looking forward to seeing how you work.
