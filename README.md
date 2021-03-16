# API 조회 후 CSV 파일로 저장하는 서비스

#

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

성공일 경우 results 디렉토리 아래에 파일 생성

- 통합 : result.csv
- 개별 : result_yyyymmddhhMM.csv

오류가 있을 경우 logs 디렉토리 아래에 error.txt 참고
