using System.Text.Json.Serialization;

namespace DeckOfCards.Client.Models;

public sealed record DrawResponse(
    [property: JsonPropertyName("success")] bool Success,
    [property: JsonPropertyName("deck_id")] string DeckId,
    [property: JsonPropertyName("cards")] IReadOnlyList<Card> Cards,
    [property: JsonPropertyName("remaining")] int Remaining);
