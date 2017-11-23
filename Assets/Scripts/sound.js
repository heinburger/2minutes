#pragma strict

public class Sound {
	var name : String;

	@HideInInspector
	var source : AudioSource;
	var clip : AudioClip;
	var loop : boolean;

	@Range(0, 100)
	var volume : float;
	@Range(0, 100)
	var pitch : float;
}
