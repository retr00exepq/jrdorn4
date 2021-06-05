//play a random sound
// (on brick collision in Break It)

export function randomSound(src) {
  let random = Math.floor(Math.random() * (6 - 1)) + 1;
  random = random.toString();
  return Function(`${src}${random}.play();`)();
}
