# API 조회 후 CSV 파일로 저장하는 서비스

### 설치 방법

```bash
$ npm install
```

or

```bash
$ yarn
```

### 실행

#### 1. API URL 수정

index.js 파일의 API_URL을 올바른 주소로 변경

```
...
const API_URL =
  'http://openapi.seoul.go.kr:8088/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/xml/ListAirQualityByDistrictService/X/X/XXXXXX'; // <-- 여기 수정
...
```

#### 2. Node로 실행

```bash
$ npm start
```

or

```bash
$ yarn start
```
