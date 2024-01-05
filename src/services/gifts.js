export function getGifts() {
  const savedGifs = JSON.parse(window.localStorage.getItem('gifts')) ?? []
  return Promise.resolve(savedGifs)
}