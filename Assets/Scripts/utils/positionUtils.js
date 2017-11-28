#pragma strict

private var halfWidth : float = 0.5f;
private var halfHeight : float = 0.5f;

function getRandomPositionOnBoard () : Vector3 {
	var onScreenPt : Vector3 = new Vector3(Random.Range(0f, Screen.width), Random.Range(0f, Screen.height), 0f);
	var position : Vector3 = Camera.main.ScreenToWorldPoint(onScreenPt);
	position.z = 0f;
	return position;
}

function getRandomPositionOffBoard () : Vector3 {
	if (Random.value < 0.5f) {
		return Random.value < 0.5f
			? randomPositionOffBoardLeft()
			: randomPositionOffBoardTop();
	} else {
		return Random.value < 0.5f
			? randomPositionOffBoardRight()
			: randomPositionOffBoardBottom();
	}
}

function randomPositionOffBoardLeft () : Vector3 {
	var edgeScreenLeft : Vector3 = new Vector3(0f, Random.Range(0f, Screen.height), 0f);
	var position : Vector3 = Camera.main.ScreenToWorldPoint(edgeScreenLeft);
	position.x -= halfWidth;
	position.z = 0f;
	return position;
}

function randomPositionOffBoardRight () : Vector3 {
	var edgeScreenRight : Vector3 = new Vector3(Screen.width, Random.Range(0, Screen.height), 0f);
	var position : Vector3 = Camera.main.ScreenToWorldPoint(edgeScreenRight);
	position.x += halfWidth;
	position.z = 0f;
	return position;
}

function randomPositionOffBoardTop () : Vector3 {
	var edgeScreenTop : Vector3 = new Vector3(Random.Range(0f, Screen.width), Screen.height, 0f);
	var position : Vector3 = Camera.main.ScreenToWorldPoint(edgeScreenTop);
	position.y += halfHeight;
	position.z = 0f;
	return position;
}

function randomPositionOffBoardBottom () : Vector3 {
	var edgeScreenBottom : Vector3 = new Vector3(Random.Range(0f, Screen.width), 0f, 0f);
	var position : Vector3 = Camera.main.ScreenToWorldPoint(edgeScreenBottom);
	position.y -= halfHeight;
	position.z = 0f;
	return position;
}
