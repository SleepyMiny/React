<h1>202130123 이민영</h1>

<h1>🗓 **2025-05-08 / 9번째 수업**</h1>

# React로 사고하기

React를 사용하게 되면 우리가 고려하고 있는 디자인이나 만들 앱들에 대한 생각을 바꿀 수 있습니다. React로 사용자 인터페이스를 빌드할 때, 먼저 이를 컴포넌트라는 조각으로 나눕니다. 그리고 각 컴포넌트의 다양한 시각적 상태들을 정의합니다. 마지막으로 컴포넌트들을 연결하여 데이터가 그 사이를 흘러가게 합니다. 이 자습서에서는 React로 검색할 수 있는 상품 테이블을 만드는 과정을 체계적으로 안내해 드리겠습니다.

---

## 모의 시안과 함께 시작하기

이미 JSON API와 디자이너로부터 제공받은 모의 시안이 있다고 생각해 봅시다.  
JSON API는 아래와 같은 형태의 데이터를 반환합니다.

```js
[
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
```

---

## Step 1: UI를 컴포넌트 계층으로 쪼개기

React로 UI를 구현하기 위해서는 일반적으로 다음과 같은 다섯 가지 단계를 따릅니다.

먼저 모의 시안에 있는 모든 컴포넌트와 하위 컴포넌트 주변에 박스를 그리고 그들에게 이름을 붙이세요.  
디자이너와 함께 일한다면, 그들이 이미 디자인 툴을 통하여 이 컴포넌트들에 이름을 정해두었을 수도 있습니다.

컴포넌트를 나누는 기준:
- **Programming 관점:** 단일 책임 원칙에 따라 한 번에 한 가지 일만 하도록 분리
- **CSS 관점:** 어떤 클래스 선택자를 만들지 생각
- **Design 관점:** 디자인 계층에 따른 분리

### 이 예시의 주요 컴포넌트들

- **FilterableProductTable (회색)**: 전체를 포괄
- **SearchBar (파란색)**: 사용자 입력
- **ProductTable (라벤더색)**: 리스트와 필터링
- **ProductCategoryRow (초록색)**: 카테고리 헤더
- **ProductRow (노란색)**: 제품 행

### 컴포넌트 계층 구조

```
FilterableProductTable
├── SearchBar
└── ProductTable
    ├── ProductCategoryRow
    └── ProductRow
```

---

## Step 2: React로 정적인 버전 구현하기

상호작용 없이 정적인 버전을 먼저 만들고, 이후에 상호작용 기능을 추가하는 것이 더 쉽습니다.

정적인 버전에서는 **props**만 사용하며 **state는 사용하지 않습니다.**

### 예시 코드

```jsx
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>{product.name}</span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}
      />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th><th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
```

---

## Step 3: 최소한의 데이터로 UI 상태 표현하기

### 상태로 고려할 요소는?

- **제품 목록:**  props로 전달됨
- **검색어:**  state
- **체크박스:**  state
- **필터링된 제품 목록:**  계산 가능

---

## Step 4: 상태를 어디에 둘지 결정하기

- **SearchBar**는 상태를 표시함
- **ProductTable**은 상태에 따라 제품을 필터링함
- 두 컴포넌트의 공통 부모는 **FilterableProductTable**

따라서 state는 `FilterableProductTable` 컴포넌트에 위치합니다.

### 코드 예시

```jsx
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}
```

---

## 마지막 참고: 폼 제어하기

현재 `SearchBar` 컴포넌트는 사용자 입력을 읽기 전용으로 받고 있으며, 변경 핸들러가 없기 때문에 경고가 발생합니다. 이를 해결하려면 `onChange` 핸들러를 추가해야 합니다.

```jsx
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        Only show products in stock
      </label>
    </form>
  );
}
```

---

## 정리

- UI를 컴포넌트로 나눈다.
- 정적인 버전 먼저 만든다.
- 최소 상태만 정의한다.
- 상태의 위치를 공통 부모로 끌어올린다.
- 상호작용을 위한 이벤트 핸들러를 추가한다.

React 사고방식에 익숙해지면 복잡한 UI도 쉽게 만들 수 있습니다!




<h1>🗓 **2025-04-18 / 8번째 수업(보강)**</h1>

# ⏳ React 시간 여행 기능 완벽 가이드

React의 대표적인 학습 예제 중 하나인 틱택토 게임에서는 사용자가 과거로 이동하여 게임을 다시 이어갈 수 있는 **"시간 여행 기능"** 을 구현합니다. 이 기능은 `map`, `key`, 상태 배열(history) 등 React의 여러 핵심 개념을 실습할 수 있게 해줍니다.

---

## ✅ 핵심 요약

- `history`는 매 턴마다의 `squares` 배열을 저장합니다.
- `map()`을 통해 이 이력을 순회하며 버튼 리스트를 생성합니다.
- 각 버튼 클릭 시 해당 시점의 게임 상태로 돌아갈 수 있습니다.

