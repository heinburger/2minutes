#pragma strict

var pixelsToUnits : float;
var cameraComponent : Camera;

function Start () {
	cameraComponent = GetComponent.<Camera>();
}

function Update () {
 	cameraComponent.orthographicSize = Screen.height / pixelsToUnits / 2;
}