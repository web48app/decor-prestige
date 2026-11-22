/* Opinie z wizytówki Google DECOR-PRESTIGE.
   Na produkcji opinie pobierane są automatycznie z /api/reviews (Google Places API).
   Poniższe dane to zapas — używane, gdy API nie jest skonfigurowane lub nie odpowiada. */

export const googleReviews = {
  /* Link „Poproś o opinie” z panelu wizytówki (g.page/r/.../review) */
  reviewUrl:  'https://g.page/r/CZhvGK-ID0ydEBM/review',
  /* Link do wizytówki w Mapach Google */
  profileUrl: '',
  /* Ocena i liczba opinii z wizytówki — uzupełnić razem z opiniami */
  rating: null,
  total:  null,
  items: [
    /* { id: 1, name: 'Anna K.', rating: 5, date: 'Listopad 2026', text: '...' }, */
  ],
};
