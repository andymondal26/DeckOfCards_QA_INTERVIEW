using System.Text.Json.Serialization;

namespace DeckOfCards.Client.Models;

public sealed record PileInfo(
    [property: JsonPropertyName("remaining")] int Remaining,
    [property: JsonPropertyName("cards")] IReadOnlyList<Card>? Cards = null);

public sealed record PileResponse(
    [property: JsonPropertyName("success")] bool Success,
    [property: JsonPropertyName("deck_id")] string DeckId,
    [property: JsonPropertyName("remaining")] int Remaining,
    [property: JsonPropertyName("piles")] Dictionary<string, PileInfo>? Piles,
    [property: JsonPropertyName("cards")] IReadOnlyList<Card>? Cards = null);
