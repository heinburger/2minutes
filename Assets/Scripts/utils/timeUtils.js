#pragma strict

function formatTime (time : float) : String {
  var jsTime : int = time < 0f ? Mathf.Floor(time * -1000) : Mathf.Floor(time * 1000);
  var milli : int = jsTime % 1000;
  var sec : int = Mathf.Floor(jsTime / 1000) % 60;
  var min : int = Mathf.Floor(jsTime / 60000);
  var minS : String = min + "";
  var secS : String = sec < 10 ? "0" + sec : sec + "";
  var milliS : String = milli < 100 ? "0" + milli : milli + "";
  milliS = milli < 10 ? "00" + milli : milliS;
  milliS = milli == 0 ? "000" : milliS;


  return minS + ":" + secS + ":" + milliS;
}
