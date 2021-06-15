//play a random sound
// (on brick collision in Break It)

export function randomSound(type, src) {
  let random = Math.floor(Math.random() * (6 - 1)) + 1;
  random = random.toString();
  // return Function(`${src}${random}.play();`)();
  let sound = type + random;

  Object.create(src);
  console.log(src);
}
