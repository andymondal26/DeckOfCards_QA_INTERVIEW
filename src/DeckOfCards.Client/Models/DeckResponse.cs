using System.Text.Json.Serialization;

namespace DeckOfCards.Client.Models;

public sealed record DeckResponse(
    [property: JsonPropertyName("success")] bool Success,
    [property: JsonPropertyName("deck_id")] string DeckId,
    [property: JsonPropertyName("shuffled")] bool Shuffled,
    [property: JsonPropertyName("remaining")] int Remaining);
