#pragma strict

static var instance : gameManager;


var time : float = 0f;

function Awake () {
	if (instance == null) {
		instance = this;
	} else if (instance != this) {
		Destroy(gameObject);
	}

	DontDestroyOnLoad(gameObject);
}
