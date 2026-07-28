"""Worked examples — copy these patterns for the candidate exercises."""

import re


def test_create_shuffled_deck_returns_valid_deck_with_52_cards(client):
    deck = client.create_new_deck(shuffle=True)

    assert deck.success is True
    assert deck.deck_id and deck.deck_id.strip()
    assert deck.shuffled is True
    assert deck.remaining == 52


def test_draw_cards_decrements_remaining_count(client):
    deck = client.create_new_deck(shuffle=True)
    draw = client.draw_cards(deck.deck_id, count=3)

    assert draw.success is True
    assert len(draw.cards) == 3
    assert draw.remaining == 49
    codes = [c.code for c in draw.cards]
    assert len(codes) == len(set(codes))


def test_draw_cards_each_card_has_expected_shape(client):
    deck = client.create_new_deck(shuffle=True)
    draw = client.draw_cards(deck.deck_id, count=1)
    assert len(draw.cards) == 1
    card = draw.cards[0]

    assert re.match(r"^[2-9TJQKA][SHDC]$", card.code)
    assert card.suit in {"SPADES", "HEARTS", "DIAMONDS", "CLUBS"}
    assert card.image.startswith("https://deckofcardsapi.com/static/img/")
