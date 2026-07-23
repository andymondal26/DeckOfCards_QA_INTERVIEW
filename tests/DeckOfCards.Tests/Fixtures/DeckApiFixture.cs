namespace DeckOfCards.Tests.Fixtures;

public sealed class DeckApiFixture : IDisposable
{
    public DeckOfCardsApiClient Client { get; } = new();

    public void Dispose() => Client.Dispose();
}

[CollectionDefinition(Name)]
public class DeckApiCollection : ICollectionFixture<DeckApiFixture>
{
    public const string Name = "Deck API";
}
