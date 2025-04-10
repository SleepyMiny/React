import { use, useState } from "react";
import MyButton from "./MyButton";
import { Button1, Button3, ButtonCount } from "./ButtonLib";
import AboutPage from "./AboutPage";
import Profile from "./Profile";
import ShoppingList from "./ShoppingList";


function CountState2({count,onclick}){
  return (
    <div>
      <button onClick={onclick}>
        clicked {count} times
      </button>
    </div>
  );
}

export default function App() {
  const [count,setCount] = useState(0)

  function handleClick(){
    setCount(count+1)
  }

  return (
    <div className="wrapper">
      <h1>Hello React</h1>
      <div className="buttons">
        <div className="buttonlib">
          <MyB />
          <br />
          <Button1 />
          &nbsp;
          <Button3 />
        </div>
        <div className="buttonCount">
          <ButtonCount /> <br/>
          <ButtonCount1 />
        </div>
      </div>
      <AboutPage />
      <Profile />
      <ShoppingList />
    </div>
  );
}