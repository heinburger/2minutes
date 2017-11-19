#pragma strict

var pixelsToUnits : float;
var cameraComponent : Camera;
var resolutionChanged : boolean = false;

private var height : float;

function Awake () {
	height = Screen.height;
}

function Start () {
	cameraComponent = GetComponent.<Camera>();
}

function Update () {
	if (Screen.height != height) {
		resolutionChanged = true;
		height = Screen.height;
	}
 	cameraComponent.orthographicSize = Screen.height / pixelsToUnits / 2;
}
