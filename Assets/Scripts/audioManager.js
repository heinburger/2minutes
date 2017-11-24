#pragma strict

static var instance : audioManager;

var throttleAudioLimit : float;
var sounds : Sound[];

private var throttleAudio : boolean = false;

// --------------------------------------------------------------------- UNITY METHODS
function Awake () {
	if (instance == null) {
		instance = this;
	} else if (instance != this) {
		Destroy(gameObject);
	}

	DontDestroyOnLoad(gameObject);

	for (var s : Sound in sounds) {
		s.source = gameObject.AddComponent.<AudioSource>();
		s.source.clip = s.clip;

		s.source.volume = s.volume;
		s.source.pitch = s.pitch;
		s.source.loop = s.loop;
	}
}

// --------------------------------------------------------------------- AUDIO METHODS
function playThrottledAudio (source : AudioSource) {
	if (!throttleAudio && source.enabled) {
		source.Play();
		throttleAudio = true;
		throttleCoroutine();
	}
}

function throttleCoroutine () {
	yield WaitForSeconds(throttleAudioLimit);
	throttleAudio = false;
}

function play (name : String) {
	var soundToPlay : Sound;
	for (var s : Sound in sounds) {
		if (s.name == name) {
			soundToPlay = s;
		}
	}
	if (soundToPlay == null) {
		Debug.LogWarning("Sound: " + name + " does not exist");
	} else {
		soundToPlay.source.Play();
	}
}

function stop (name : String) {
	var soundToPlay : Sound;
	for (var s : Sound in sounds) {
		if (s.name == name) {
			soundToPlay = s;
		}
	}
	if (soundToPlay == null) {
		Debug.LogWarning("Sound: " + name + " does not exist");
	} else {
		soundToPlay.source.Stop();
	}
}
