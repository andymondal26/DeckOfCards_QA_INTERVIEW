using DeckOfCards.Tests.Fixtures;

namespace DeckOfCards.Tests.Examples;

[Collection(DeckApiCollection.Name)]
public class DeckLifecycleTests
{
    private readonly DeckOfCardsApiClient _client;

    public DeckLifecycleTests(DeckApiFixture fixture) => _client = fixture.Client;

    [Fact]
    public async Task CreateShuffledDeck_ReturnsValidDeckWith52Cards()
    {
        var deck = await _client.CreateNewDeckAsync(shuffle: true);

        deck.Success.Should().BeTrue();
        deck.DeckId.Should().NotBeNullOrWhiteSpace();
        deck.Shuffled.Should().BeTrue();
        deck.Remaining.Should().Be(52);
    }

    [Fact]
    public async Task DrawCards_DecrementsRemainingCount()
    {
        var deck = await _client.CreateNewDeckAsync(shuffle: true);
        var draw = await _client.DrawCardsAsync(deck.DeckId, count: 3);

        draw.Success.Should().BeTrue();
        draw.Cards.Should().HaveCount(3);
        draw.Remaining.Should().Be(49);
        draw.Cards.Select(c => c.Code).Should().OnlyHaveUniqueItems();
    }

    [Fact]
    public async Task DrawCards_EachCardHasExpectedShape()
    {
        var deck = await _client.CreateNewDeckAsync(shuffle: true);
        var draw = await _client.DrawCardsAsync(deck.DeckId, count: 1);
        var card = draw.Cards.Single();

        card.Code.Should().MatchRegex("^[2-9TJQKA][SHDC]$");
        card.Suit.Should().BeOneOf("SPADES", "HEARTS", "DIAMONDS", "CLUBS");
        card.Image.Should().StartWith("https://deckofcardsapi.com/static/img/");
    }
}
