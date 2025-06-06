<h1>202130123 이민영</h1>

<h1> **2025-05-29 / 13번째 수업**</h1>

# 기존 프로젝트에 React 추가하기

## React로 다시 작성할 필요는 없음

기존 프로젝트에 상호작용 요소를 일부 추가하고 싶다면, React로 전체를 다시 작성할 필요는 없습니다. 기존 스택에 React를 추가하고 상호작용할 수 있는 React 컴포넌트를 원하는 위치 어디에서나 렌더링하면 됩니다.

---

## Node.js 설치는 필수

현실적인 개발 환경에서 사용하는 대부분의 자바스크립트 도구는 Node.js 기반입니다. 온라인에서 React를 시도하거나 간단한 HTML에서 React를 사용하는 것은 가능하지만, 실무에서는 로컬에 Node.js를 설치해야 합니다.

---

## 기존 웹사이트의 하위 경로 전체에 React 사용하기

예를 들어, `example.com`이라는 기존 웹사이트가 Rails로 구현되어 있고 `example.com/some-app/` 경로 이하를 React로 구성하고 싶다고 가정해보면 다음과 같이 구성하는 것이 좋습니다.

1. React 기반 프레임워크(예: Next.js, Gatsby 등)를 사용해 React 부분을 개발
2. 해당 프레임워크의 설정에서 `/some-app`을 Base Path로 명시
3. 서버 또는 프록시를 구성하여 `/some-app/` 이하의 모든 요청이 React 앱으로 라우팅되도록 설정

이 방법을 사용하면 React 부분이 해당 프레임워크의 내장된 Best Practices의 이점을 그대로 누릴 수 있습니다.

만약 서버에서 자바스크립트를 실행할 수 없거나 원하지 않는 경우에도 React를 사용할 수 있습니다. 이때는 HTML/CSS/JS 파일을 정적으로 내보내는 방식으로 대응 가능합니다.

- Next.js: `next export`
- Gatsby: 기본적으로 정적 파일로 출력

---

## 기존 페이지 일부에만 React 사용하기

다른 기술로 구현된 기존 페이지(Rails, Backbone 등)에 일부 React 컴포넌트만 추가하고 싶은 경우에도 가능합니다. 실제로 Meta에서도 이 방식을 수년간 활용해 왔습니다.

이 방법은 두 단계로 나누어 구성됩니다.

1. 자바스크립트 환경을 설정하여 JSX 구문 사용 가능하게 만들기
2. React 컴포넌트를 해당 페이지의 원하는 위치에 렌더링

---

## 1단계: 모듈 자바스크립트 환경 구성

모든 코드를 하나의 파일에 작성하는 방식이 아니라, React 컴포넌트를 파일 단위로 분리해서 작성할 수 있게 설정해야 합니다. 이렇게 하면 다른 개발자들이 npm에 배포한 다양한 패키지도 함께 사용할 수 있습니다.

기존 애플리케이션이 이미 `import` 문을 사용하는 모듈 방식이라면, 기존 설정을 활용할 수 있습니다. JSX(`<div />`) 작성 시 문법 오류가 발생한다면 Babel 설정이 필요합니다.

- Babel React preset 적용 필요
- JSX가 브라우저에서 직접 동작하지 않기 때문입니다.

만약 모듈 설정이 아예 없다면 `Vite`를 이용해 환경을 구성하는 것을 추천합니다.

- Vite는 Rails, Django, Laravel 등 다양한 백엔드 프레임워크와 통합 가능합니다.
- 직접 통합하고 싶다면 공식 가이드를 참고해서 수동 통합도 가능합니다.

---

## 설치 및 확인 예시

터미널에서 다음 명령어 실행:

```bash
npm install react react-dom
```

그리고 메인 자바스크립트 파일(`index.js` 또는 `main.js`) 최상단에 다음 코드 작성:

```js
import { createRoot } from 'react-dom/client';

// 기존 HTML 컨텐츠를 지웁니다.
document.body.innerHTML = '<div id="app"></div>';

// React 컴포넌트를 렌더링합니다.
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

페이지 내용이 "Hello, world!"로 바뀐다면 설정이 정상적으로 작동하는 것입니다.


---


<h1> **2025-05-22 / 12번째 수업**</h1>

# React 설치 및 프로젝트 구성 가이드

---

## 1. React 소개 및 적용 방식

React는 필요한 만큼 점진적으로 적용할 수 있도록 설계된 UI 라이브러리입니다.  
간단한 HTML에 상호작용을 추가하거나, 대규모 SPA 및 풀스택 앱을 구축할 때도 유연하게 사용할 수 있습니다.

### 다음과 같은 경우에 적합합니다:

- React를 간단히 체험하고 싶을 때
- 기존 웹사이트에 동적 기능을 추가하고 싶을 때
- 처음부터 React 앱을 개발하고자 할 때

---

## 2. 설치 없이 React 체험하기

React를 설치하지 않고도 다양한 온라인 샌드박스를 통해 직접 체험할 수 있습니다.

### 대표적인 샌드박스:

- CodeSandbox
- StackBlitz
- CodePen

### 예제 코드:

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default function App() {
  return <Greeting name="World" />;
}
```

