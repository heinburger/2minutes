#pragma strict

var offFrameUnits : float;
var Top : BoxCollider2D;
var Bottom : BoxCollider2D;
var Right : BoxCollider2D;
var Left : BoxCollider2D;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  Top.size = new Vector2(Camera.main.ScreenToWorldPoint(new Vector3(Screen.width * 2f, 0f, 0f)).x, 1f);
  Top.offset = new Vector2(0f, Camera.main.ScreenToWorldPoint(new Vector3(0f, Screen.height, 0f)).y + 0.5f + offFrameUnits);

  Bottom.size = new Vector2(Camera.main.ScreenToWorldPoint(new Vector3(Screen.width * 2f, 0f, 0f)).x, 1f);
  Bottom.offset = new Vector2(0f, Camera.main.ScreenToWorldPoint(new Vector3(0f, 0f, 0f)).y - 0.5f - offFrameUnits);

  Left.size = new Vector2(1f, Camera.main.ScreenToWorldPoint(new Vector3(0f, Screen.height * 2f, 0f)).y);
  Left.offset = new Vector2(Camera.main.ScreenToWorldPoint(new Vector3(0, 0f, 0f)).x - 0.5f - offFrameUnits, 0f);

  Right.size = new Vector2(1f, Camera.main.ScreenToWorldPoint(new Vector3(0f, Screen.height * 2f, 0f)).y);
  Right.offset = new Vector2(Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, 0f, 0f)).x + 0.5f + offFrameUnits, 0f);
}
