import { generateRandomNumbers, init } from "./modules/init.js";
import { checkUserInputValue } from "./modules/valid.js";
import { countStrike, countBall, win } from "./modules/game.js";

import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "./assets/constant.js";
import { $buttonSubmit, $userInput, $result } from "./assets/domElement.js";

export default function BaseballGame() {
  init();
  const computerInputNumbers = generateRandomNumbers();
  let userInputNumbers = null;

  this.play = function (computerInputNumbers, userInputNumbers) {
    if (computerInputNumbers === userInputNumbers) {
      win();
      return SUCCESS_MESSAGE;
    } else {
      const strike = countStrike(computerInputNumbers, userInputNumbers);
      const ball = countBall(computerInputNumbers, userInputNumbers);

      if (strike === 0 && ball === 0) return "낫싱";
      else if (ball === 0) return `${strike}스트라이크`;
      else if (strike === 0) return `${ball}볼`;
      else return `${ball}볼 ${strike}스트라이크`;
    }
  };

  $buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (!checkUserInputValue($userInput.value)) {
      alert(ERROR_MESSAGE);
      $userInput.value = null;
      $userInput.focus();
    } else {
      userInputNumbers = Number($userInput.value);
      $result.innerHTML = this.play(computerInputNumbers, userInputNumbers);
    }
  });
}

new BaseballGame();
