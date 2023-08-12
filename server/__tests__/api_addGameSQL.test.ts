import supertest from "supertest";
import { server } from "../src/Server";
import { app } from "../src/app";
import { describe, test, afterAll, beforeEach } from "@jest/globals";
import { createUser } from "../auxilaryFunctionsForTests/createUser";
import { PlayerSQL } from "../src/infrastructure/models/mySQLModels/PlayerMySQLModel";
import { GameSQL } from "../src/infrastructure/models/mySQLModels/GameMySQLModel";
import { sequelize } from "../src/infrastructure/mySQLConnection";
import { loginUser } from "../auxilaryFunctionsForTests/loginUser";
const api = supertest(app);


describe("API ADD GAME TEST", () => {
  let token:string;
  let playerId:string
  beforeEach(async () => {
    PlayerSQL.destroy({
      where: {}
    })
    GameSQL.destroy({
      where: {}
    })

    const response = await createUser(
      api,
      "password",
      "mafalda@op.pl",
      "mafalda"
    );
playerId = response.body.Player_id
    token = await loginUser(api, 'mafalda@op.pl', 'password' )

  });

  test("Should add games to player:", async () => {
   
    await api
      .post(`/api/games/${playerId}`)
      .set('Authorization', token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    await api
      .post(`/api/games/${playerId}`)
      .set('Authorization', token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const playerAfterSecondGame = await PlayerSQL.findByPk(playerId, { include: GameSQL });
    expect(playerAfterSecondGame?.Games.length).toBe(2);
  });

  afterAll((done) => {
    sequelize.close();
    server.close();
    done();
  });
});
