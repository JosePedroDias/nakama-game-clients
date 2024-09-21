import { TicTacToeClient } from "./tic-tac-toe-client.mjs";
import { getEmail, getPassword, getUsername } from "../aux.mjs";
import { setup } from "./ui.mjs";

(async () => {
  const t3c = new TicTacToeClient();

  setup((n) => t3c.play(n));

  await t3c.auth(getEmail(), getPassword(), getUsername());
})();
