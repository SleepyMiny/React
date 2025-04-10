import { useState } from "react";

function Button1() {
    return(
        <button>Button 1</button>
    );
}

function Button2() {
    return(
        <button>Button 2</button>
    );
}

function Button3() {
    return(
        <button>Button 3</button>
    );
}


function ButtonCount() {
    const [count, setCount] = useState(0);

    function handleClick(){
        setCount(count + 1);
    }

    function resetCount(){
        setCount(0);
    }

    return(
        <dev>
        <button onClick={handleClick}>
            clicked {count} times
        </button>
        <button onClick={resetCount}>
            reset
        </button>
        </dev>
    )
}


export{Button1, Button2, Button3, ButtonCount}

