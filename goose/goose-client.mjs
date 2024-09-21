import { GenericNakamaClient } from "../generic-nakama-client.mjs";
import { OP } from "./messages.mjs";

export class GooseClient extends GenericNakamaClient {
  matchRpc = "goose_match";

  play() {
    this._matchSend(OP.ROLL_DICE);
  }

  onMatchReceive(op, state) {
    console.log(op, state);

    if (state) {
      if (state.nextToPlay) {
        console.log("nextToPlay", state.nextToPlay[0]);
      }

      if (state.diceValue) {
        console.log("diceValue", state.diceValue);
      }

      if (state.diceValue) {
        console.log("diceValue", state.diceValue);
      }

      if (state.piecePositions) {
        console.log(
          Object.entries(state.piecePositions)
            .map(([k, v]) => {
              return `${k}: ${v}`;
            })
            .join("\n"),
        );
      }
    }

    /*if (op === OP.OPPONENT_LEFT) updateFeedback("opponent left");

    if (state) {
      if (state.board) {
        updateBoard(state.board);
      }
      if (state.marks) {
        for (const [k, v] of Object.entries(state.marks)) {
          if (k === this.session.user_id) this.myMark = v;
        }
      }
      if (state.mark) {
        if (state.mark === this.myMark)
          updateFeedback(`our turn (${toMark(state.mark)})`);
        else updateFeedback("opponent playing...");
      }
      if ("winner" in state) {
        if (state.winner === this.myMark) updateFeedback("we won!");
        else if (state.winner === 0) updateFeedback("it's a tie!");
        else updateFeedback("opponent won!");
      }
    }*/
  }
}
