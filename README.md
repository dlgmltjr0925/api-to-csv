# API 조회 후 CSV 파일로 저장하는 서비스

---

### 1. 설치

```bash
$ git clone https://github.com/dlgmltjr0925/api-to-csv
$ cd api-to-csv
$ npm install # or yarn
```

#

### 2. 실행

#### 1) API URL 수정

index.js 파일의 API_URL을 올바른 주소로 변경

```
...
const API_URL =
  'http://openapi.seoul.go.kr:8088/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/xml/ListAirQualityByDistrictService/X/X/XXXXXX'; // <-- 여기 수정
...
```

#### 2) 실행

```bash
$ npm start # or yarn start
```
