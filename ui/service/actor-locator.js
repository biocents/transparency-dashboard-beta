import {
  createActor as createHelloActor,
  canisterId as helloCanisterId
} from "../declarations/get_gives"

export const makeActor = (canisterId, createActor) => {
  return createActor(canisterId, {
    agentOptions: {
      host: process.env.NEXT_PUBLIC_IC_HOST
    }
  })
}

export function makeHelloActor() {
  console.log(helloCanisterId);
  return makeActor(helloCanisterId, createHelloActor)
}