import request from "supertest";
import jwt from "jsonwebtoken";
import faker from "faker";

export const generateCookie = () => {
  // build a payload
  const payload = {
    id: faker.datatype.string(),
    email: faker.internet.email(),
  };
  // generate a signed jwt token
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // build the session object
  const session = { jwt: token };
  // turn that into a json string
  const sessionJSON = JSON.stringify(session);
  // encode as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return the format it takes in the browser (as array for supertest)
  return [`express:sess=${base64}`];
};
