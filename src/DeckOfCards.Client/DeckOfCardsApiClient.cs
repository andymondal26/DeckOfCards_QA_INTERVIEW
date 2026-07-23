using System.Net.Http.Json;
using DeckOfCards.Client.Models;

namespace DeckOfCards.Client;

public sealed class DeckOfCardsApiClient : IDisposable
{
    public const string DefaultBaseUrl = "https://deckofcardsapi.com/api";

    private readonly HttpClient _httpClient;
    private readonly bool _ownsHttpClient;

    public DeckOfCardsApiClient(HttpClient? httpClient = null, string baseUrl = DefaultBaseUrl)
    {
        if (httpClient is null)
        {
            _httpClient = new HttpClient { BaseAddress = new Uri(baseUrl.TrimEnd('/') + "/") };
            _ownsHttpClient = true;
        }
        else
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress ??= new Uri(baseUrl.TrimEnd('/') + "/");
        }
    }

    public Task<DeckResponse> CreateNewDeckAsync(bool shuffle = false, CancellationToken cancellationToken = default) =>
        GetAsync<DeckResponse>("deck/new/shuffle/", cancellationToken);

    public Task<DeckResponse> ShuffleDeckAsync(string deckId, bool remainingOnly = false, CancellationToken cancellationToken = default)
    {
        var query = remainingOnly ? "?remaining=true" : string.Empty;
        return GetAsync<DeckResponse>($"deck/{deckId}/shuffle/{query}", cancellationToken);
    }

    public Task<DrawResponse> DrawCardsAsync(string deckId, int count = 1, CancellationToken cancellationToken = default) =>
        GetAsync<DrawResponse>($"deck/{deckId}/draw/?count={count}", cancellationToken);

    public Task<DeckResponse> CreatePartialDeckAsync(IEnumerable<string> cardCodes, bool shuffle = true, CancellationToken cancellationToken = default)
    {
        var cards = string.Join(",", cardCodes);
        var path = $"deck/new/{(shuffle ? "shuffle/" : string.Empty)}?card={Uri.EscapeDataString(cards)}";
        return GetAsync<DeckResponse>(path, cancellationToken);
    }

    public Task<DeckResponse> CreateMultiDeckAsync(int deckCount, bool shuffle = true, CancellationToken cancellationToken = default) =>
        GetAsync<DeckResponse>($"deck/new/{(shuffle ? "shuffle/" : string.Empty)}?decks={deckCount}", cancellationToken);

    public Task<PileResponse> AddToPileAsync(string deckId, string pileName, IEnumerable<string> cardCodes, CancellationToken cancellationToken = default)
    {
        var cards = string.Join(",", cardCodes);
        return GetAsync<PileResponse>($"deck/{deckId}/pile/{pileName}/add/?cards={Uri.EscapeDataString(cards)}", cancellationToken);
    }

    public Task<PileResponse> ListPileAsync(string deckId, string pileName, CancellationToken cancellationToken = default) =>
        GetAsync<PileResponse>($"deck/{deckId}/pile/{pileName}/lists/", cancellationToken);

    public Task<PileResponse> DrawFromPileAsync(string deckId, string pileName, int count = 1, CancellationToken cancellationToken = default) =>
        GetAsync<PileResponse>($"deck/{deckId}/pile/{pileName}/draw/?count={count}", cancellationToken);

    public Task<PileResponse> ReturnCardsToDeckAsync(string deckId, IEnumerable<string>? cardCodes = null, CancellationToken cancellationToken = default)
    {
        var path = cardCodes is null
            ? $"deck/{deckId}/return/"
            : $"deck/{deckId}/return/?cards={Uri.EscapeDataString(string.Join(",", cardCodes))}";
        return GetAsync<PileResponse>(path, cancellationToken);
    }

    public void Dispose()
    {
        if (_ownsHttpClient)
        {
            _httpClient.Dispose();
        }
    }

    private async Task<T> GetAsync<T>(string relativeUrl, CancellationToken cancellationToken)
    {
        var response = await _httpClient.GetAsync(relativeUrl, cancellationToken);
        response.EnsureSuccessStatusCode();
        var payload = await response.Content.ReadFromJsonAsync<T>(cancellationToken: cancellationToken);
        return payload ?? throw new InvalidOperationException($"Empty response from {relativeUrl}");
    }
}
