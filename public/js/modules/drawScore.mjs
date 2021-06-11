//display score above canvas
// gameScore = myGame.score
export function drawScore(myScore, gameScore) {
  return (myScore.innerHTML = `SCORE: ${gameScore}`);
}
