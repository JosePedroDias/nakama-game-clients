import { GooseClient } from "./goose-client.mjs";
import { getEmail, getPassword, getUsername } from "../aux.mjs";

(async () => {
  const gc = new GooseClient();

  window.gc = gc;

  //setup((n) => gc.play(n));

  await gc.auth(getEmail(), getPassword(), getUsername());
})();
