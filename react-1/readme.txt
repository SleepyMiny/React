# 이민영 학번:202130123

## 3월 20일(3주차)
React Project의 구조
1, node_modules/
 - 초기 모듈 및 새로 설치하는 패키지 저장
 - git 관리 x

2, public/
 - 정적 파일 저장
 - 빌드후 배포할 파일 저장

3, src/
 - 주요 코드 위치
 - 대부분 작업이 여기서 이루어짐

3-1, src/App.css
 - App.js에 적용되는 스타일 정의

3-2, src/index.js
 - 진입점으로 최종 렌더링
 - ReactDOM.creatRoot를 사용하여 App.js 렌더링

3-3, src/index.css
 - 전역 스타일 정의

---------

의존성 관리와 package.json

 - package.json은 의존성을 관리
 의존성이란 다른 소프트웨어에 의존하여동작하는 관계
  
의존성 관리하는 이유
 - 손위운 설치 및 업데이트
 - 일관된 개발 환경 유지
 - 중복 설치 방지

package.json을 유지해야 하는 이유
 - 프로젝트의 의존성 정보 제공
 - 버전 범위 설정 가능
 - 스크립트와 메타데이터 저장
 - 새로운 패키지 설치 및 관리

node_modules 재설치
1, package-lock.json을 삭제하는 이유
 - 손상되거나 잘못된 의존성이 있을 가능성
 - 최신 버전의 패키지를 원할 경우
 - 팀플에서 다른 팀원이 잘못 업데이트한 경우

Component

 - React는 component 단위로 개발
 - component는 작은 기능을 실행할 수 있는 하나의 모듈



## 3월 13일(2주차)


