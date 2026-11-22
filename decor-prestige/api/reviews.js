/* Opinie z wizytówki Google (Places API New).
   Odpowiedź jest cache'owana na CDN Vercel przez 24 h, więc Google
   dostaje w praktyce ok. 1 zapytanie dziennie.
   Zmienne w Vercel: GOOGLE_PLACES_KEY, GOOGLE_PLACE_ID */

const DAY = 60 * 60 * 24;

export default async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ ok: false, reason: 'not-configured' });
  }

  try {
    const r = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=pl`,
      {
        headers: {
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
        },
      }
    );

    if (!r.ok) throw new Error(`Google ${r.status}`);
    const data = await r.json();

    const reviews = (data.reviews || [])
      .filter((rv) => (rv.text?.text || rv.originalText?.text))
      .map((rv, i) => ({
        id: i,
        name: rv.authorAttribution?.displayName || 'Klient Google',
        photo: rv.authorAttribution?.photoUri || null,
        authorUrl: rv.authorAttribution?.uri || null,
        rating: rv.rating || 5,
        date: rv.relativePublishTimeDescription || '',
        text: rv.text?.text || rv.originalText?.text,
      }));

    /* 24 h na CDN, potem do 7 dni starej wersji w tle podczas odświeżania */
    res.setHeader('Cache-Control', `public, s-maxage=${DAY}, stale-while-revalidate=${DAY * 7}`);
    return res.status(200).json({
      ok: true,
      rating: data.rating ?? null,
      total: data.userRatingCount ?? 0,
      mapsUrl: data.googleMapsUri || null,
      reviews,
    });
  } catch (e) {
    /* przy błędzie krótki cache, żeby nie odpytywać Google w kółko */
    res.setHeader('Cache-Control', 'public, s-maxage=3600');
    return res.status(200).json({ ok: false, reason: 'error' });
  }
}
