import './App.css'
import {Avatar} from "./components/Avatar.tsx";
import {Intro} from "./components/Intro.tsx";
import {SkillList} from "./components/SkillList.tsx";
import {useState} from "react";

function App() {
    const [count, setCount] = useState(0);

    function handleLike() {
        setCount(prev => prev + 1);
    }

  return (
    <div className="card">
      <Avatar></Avatar>
      <Intro name={'Alexandra Ergo'} sex={'Female'} onLike={() => handleLike()}></Intro>
      <SkillList count={count}></SkillList>
    </div>
  )
}

export default App
