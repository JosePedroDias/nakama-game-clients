import { SnakeClient } from "./snake-client.mjs";
import { getEmail, getPassword, getUsername } from "../aux.mjs";
import { setup } from "./ui.mjs";

(async () => {
  const cli = new SnakeClient();

  setup((n) => cli.move(n));

  await cli.auth(getEmail(), getPassword(), getUsername());
})();
