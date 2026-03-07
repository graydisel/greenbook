import './App.css'
import {Avatar} from "./components/Avatar.tsx";
import {Intro} from "./components/Intro.tsx";
import {SkillList} from "./components/SkillList.tsx";

function App() {


  return (
    <div className="card">
      <Avatar></Avatar>
      <Intro name={'Alexandra Ergo'} sex={'Female'}></Intro>
      <SkillList></SkillList>
    </div>
  )
}

export default App