---

## 🧱 무브 리스트 생성 코드

```jsx
const moves = history.map((squares, move) => {
  const description = move > 0
    ? `Go to move #${move}`
    : 'Go to game start';

  return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
  );
});
```

### 📌 코드 설명
- `description` 변수는 move 번호에 따라 표시 문구를 결정합니다.
- JSX에서 각 `<li>` 항목은 고유한 `key`를 가져야 하며, 여기선 `move`를 사용합니다.
- `jumpTo(move)`는 해당 시점의 상태로 이동하는 함수입니다.

---

## 🧠 map 함수의 구조와 동작

`map()` 함수는 배열의 각 요소를 순회하며 새로운 배열을 반환합니다.

### ✅ 기본 문법
```js
array.map((element, index) => {
  return // 어떤 JSX 또는 값
});
```

### 📋 예제 상황
```js
const history = [
  [null, null, null, ..., null], // move = 0
  ['X', null, ..., null],        // move = 1
  ['X', 'O', null, ..., null]    // move = 2
];
```

이때 map의 반복:
- move = 0 → 초기 상태 (빈 보드)
- move = 1 → 첫 번째 플레이 (X 표시)
- move = 2 → 두 번째 플레이 (O 표시)

---

## 🔑 React에서 key의 역할

리스트를 렌더링할 때 React는 어떤 항목이 어떤 컴포넌트인지 식별하기 위해 `key` 값을 사용합니다.

### 🎯 key가 필요한 이유
- 리스트 항목의 변화 추적 (추가/삭제/변경)
- 성능 최적화
- 컴포넌트의 상태 유지 가능

### 예시 코드
```jsx
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

---

## ⚠️ key 누락 시 생기는 문제

React는 key가 없으면 어떤 항목이 새로 생성됐고 어떤 것이 유지됐는지 알 수 없습니다. 그 결과 불필요한 리렌더링이 발생하거나, 상태가 초기화될 수 있습니다.

### 예시: 순서 변경으로 오해받는 경우
```html
// 이전
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>

// 이후
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```
React는 이 순서 변경을 **완전히 새로운 리스트**로 간주하여 컴포넌트를 모두 새로 렌더링할 수 있습니다.

✅ 해결 방법: **각 항목에 고유한 key 지정**

---

## 🔁 key와 컴포넌트 재사용의 관계

React는 이전 렌더링 결과와 비교하여, 같은 key를 가진 항목은 기존 컴포넌트를 재사용하고, 그렇지 않은 항목은 제거하거나 새로 생성합니다.

### 작동 방식
1. 새롭게 추가된 key → 새 컴포넌트 생성
2. 사라진 key → 기존 컴포넌트 제거
3. 같은 key → 컴포넌트 재사용 + 상태 유지

> 따라서 key는 단순한 리스트 식별자가 아니라 **상태 유지의 기준**이 되므로, 신중하게 설계해야 합니다.

---


<h1>🗓 **지난 내용**</h1>


# 🎮 React 튜토리얼: 틱택토 게임 구현

---

## 📦 1. 초기 컴포넌트 만들기

React의 핵심은 **UI를 독립적이고 재사용 가능한 컴포넌트 단위로 나누는 것**
이를 통해 구조화된 인터페이스를 작성할 수 있으며 유지보수가 쉬워집니다.

### ✅ 주요 개념
- **JSX 문법**: JavaScript 안에서 HTML을 작성하듯 코드를 작성할 수 있음
- **함수형 컴포넌트**: UI를 함수로 정의하고 JSX를 반환
- **재사용성**: 같은 컴포넌트를 여러 번 사용할 수 있음
- `<button>` 엘리먼트는 사용자 인터랙션을 위한 요소

```jsx
// Square 컴포넌트: 게임판의 개별 칸 하나를 표현합니다.
function Square() {
  return <button className="square">X</button>; // 하드코딩된 값으로 'X'를 표시함
}

// Board 컴포넌트: 3x3 그리드 형태의 Square를 출력합니다.
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
```

---

## 🧠 2. props를 통해 데이터 전달하기

컴포넌트 간 **데이터 전달을 위해 props**를 사용합니다. props는 컴포넌트 외부에서 전달받는 데이터이며, 읽기 전용입니다.

### ✅ 주요 개념
- **부모 → 자식** 데이터 흐름
- **읽기 전용** 데이터: 자식이 props를 직접 변경할 수 없음
- **컴포넌트 재사용**: 각 인스턴스에 다른 데이터를 전달하여 재사용 가능
- props는 `{}` 중괄호로 구조 분해 할당
- 동적인 값 표현이 가능함

```jsx
// Square 컴포넌트는 props.value를 통해 표시할 데이터를 받습니다.
function Square({ value }) {
  return <button className="square">{value}</button>; // 전달받은 값을 버튼 안에 출력
}

// Board 컴포넌트는 각 칸에 value 값을 다르게 전달하여 Square의 재사용을 보여줍니다.
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
```