---

## 3. 로컬 환경에서 React 사용해보기

로컬에서 React를 체험하려면 다음 중 하나의 방법을 선택할 수 있습니다:

- HTML 파일에 React CDN 추가
- Node.js 설치 후 React 프로젝트 초기화

Node.js만 있다면 간단한 서버 환경도 구성할 수 있습니다.

---

## 4. 새로운 React 앱 만들기

앱을 본격적으로 개발하려면 프레임워크나 빌드 도구를 활용하는 것이 효율적입니다.

### 4-1. 프레임워크 기반 개발

#### Next.js

- CSR, SSR, SSG, RSC 모두 지원
- App Router 기반 구조 제공
- 폴더 자동 라우팅, 이미지 최적화 등 다양한 기능 내장
- Vercel에서 공식 유지 및 배포 지원

```bash
npx create-next-app@latest
```

#### React Router + Vite

- React 라우팅 라이브러리와 빠른 빌드 도구 조합
- 라우팅 설정이 자유롭고 경량화에 유리

```bash
npx create-react-router@latest
```

#### Expo (React Native)

- React Native 기반 범용 앱 프레임워크
- 모바일 앱 + 웹 앱 동시 개발 가능

```bash
npx create-expo-app@latest
```

#### RedwoodJS

- GraphQL, Prisma, 인증 시스템 내장
- 프론트와 백을 단일 프로젝트로 구성

#### TanStack Start (Beta)

- RSC, SSR, 스트리밍 등 최신 기능 실험 가능
- 고급 사용자 또는 연구 프로젝트에 적합

---

## 5. React 앱 직접 구성하기

### 5-1. 빌드 도구 설치

프레임워크 없이 직접 구성하려면, 빌드 도구를 사용해 개발 서버와 번들링을 설정해야 합니다.

#### Vite

```bash
npm create vite@latest my-app -- --template react
```

- ESBuild 기반 초고속 번들러
- JSX, TS, CSS 등 기본 지원
- React 프로젝트에서 가장 많이 사용됨

#### Parcel

```bash
npm install --save-dev parcel
```

- 설정 없는 간단한 빌드 도구
- JSX, TS, 이미지, 스타일링 자동 처리

#### Rsbuild

```bash
npx create-rsbuild --template react
```

- Rspack 기반 고성능 도구
- SWC 트랜스파일링, 대규모 앱에 적합

> React Native는 Metro 번들러를 사용합니다.

---

## 6. 공통 애플리케이션 기능 구성

### 라우팅

- URL 경로에 따라 컴포넌트 렌더링
- 중첩 경로, 파라미터, 쿼리 문자열 지원

추천 도구:

- React Router
- TanStack Router

### 데이터 패칭

- API 요청 후 상태 관리
- 로딩/에러/성공 상태, 캐싱, 재요청 등 포함

추천 라이브러리:

- REST API: React Query, SWR, RTK Query
- GraphQL: Apollo Client, Relay

> 라우터 수준에서 사전 패칭하는 방식이 성능에 유리합니다.

### 코드 스플리팅

- React.lazy, dynamic import 등을 활용해 필요할 때만 코드 로딩
- 초기 로딩 속도 향상에 기여

---

## 7. 렌더링 전략

| 전략 | 설명 |
|------|------|
| SPA | 클라이언트에서 페이지를 동적으로 렌더링 |
| SSR | 서버에서 페이지를 렌더링 후 HTML 전송 |
| SSG | 빌드 시 정적인 HTML 파일을 생성 |
| RSC | 서버 전용 React 컴포넌트로 최적화 |

> Next.js의 App Router는 이 모든 전략을 경로별로 조합 가능

---

### SPA의 특징

- 하나의 HTML을 로드 후, JS로 모든 페이지를 제어
- 초기 로딩 속도가 느릴 수 있음
- 대부분의 빌드 도구에서 기본 구조로 채택

