#pragma strict

static var instance : audioManager;

// --------------------------------------------------------------------- UNITY METHODS
function Awake () {
	if (instance == null) {
		instance = this;
	} else if (instance != this) {
		Destroy(gameObject);
	}

	DontDestroyOnLoad(gameObject);
}

function Update () {

}

// --------------------------------------------------------------------- AUDIO METHODS
