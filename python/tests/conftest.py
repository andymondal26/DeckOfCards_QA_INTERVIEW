"""Shared pytest fixtures for the Deck of Cards test suite."""

import pytest

from deckofcards import DeckOfCardsApiClient


@pytest.fixture(scope="session")
def client():
    """A single API client shared across the whole test session.

    Mirrors the xUnit collection fixture in the .NET version: one client is
    created for all tests and disposed at the end of the run.
    """
    with DeckOfCardsApiClient() as api_client:
        yield api_client