---

## 💡 3. 상태 관리 추가하기 (useState)

React에서는 UI의 동적 변화(예: 버튼 클릭, 입력 등)를 다루기 위해 **상태(state)** 를 사용합니다. 상태는 `useState` 훅을 통해 함수형 컴포넌트에서도 사용할 수 있습니다.
React의 `useState` 훅을 이용해 **컴포넌트 내부에서 상태를 관리**할 수 있습니다. 여기서는 각 칸의 값을 상태로 관리합니다.

### ✅ 주요 개념
- **useState**: 컴포넌트에 상태를 추가하는 훅
- **상태 변경 시 렌더링 자동 수행**
- **불변성 유지**: 상태 변경 시 기존 배열을 직접 수정하지 않고 복사 후 변경
- `useState`는 배열 반환: [값, 업데이트 함수]
- 배열의 복사본을 만들어서 상태를 갱신해야 안전함

```jsx
import { useState } from 'react';

// Square 컴포넌트는 클릭 시 부모로부터 받은 onSquareClick을 실행합니다.
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null)); // 초기 9칸 null 상태

  function handleClick(i) {
    const nextSquares = squares.slice(); // 불변성을 지키기 위해 배열 복사
    nextSquares[i] = 'X'; // X로 표시
    setSquares(nextSquares); // 상태 업데이트
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
```

---

## ❌ 4. X와 O를 번갈아 표시하기

`useState`를 통해 `xIsNext`라는 상태 값을 추가하면 현재 어떤 사용자인지를 알 수 있으며, 이 값을 활용하여 X와 O를 번갈아 가며 표시할 수 있습니다.

### ✅ 주요 개념
- **불리언 상태 추가**: true일 땐 X, false일 땐 O
- **상태 토글**: 클릭 후 `!xIsNext`로 변경
- **동일한 Square 클릭 방지**: 이미 값이 들어있으면 클릭 무시
- 두 명의 사용자가 번갈아 가며 게임 진행
- 현재 상태를 기준으로 다음 표시값 결정

```jsx
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // true면 X, false면 O

  function handleClick(i) {
    if (squares[i]) return; // 이미 클릭된 칸은 무시
    const nextSquares = squares.slice(); // 복사 후
    nextSquares[i] = xIsNext ? 'X' : 'O'; // 현재 차례에 따라 X 또는 O
    setSquares(nextSquares); // 상태 업데이트
    setXIsNext(!xIsNext); // 다음 사용자로 전환
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
```

---

## 🏆 5. 승자 판단하기

게임의 목표는 세 개의 동일한 기호를 일렬로 맞추는 것입니다. `calculateWinner` 함수를 통해 승자 판단 로직을 구현합니다.

### ✅ 주요 개념
- **승리 조건 정의**: 8개의 가능한 라인
- **조건 만족 여부 체크**: squares[a] === squares[b] === squares[c]
- **결과 출력**: 승자 메시지 또는 다음 차례
- 3개의 동일한 기호가 특정 인덱스 조합에서 연속되었는지를 판단
- 가로, 세로, 대각선 총 8개의 라인을 미리 정의해 검사

```jsx
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 가로
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 세로
    [0, 4, 8], [2, 4, 6]             // 대각선
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null; // 승자가 없는 경우
}
```

```jsx
const winner = calculateWinner(squares);
let status;
if (winner) {
  status = 'Winner: ' + winner;
} else {
  status = 'Next player: ' + (xIsNext ? 'X' : 'O');
}
```

이 함수는 게임이 끝났는지 판단할 때마다 호출됩니다. 상태 값인 `squares`를 기반으로 승자 또는 다음 차례를 결정합니다.

---

## 🔙 6. 이력 저장 및 되돌리기

게임의 각 상태를 이력으로 저장하면 **되돌리기 기능**을 구현할 수 있습니다. 이를 위해 게임의 상태를 배열 형태로 저장하고, 현재 이동 횟수를 추적합니다.

### ✅ 주요 개념
- **상태 이력 배열**: `history`
- **현재 이동 인덱스 추적**: `currentMove`
- **기록을 기반으로 UI 복원**: `jumpTo()` 함수로 이동
- 게임 상태를 변경하지 않고도 과거 상태로 이동 가능

```jsx
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
```

## 🔁 7. 상태 끌어올리기 (Lifting State Up)

게임의 상태를 `Board`가 아니라 `Game` 컴포넌트에서 관리하게 바꾸는 과정입니다. 이 방식은 여러 컴포넌트가 동일한 데이터를 공유할 때 필요합니다.

### ✅ 주요 개념
- **상태를 상위 컴포넌트로 이동**
- **상태와 이벤트 핸들러를 props로 전달**
- **데이터 흐름을 단일화하여 유지보수성 향상**

```jsx
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      {/* ...나머지 줄도 동일하게 구성 */}
    </>
  );
}
```