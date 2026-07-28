"""Response models for the Deck of Cards API.

These are lightweight dataclasses that mirror the JSON payloads returned by
the API. Each ``from_dict`` performs a shallow parse of the relevant fields.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass(frozen=True)
class Card:
    code: str
    value: str
    suit: str
    image: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Card":
        return cls(
            code=data.get("code", ""),
            value=data.get("value", ""),
            suit=data.get("suit", ""),
            image=data.get("image", ""),
        )


@dataclass(frozen=True)
class DeckResponse:
    success: bool
    deck_id: str
    shuffled: bool
    remaining: int

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "DeckResponse":
        return cls(
            success=data.get("success", False),
            deck_id=data.get("deck_id", ""),
            shuffled=data.get("shuffled", False),
            remaining=data.get("remaining", 0),
        )


@dataclass(frozen=True)
class DrawResponse:
    success: bool
    deck_id: str
    cards: List[Card]
    remaining: int

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "DrawResponse":
        return cls(
            success=data.get("success", False),
            deck_id=data.get("deck_id", ""),
            cards=[Card.from_dict(c) for c in data.get("cards", [])],
            remaining=data.get("remaining", 0),
        )


@dataclass(frozen=True)
class PileInfo:
    remaining: int
    cards: Optional[List[Card]] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "PileInfo":
        raw_cards = data.get("cards")
        return cls(
            remaining=data.get("remaining", 0),
            cards=[Card.from_dict(c) for c in raw_cards] if raw_cards is not None else None,
        )


@dataclass(frozen=True)
class PileResponse:
    success: bool
    deck_id: str
    remaining: int
    piles: Optional[Dict[str, PileInfo]] = None
    cards: Optional[List[Card]] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "PileResponse":
        raw_piles = data.get("piles")
        raw_cards = data.get("cards")
        return cls(
            success=data.get("success", False),
            deck_id=data.get("deck_id", ""),
            remaining=data.get("remaining", 0),
            piles={name: PileInfo.from_dict(info) for name, info in raw_piles.items()}
            if raw_piles is not None
            else None,
            cards=[Card.from_dict(c) for c in raw_cards] if raw_cards is not None else None,
        )
