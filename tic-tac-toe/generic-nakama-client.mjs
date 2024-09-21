import {
  Client,
  DefaultSocket,
} from "https://cdn.jsdelivr.net/npm/@heroiclabs/nakama-js@2.8.0/+esm";

const td = new TextDecoder();

export class GenericNakamaClient {
  //this.onMatchReceive(op, data)
  //this.matchSend(op, data)
  //this.matchRpc

  //this.client
  //this.session
  //this.socket
  //this.match

  constructor(
    host = "localhost",
    port = 7350,
    secure = false,
    key = "defaultkey",
  ) {
    this.client = new Client(key, host, port, secure);
  }

  async auth(email, password, username) {
    this.session = await this.client.authenticateEmail(
      email,
      password,
      true, // create if non existent
      username,
    );

    this.socket = this.client.createSocket();
    await this.socket.connect(this.session, true);

    //console.log(this.session);

    document.title = `${username} (${this.session.user_id.substring(0, 5)})`;

    const result = await this.client.rpc(this.session, this.matchRpc, {});
    const matchId = result.payload.matchIds[0];

    this.socket.onmatchdata = (matchState) => {
      const { op_code, data } = matchState;
      const data2 = data ? JSON.parse(td.decode(data)) : null;
      if (this.onMatchReceive) {
        this.onMatchReceive(op_code, data2);
      } else {
        console.log("absent onMatchReceive!", op_code, data2);
      }
    };

    this.match = await this.socket.joinMatch(matchId);

    document.title = `${username} (${this.session.user_id.substring(0, 5)}) match ${matchId.substring(0, 5)}`;
  }

  _matchSend(op, data) {
    return this.socket.sendMatchState(
      this.match.match_id,
      op,
      data !== undefined ? JSON.stringify(data) : null,
    );
  }
}
