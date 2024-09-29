import { GenericNakamaClient } from "./generic-nakama-client.mjs";
import { OP } from "./messages.mjs";
import { updateBoard, updateFeedback } from "./ui.mjs";

const LOG_MSGS = false;

export class SnakeClient extends GenericNakamaClient {
  matchRpc = "snake_match";

  move(position) {
    LOG_MSGS && console.log('SENT', 'play', position);
    this._matchSend(OP.MOVE, position);
  }

  onMatchReceive(op, body) {
    LOG_MSGS && console.log('RECEIVED', op, body);

    switch (op) {
      case OP.UPDATE: {
        updateBoard(body);
      }
      break;
      case OP.FEEDBACK: {
        updateFeedback(body);
      }
      break;
      default: {
        console.warn(`unsupported opcode: ${op}!`);
      }
    }
  }
}
