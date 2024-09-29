import { GenericNakamaClient } from "./generic-nakama-client.mjs";
import { OP } from "./messages.mjs";
import { draw } from "./ui.mjs";

const LOG_MSGS = true;

const bodies = {
  grid: {
    a: 0,
    p: [0, 0],
    d: [50, 40],
  },
  b1: {
    a: 0,
    p: [0, 0],
    d: [2, 2],
    filled: true,
  }
};

export class PhysicsClient extends GenericNakamaClient {
  matchRpc = "physics_match";

  sendForceBodies(body) {
    LOG_MSGS && console.log('SENT', OP.FORCE_BODIES, body);
    this._matchSend(OP.FORCE_BODIES, body);
  }

  onMatchReceive(op, body) {
    //LOG_MSGS && console.log('RECEIVED', op, body);

    switch (op) {
      case OP.UPDATE_BODIES: {
        for (const [k, v] of Object.entries(body)) {
          const b = bodies[k];
          b.p = v.p;
          b.a = v.a;
        }
        draw(bodies);
      }
      break;
      default: {
        console.warn(`unsupported opcode: ${op}!`);
      }
    }
  }
}