> SSR, SSG, RSC는 구현은 복잡하지만, SEO 및 초기 성능 개선에 유리

---

## 8. 정리

- 빠르게 시작하려면: **Next.js** 또는 **Vite + React Router**
- 직접 구성하고 싶다면: **Vite, Parcel, Rsbuild**
- 규모 있는 프로젝트라면 프레임워크 사용이 확장성과 성능 면에서 유리

---


<h1> **2025-05-15 / 11번째 수업**</h1>

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

## 폼 제어하기

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

## Step 5: 역 데이터 흐름 추가하기

지금까지 우리는 계층 구조 아래로 흐르는 `props`와 `state`를 사용해 앱을 만들었습니다.  
이제 사용자 입력에 따라 상태를 변경하려면 **반대 방향의 데이터 흐름**이 필요합니다.

React는 데이터 흐름을 명시적으로 보여줍니다. 이는 전통적인 양방향 바인딩보다는 약간의 타이핑이 더 필요하지만, 데이터 흐름이 더 명확하게 드러나기 때문에 유지보수에 유리합니다.

---

### 문제: 왜 입력을 해도 UI가 바뀌지 않을까?

앞에서 만든 정적 버전에서는 아래 코드처럼 `<input value={filterText} />`로 되어 있어서, `filterText` state 값이 변하지 않으면 input 값도 고정됩니다.

따라서 사용자가 키보드로 타이핑을 해도 UI에 반영되지 않습니다.  
이제 사용자의 입력을 받아 state를 바꾸고, 그것이 다시 UI에 반영되도록 구현해야 합니다.

---

### 해결 방법: 역방향 데이터 흐름 설정

`SearchBar`가 부모인 `FilterableProductTable`의 state를 변경할 수 있도록 하기 위해서,  
**state 변경 함수인 `setFilterText`와 `setInStockOnly`를 props로 내려보냅니다.**

####  변경된 FilterableProductTable

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

###  변경된 SearchBar

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
        value={filterText}
        placeholder="Search..."
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

이제 사용자가 검색어를 입력하거나 체크박스를 클릭하면  
**상위 컴포넌트인 `FilterableProductTable`의 state가 바뀌고**,  
그 값이 다시 하위 컴포넌트로 내려가 UI가 업데이트되는 구조가 됩니다.

이것이 바로 **React의 단방향 데이터 흐름** 원칙입니다.

---

##  애플리케이션 완성!

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
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

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
        value={filterText} placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
         <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

이제 우리의 제품 테이블 앱은 다음과 같은 기능을 갖추게 됩니다:

- 텍스트 검색 기능
- "재고 있는 제품만 보기" 기능
- 실시간으로 UI 업데이트

---




<h1> **2025-05-08 / 9번째 수업**</h1>

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

##  Props vs State

React에는 **두 가지 주요 데이터 모델**이 있습니다: `props`와 `state`.  
이 둘은 역할이 다르며, 각각의 사용 목적이 명확합니다.

---

###  Props란?

- **"부모 → 자식" 방향으로 데이터를 전달**하는 방식
- 마치 **함수의 매개변수**처럼 사용
- 자식 컴포넌트의 외관을 커스터마이징할 수 있음
- **읽기 전용** (자식 컴포넌트는 props를 수정할 수 없음)

#### 예시

```jsx
function Button({ color }) {
  return <button style={{ color }}>Click me</button>;
}

function Form() {
  return <Button color="blue" />;
}
```

---

###  State란?

- 컴포넌트가 **내부적으로 기억하는 데이터(메모리)**
- 시간이 지나거나 사용자의 입력에 따라 **변경 가능**
- 컴포넌트의 **상호작용(interaction)**을 가능하게 함

#### 예시

```jsx
function Button() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? 'Hello!' : 'Hover me'}
    </button>
  );
}
```

---

### 함께 동작하는 구조

- 일반적으로 **state는 부모 컴포넌트에 저장**됩니다.
- 부모 컴포넌트는 해당 state를 **자식 컴포넌트에 props로 전달**합니다.
- 자식 컴포넌트는 전달받은 값을 읽기만 하며, 이벤트 핸들러 등을 통해 부모의 state를 변경 요청할 수 있습니다.

이런 구조가 바로 React의 **단방향 데이터 흐름(one-way data flow)** 입니다.

---








<h1> **2025-04-18 / 8번째 수업(보강)**</h1>

#  React 시간 여행 기능 완벽 가이드

