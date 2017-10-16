#pragma strict

var gameManager : gameManager;

function Awake () {
    if (gameManager.instance == null) {
        Instantiate(gameManager);
    }
}
