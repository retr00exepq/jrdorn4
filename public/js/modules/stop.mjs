//mark game as stopped and reset score and lives

export function stop(game) {
  //mark game as stopped and reset score/ lives
  game.state = 0;
  game.score = 0;
  game.lives = 3;
  game.won = false;
  return game;
}
