#pragma strict

var offFrameUnits : float;
var thicknessUnits : float;
var Top : BoxCollider2D;
var Bottom : BoxCollider2D;
var Right : BoxCollider2D;
var Left : BoxCollider2D;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  Top.size = new Vector2(
    Camera.main.ScreenToWorldPoint(new Vector3((Screen.width) * 2f, 0f, 0f)).x + 2f * thicknessUnits,
    thicknessUnits
  );
  Top.offset = new Vector2(
    0f,
    Camera.main.ScreenToWorldPoint(new Vector3(0f, Screen.height, 0f)).y + (thicknessUnits / 2f) + offFrameUnits
  );

  Bottom.size = new Vector2(
    Camera.main.ScreenToWorldPoint(new Vector3((Screen.width) * 2f, 0f, 0f)).x + 2f * thicknessUnits,
    thicknessUnits
  );
  Bottom.offset = new Vector2(
    0f,
    Camera.main.ScreenToWorldPoint(new Vector3(0f, 0f, 0f)).y - (thicknessUnits / 2f) - offFrameUnits
  );

  Left.size = new Vector2(
    thicknessUnits,
    Camera.main.ScreenToWorldPoint(new Vector3(0f, (Screen.height) * 2f, 0f)).y + 2f * thicknessUnits
  );
  Left.offset = new Vector2(
    Camera.main.ScreenToWorldPoint(new Vector3(0f, 0f, 0f)).x - (thicknessUnits / 2f) - offFrameUnits,
    0f
  );

  Right.size = new Vector2(
    thicknessUnits,
    Camera.main.ScreenToWorldPoint(new Vector3(0f, (Screen.height) * 2f, 0f)).y + 2f * thicknessUnits
  );
  Right.offset = new Vector2(
    Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, 0f, 0f)).x + (thicknessUnits / 2f) + offFrameUnits,
    0f
  );
}
