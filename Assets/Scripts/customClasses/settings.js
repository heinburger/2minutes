#pragma strict

public class Settings {
  var initialEnemyCount : int;
  var enemySpawnTime : float;
  var enemySpawnAcceleration : float;
  var heart : PowerUpSettings;
  var forcefield : PowerUpSettings;
  var star : PowerUpSettings;
  var turtle : PowerUpSettings;
  var bomb : PowerUpSettings;
  var crown : PowerUpSettings;

  function getPowerUpSettings (name : String) : PowerUpSettings {
    if (name == "HeartPowerUp") {
      return heart;
    } else if (name == "ForcefieldPowerUp") {
      return forcefield;
    } else if (name == "StarPowerUp") {
      return star;
    } else if (name == "TurtlePowerUp") {
      return turtle;
    } else if (name == "Bomb") {
      return bomb;
    } else if (name == "Crown") {
      return crown;
    } else {
      Debug.LogWarning("PowerUp: " + name + " does not exist");
      return new PowerUpSettings();
    }
  }
}
