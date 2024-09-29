import { PhysicsClient } from "./physics-client.mjs";
import { getEmail, getPassword, getUsername } from "../aux.mjs";
import { setup } from "./ui.mjs";

(async () => {
  const cli = new PhysicsClient();

  setup((dir) => cli.sendForceBodies(dir));

  await cli.auth(getEmail(), getPassword(), getUsername());
})();
