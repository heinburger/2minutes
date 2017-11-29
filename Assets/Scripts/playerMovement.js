#pragma strict

var GameManager : gameManager;
var maxSpeed : float;

private var clickTimer : float;
private var mobileTouchPosition : Vector3;

// ----------------------------------------------------------------------------- UNITY METHODS
function Start () {
  setPosition();
}

function Update () {
  setPosition();
}

// ----------------------------------------------------------------------------- POSITION METHODS
function setPosition () {
  var target : Vector3 = GameManager.instance.isMobile
    ? getMousePositionMobile()
    : getMousePosition();
  transform.position = Vector3.MoveTowards(transform.position, target, maxSpeed * Time.deltaTime);
}

function getMousePosition () : Vector3 {
  var target : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
  return new Vector3(target.x, target.y, 0f);
}

function getMousePositionMobile () : Vector3 {
  var target : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
  if (Input.GetMouseButton(0)) {
    mobileTouchPosition = new Vector3(target.x, target.y, 0f);;
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
    mobileTouchPosition = new Vector3(target.x, target.y + offsetY, 0f);
  }
  return mobileTouchPosition;
}