React의 대표적인 학습 예제 중 하나인 틱택토 게임에서는 사용자가 과거로 이동하여 게임을 다시 이어갈 수 있는 **"시간 여행 기능"** 을 구현합니다. 이 기능은 `map`, `key`, 상태 배열(history) 등 React의 여러 핵심 개념을 실습할 수 있게 해줍니다.

---

##  핵심 요약

- `history`는 매 턴마다의 `squares` 배열을 저장합니다.
- `map()`을 통해 이 이력을 순회하며 버튼 리스트를 생성합니다.
- 각 버튼 클릭 시 해당 시점의 게임 상태로 돌아갈 수 있습니다.

---

##  무브 리스트 생성 코드

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

###  코드 설명
- `description` 변수는 move 번호에 따라 표시 문구를 결정합니다.
- JSX에서 각 `<li>` 항목은 고유한 `key`를 가져야 하며, 여기선 `move`를 사용합니다.
- `jumpTo(move)`는 해당 시점의 상태로 이동하는 함수입니다.

---

##  map 함수의 구조와 동작

`map()` 함수는 배열의 각 요소를 순회하며 새로운 배열을 반환합니다.

###  기본 문법
```js
array.map((element, index) => {
  return // 어떤 JSX 또는 값
});
```

###  예제 상황
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

##  React에서 key의 역할

리스트를 렌더링할 때 React는 어떤 항목이 어떤 컴포넌트인지 식별하기 위해 `key` 값을 사용합니다.

###  key가 필요한 이유
- 리스트 항목의 변화 추적 (추가/삭제/변경)
- 성능 최적화
- 컴포넌트의 상태 유지 가능

### 예시 코드
```jsx
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

---

##  key 누락 시 생기는 문제

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

 해결 방법: **각 항목에 고유한 key 지정**

---

##  key와 컴포넌트 재사용의 관계

React는 이전 렌더링 결과와 비교하여, 같은 key를 가진 항목은 기존 컴포넌트를 재사용하고, 그렇지 않은 항목은 제거하거나 새로 생성합니다.

### 작동 방식
1. 새롭게 추가된 key → 새 컴포넌트 생성
2. 사라진 key → 기존 컴포넌트 제거
3. 같은 key → 컴포넌트 재사용 + 상태 유지

> 따라서 key는 단순한 리스트 식별자가 아니라 **상태 유지의 기준**이 되므로, 신중하게 설계해야 합니다.

---


<h1> **지난 내용**</h1>


#  React 튜토리얼: 틱택토 게임 구현

---

##  1. 초기 컴포넌트 만들기

React의 핵심은 **UI를 독립적이고 재사용 가능한 컴포넌트 단위로 나누는 것**
이를 통해 구조화된 인터페이스를 작성할 수 있으며 유지보수가 쉬워집니다.

###  주요 개념
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

##  2. props를 통해 데이터 전달하기

컴포넌트 간 **데이터 전달을 위해 props**를 사용합니다. props는 컴포넌트 외부에서 전달받는 데이터이며, 읽기 전용입니다.

###  주요 개념
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

##  3. 상태 관리 추가하기 (useState)

React에서는 UI의 동적 변화(예: 버튼 클릭, 입력 등)를 다루기 위해 **상태(state)** 를 사용합니다. 상태는 `useState` 훅을 통해 함수형 컴포넌트에서도 사용할 수 있습니다.
React의 `useState` 훅을 이용해 **컴포넌트 내부에서 상태를 관리**할 수 있습니다. 여기서는 각 칸의 값을 상태로 관리합니다.

###  주요 개념
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

##  4. X와 O를 번갈아 표시하기

`useState`를 통해 `xIsNext`라는 상태 값을 추가하면 현재 어떤 사용자인지를 알 수 있으며, 이 값을 활용하여 X와 O를 번갈아 가며 표시할 수 있습니다.

###  주요 개념
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

##  5. 승자 판단하기

게임의 목표는 세 개의 동일한 기호를 일렬로 맞추는 것입니다. `calculateWinner` 함수를 통해 승자 판단 로직을 구현합니다.

###  주요 개념
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

##  6. 이력 저장 및 되돌리기

게임의 각 상태를 이력으로 저장하면 **되돌리기 기능**을 구현할 수 있습니다. 이를 위해 게임의 상태를 배열 형태로 저장하고, 현재 이동 횟수를 추적합니다.

###  주요 개념
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

##  7. 상태 끌어올리기 (Lifting State Up)

게임의 상태를 `Board`가 아니라 `Game` 컴포넌트에서 관리하게 바꾸는 과정입니다. 이 방식은 여러 컴포넌트가 동일한 데이터를 공유할 때 필요합니다.

###  주요 개념
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