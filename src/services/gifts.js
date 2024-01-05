export function getGifts() {
  const savedGifs = JSON.parse(window.localStorage.getItem('gifts')) ?? []
  return Promise.resolve(savedGifs)
}

export function generateRandomGiftName() {
  const GIFTS = ['Medias', 'Balon', 'PS5', 'X-Box', 'Tenis', 'Sudadera', 'MacBook Pro']
  const max = GIFTS.length, min = 1;
  const randomIndex = Math.floor(Math.random() * (max-min) + min)
  const randomGift = GIFTS[randomIndex];
  return randomGift
}