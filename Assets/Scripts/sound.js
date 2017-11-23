#pragma strict

public class Sound {
	@HideInInspector
	var source : AudioSource;

	var name : String;
	var clip : AudioClip;
	var loop : boolean;

	@Range(0, 1)
	var volume : float;
	@Range(0, 6)
	var pitch : float;
}
