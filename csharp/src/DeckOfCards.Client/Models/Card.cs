using System.Text.Json.Serialization;

namespace DeckOfCards.Client.Models;

public sealed record Card(
    [property: JsonPropertyName("code")] string Code,
    [property: JsonPropertyName("value")] string Value,
    [property: JsonPropertyName("suit")] string Suit,
    [property: JsonPropertyName("image")] string Image);
