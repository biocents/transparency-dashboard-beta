import { useState } from "react"

// Dfinity
import { makeHelloActor } from "../service/actor-locator"

export const GreetingSection = () => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState("")
  const [greetingMessage, setGreetingMessage] = useState("")

  function onChangeName(e) {
    const newName = e.target.value
    setName(newName)
  }

  async function sayGreeting() {
    setGreetingMessage("")
    setLoading("Loading...")

    const helloActor = makeHelloActor()
    const greeting = await helloActor.get_gives()

    setLoading("")
    setGreetingMessage(greeting)
  }

  async function makeAPIcall(){
    try {
      const res = await fetch(`https://flockby.j8t.io/api/projects/`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <section>
        <h1 className="text-3xl font-bold underline">Greeting</h1>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input
          id="name"
          alt="Name"
          type="text"
          value={name}
          onChange={onChangeName}
        />
        <button className="border-2 border-dotted border-black" onClick={makeAPIcall}>Send</button>
      </section>
      <section>
        <label>Response: &nbsp;</label>
        {loading}
        {greetingMessage}
      </section>
      <section>
        <div className="flex p-8 w-96 border rounded-3xl bg-orange-200 flex-col">
          <label>Total Feathers Recieved:</label>
          <div className="flex flex-row">
            <label className="text-2xl font-black font-mono">38,400</label>
            <img className="w-10 h-10" src={"/logo.png"} alt="canister-image" />
          </div>
        </div>
      </section>
    </div>
  )
}
