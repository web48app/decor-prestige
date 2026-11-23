/* Opinie z wizytówki Google (Places API New).
   Odpowiedź jest cache'owana na CDN Vercel przez 24 h, więc Google
   dostaje w praktyce ok. 1 zapytanie dziennie.
   Zmienne w Vercel: GOOGLE_PLACES_KEY (wymagana)
   oraz opcjonalnie GOOGLE_PLACE_ID — jeśli jej brak, wizytówka
   jest wyszukiwana po nazwie (PLACE_QUERY). */

const DAY = 60 * 60 * 24;
const PLACE_QUERY = 'Decor Prestige Tarnów';
/* Zabezpieczenie: pokazujemy opinie tylko wizytówki, której nazwa zawiera „decor” */
const NAME_MATCH = /decor/i;

async function findPlace(key) {
  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress',
    },
    body: JSON.stringify({ textQuery: PLACE_QUERY, languageCode: 'pl', pageSize: 10 }),
  });
  if (!r.ok) throw new Error(`Google search ${r.status}`);
  const d = await r.json();
  const places = d.places || [];
  const hit = places.find((p) => NAME_MATCH.test(p.displayName?.text || ''));
  return {
    id: hit?.id || null,
    candidates: places.map((p) => `${p.displayName?.text} — ${p.formattedAddress}`),
  };
}

export default async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_KEY;
  let placeId = process.env.GOOGLE_PLACE_ID;

  if (!key) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ ok: false, reason: 'not-configured' });
  }

  try {
    if (!placeId) {
      const found = await findPlace(key);
      if (!found.id) {
        res.setHeader('Cache-Control', 'public, s-maxage=3600');
        return res.status(200).json({ ok: false, reason: 'not-found', candidates: found.candidates });
      }
      placeId = found.id;
    }

    const r = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=pl`,
      {
        headers: {
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': 'displayName,formattedAddress,rating,userRatingCount,googleMapsUri,reviews',
        },
      }
    );

    if (!r.ok) throw new Error(`Google ${r.status}`);
    const data = await r.json();

    /* Nigdy nie pokazuj opinii innej firmy */
    if (!NAME_MATCH.test(data.displayName?.text || '')) {
      res.setHeader('Cache-Control', 'public, s-maxage=3600');
      return res.status(200).json({ ok: false, reason: 'wrong-place', place: data.displayName?.text || null, placeId });
    }

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
      placeId,
      place: data.displayName?.text || null,
      address: data.formattedAddress || null,
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
