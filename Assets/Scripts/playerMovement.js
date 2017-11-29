#pragma strict

var GameManager : gameManager;

private var clickTimer : float;

// ----------------------------------------------------------------------------- UNITY METHODS
function Start () {
  setPosition();
}

function Update () {
  setPosition();
}

// ----------------------------------------------------------------------------- POSITION METHODS
function setPosition () {
  transform.position = GameManager.instance.isMobile
    ? getMousePositionMobile()
    : getMousePosition();
}

function getMousePosition () : Vector3 {
  var target : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
  return new Vector3(target.x, target.y, 0f);
}

function getMousePositionMobile () {
  var target : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
  var position = new Vector3(target.x, target.y, 0f);
  if (Input.GetMouseButton(0)) {
    clickTimer += Time.deltaTime;
  }
  if (Input.GetMouseButtonUp(0)) {
    clickTimer = 0f;
  }
  if (clickTimer > 0.2f) {
    // takes 1 second
    var percent = (clickTimer - 0.2f) < 1f ? clickTimer - 0.2f : 1f;
    var offset : float = 1.5f * percent;
    var shrinkRatio : float = Input.mousePosition.y > 0f
      ? (Input.mousePosition.y / Camera.main.orthographicSize) / (offset * 8f)
      : 1f;
    var offsetY : float = shrinkRatio > 1f ? offset : offset * shrinkRatio;
    position = new Vector3(target.x, target.y + offsetY, 0f);
  }
  return position;
}
