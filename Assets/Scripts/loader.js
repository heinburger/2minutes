#pragma strict

var GameManager : gameManager;
var AudioManager : audioManager;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  if (GameManager.instance == null) {
    Instantiate(GameManager);
  }
  if (AudioManager.instance == null) {
    Instantiate(AudioManager);
  }
}
