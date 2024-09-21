import { GenericNakamaClient } from "./generic-nakama-client.mjs";
import { OP } from "./messages.mjs";
import { updateBoard, updateFeedback, updateNextPlayer } from "./ui.mjs";

const toMark = (v) => (v == 1 ? "X" : v == 2 ? "O" : " ");

export class TicTacToeClient extends GenericNakamaClient {
  matchRpc = "tictactoe_match";

  play(position) {
    console.log('SENT', 'play', position);
    this._matchSend(OP.MOVE, position);
  }

  onMatchReceive(op, body) {
    console.log('RECEIVED', op, body);

    switch (op) {
      case OP.UPDATE: {
        updateBoard(body.board);

        const nextPlayer = body.nextToPlay;
        const nextMark = toMark(body.marks[nextPlayer]);
        const isItUs = this.session.user_id === nextPlayer;
        updateNextPlayer(`${isItUs ? 'our' : 'their'} time to play with ${nextMark}`);
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
