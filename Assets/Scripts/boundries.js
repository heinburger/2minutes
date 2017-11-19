#pragma strict

var BoundryX : GameObject;
var BoundryY : GameObject;

function Awake () {
	addBoundries();
}

function addBoundries () {
	var left : GameObject = Instantiate(BoundryX, Camera.main.ScreenToWorldPoint(Vector3(0, 0, 0)), Quaternion.identity);
	var bottom : GameObject = Instantiate(BoundryY, Camera.main.ScreenToWorldPoint(Vector3(0, 0, 0)), Quaternion.identity);
	var right : GameObject = Instantiate(BoundryX, Camera.main.ScreenToWorldPoint(Vector3(Screen.width, Screen.height, 0)), Quaternion.identity);
	var top : GameObject = Instantiate(BoundryY, Camera.main.ScreenToWorldPoint(Vector3(Screen.width, Screen.height, 0)), Quaternion.identity);
	left.transform.SetParent(gameObject.transform);
	bottom.transform.SetParent(gameObject.transform);
	right.transform.SetParent(gameObject.transform);
	top.transform.SetParent(gameObject.transform);
}