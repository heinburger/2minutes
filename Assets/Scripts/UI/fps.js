#pragma strict

var fpsText : UnityEngine.UI.Text;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  startFPSCoroutine();
}

// ----------------------------------------------------------------------------- COROUTINES
function startFPSCoroutine () {
  while (true) {
    yield WaitForSeconds(0.5);
    fpsText.text = "fps: " + 1 / Time.deltaTime;
  }
}
