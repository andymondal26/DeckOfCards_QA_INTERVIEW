"""HTTP client for the Deck of Cards API.

Do not modify this module. It may contain bugs; the exercise is to write tests
that assert the *correct* API behavior and document any discrepancies.
"""

from __future__ import annotations

from typing import Iterable, Optional, Type, TypeVar
from urllib.parse import quote

import requests

from .models import DeckResponse, DrawResponse, PileResponse

T = TypeVar("T")

DEFAULT_BASE_URL = "https://deckofcardsapi.com/api"


class DeckOfCardsApiClient:
    """A thin wrapper over the Deck of Cards REST API."""

    def __init__(
        self,
        session: Optional[requests.Session] = None,
        base_url: str = DEFAULT_BASE_URL,
        timeout: float = 30.0,
    ) -> None:
        self._base_url = base_url.rstrip("/") + "/"
        self._timeout = timeout
        if session is None:
            self._session = requests.Session()
            self._owns_session = True
        else:
            self._session = session
            self._owns_session = False

    def create_new_deck(self, shuffle: bool = False) -> DeckResponse:
        return self._get(DeckResponse, "deck/new/shuffle/")

    def shuffle_deck(self, deck_id: str, remaining_only: bool = False) -> DeckResponse:
        query = "?remaining=true" if remaining_only else ""
        return self._get(DeckResponse, f"deck/{deck_id}/shuffle/{query}")

    def draw_cards(self, deck_id: str, count: int = 1) -> DrawResponse:
        return self._get(DrawResponse, f"deck/{deck_id}/draw/?count={count}")

    def create_partial_deck(
        self, card_codes: Iterable[str], shuffle: bool = True
    ) -> DeckResponse:
        cards = ",".join(card_codes)
        prefix = "shuffle/" if shuffle else ""
        return self._get(DeckResponse, f"deck/new/{prefix}?card={quote(cards)}")

    def create_multi_deck(self, deck_count: int, shuffle: bool = True) -> DeckResponse:
        prefix = "shuffle/" if shuffle else ""
        return self._get(DeckResponse, f"deck/new/{prefix}?decks={deck_count}")

    def add_to_pile(
        self, deck_id: str, pile_name: str, card_codes: Iterable[str]
    ) -> PileResponse:
        cards = ",".join(card_codes)
        return self._get(
            PileResponse, f"deck/{deck_id}/pile/{pile_name}/add/?cards={quote(cards)}"
        )

    def list_pile(self, deck_id: str, pile_name: str) -> PileResponse:
        return self._get(PileResponse, f"deck/{deck_id}/pile/{pile_name}/lists/")

    def draw_from_pile(
        self, deck_id: str, pile_name: str, count: int = 1
    ) -> PileResponse:
        return self._get(
            PileResponse, f"deck/{deck_id}/pile/{pile_name}/draw/?count={count}"
        )

    def return_cards_to_deck(
        self, deck_id: str, card_codes: Optional[Iterable[str]] = None
    ) -> PileResponse:
        if card_codes is None:
            path = f"deck/{deck_id}/return/"
        else:
            path = f"deck/{deck_id}/return/?cards={quote(','.join(card_codes))}"
        return self._get(PileResponse, path)

    def close(self) -> None:
        if self._owns_session:
            self._session.close()

    def __enter__(self) -> "DeckOfCardsApiClient":
        return self

    def __exit__(self, exc_type, exc, tb) -> None:
        self.close()

    def _get(self, model: Type[T], relative_url: str) -> T:
        response = self._session.get(self._base_url + relative_url, timeout=self._timeout)
        response.raise_for_status()
        payload = response.json()
        if payload is None:
            raise RuntimeError(f"Empty response from {relative_url}")
        return model.from_dict(payload)  # type: ignore[attr-defined]
