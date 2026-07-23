using DeckOfCards.Tests.Fixtures;

namespace DeckOfCards.Tests.Exercises;

[Collection(DeckApiCollection.Name)]
public class CandidateExercises
{
    private readonly DeckOfCardsApiClient _client;

    public CandidateExercises(DeckApiFixture fixture) => _client = fixture.Client;

    /// <summary>
    /// Unshuffled deck — first drawn card should be Ace of Spades (AS).
    /// </summary>
    /// <remarks>
    /// <list type="bullet">
    /// <item><description><see href="https://deckofcardsapi.com/">Deck of Cards API</see> — "A Brand New Deck" and "Draw a Card"</description></item>
    /// <item><description><see href="https://deckofcardsapi.com/api/deck/new/">GET /deck/new/</see> — create an unshuffled deck (<c>shuffled: false</c>)</description></item>
    /// <item><description>Draw: <see href="https://deckofcardsapi.com/api/deck/3p40paa87x90/draw/?count=1">GET /deck/&#123;deck_id&#125;/draw/?count=1</see></description></item>
    /// <item><description>Client: <see cref="DeckOfCardsApiClient.CreateNewDeckAsync"/>, <see cref="DeckOfCardsApiClient.DrawCardsAsync"/></description></item>
    /// </list>
    /// </remarks>
    [Fact(Skip = "Implement this test")]
    public Task Exercise01_UnshuffledDeck_FirstCardIsAceOfSpades()
    {
        throw new NotImplementedException();
    }

    [Fact(Skip = "Implement this test")]
    public Task Exercise02_PartialDeck_HasTwelveCards()
    {
        throw new NotImplementedException();
    }

    [Theory(Skip = "Implement this test")]
    [InlineData(2, 104)]
    public Task Exercise03_MultiDeck_HasExpectedCardCount(int deckCount, int expectedCards)
    {
        throw new NotImplementedException();
    }

    [Fact(Skip = "Implement this test")]
    public Task Exercise04_PileWorkflow_MovesCardsBetweenDeckAndPile()
    {
        throw new NotImplementedException();
    }
}
