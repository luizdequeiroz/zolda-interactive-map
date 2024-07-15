import DiceBox from "@3d-dice/dice-box";
import DisplayResults from "@3d-dice/dice-ui/src/displayResults";

const MyDiceBox = new DiceBox(
  "#dice-box",
  {
    id: "dice-canvas",
    assetPath: `${process.env.PUBLIC_URL}/assets/dice-box/`,
    gravity: 1,
    mass: 1,
    friction: 0.8,
    restitution: 0.5,
    angularDamping: 0.5,
    linearDamping: 0.5,
    spinForce: 6,
    throwForce: 8,
    startingHeight: 10,
    lightIntensity: 1,
    enableShadows: true,
    shadowTransparency: 0.8,
    theme: 'default',
    scale: 6
  }
);

const Display = new DisplayResults("#dice-box")

let diceInitialized = false;

const initializeDice = async () => {
  if (!diceInitialized) {
    await MyDiceBox.init();
    diceInitialized = true;

    MyDiceBox.onRollComplete = (results) => {
      Display.showResults(results)
    }
  }
};

const addDice = (notation) => {
  MyDiceBox.add(notation);
};

const resetDice = () => {
  MyDiceBox.clear();
  Display.clear();
};

export { MyDiceBox, initializeDice, addDice, resetDice, Display };
