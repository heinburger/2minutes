#pragma strict

static var instance : audioManager;

var sounds : Sound[];
var throttleAudioLimit : float;
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
	if (!throttleAudio) {
		source.Play();
		startThrottleAudioCoroutine();
	}
}

function startThrottleAudioCoroutine () {
	throttleAudio = true;
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
