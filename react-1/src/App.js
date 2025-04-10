import logo from "./logo.svg";
import "./App.css";
import MyB from "./MyButton";
import { Button1, Button3, ButtonCount } from "./ButtonLib";
import AboutPage from "./AboutPage";
import Profile from "./Profile";
import ShoppingList from "./ShoppingList";
import { useState } from "react";

/*export default function App() {
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

function ButtonCount1() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  function resetCount() {
    setCount(0);
  }

  return (
    <dev>
      <button onClick={handleClick}>clicked {count} times</button>
      <button onClick={resetCount}>reset</button>
    </dev>
  );
}
*/