const fs = require('fs');
const axios = require('axios');
const convert = require('xml-js');
const path = require('path');
const dateFormat = require('dateformat');

const API_URL =
  'http://openapi.seoul.go.kr:8088/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/xml/ListAirQualityByDistrictService/X/X/XXXXXX'; // <-- 여기 수정

const ERROR_FILE_PATH = path.join(__dirname, 'logs', 'error.txt');

const KEYS = [
  'MSRDATE',
  'MSRADMCODE',
  'MSRSTENAME',
  'MAXINDEX',
  'GRADE',
  'POLLUTANT',
  'NITROGEN',
  'OZONE',
  'CARBON',
  'SULFUROUS',
  'PM10',
  'PM25',
];

/**
 * 데이터 조회 후 javascript 객체 형태로 변환
 */
const fetchData = async () => {
  try {
    /**
     * 데이터 요청
     */
    const res = await axios(API_URL);

    if (!res || !res.data) throw new Error('Fail data fetch');

    /**
     * xml 형식 -> js 객체 형식으로 변환
     */
    const data = convert.xml2js(res.data, { compact: true });

    /**
     * 유효성검사
     */
    if (!data || !data.ListAirQualityByDistrictService)
      throw new Error('[ERROR] Invalid service response.');

    const { RESULT, row } = data.ListAirQualityByDistrictService;
    if (!RESULT || !RESULT.CODE || !RESULT.CODE._text)
      throw new Error('[ERROR] Invalid result.');
    if (RESULT.CODE._text !== 'INFO-000')
      throw new Error(`[ERROR] Imvalid code : ${RESULT.CODE._text}`);

    const result = {};
    Object.entries(row).forEach(([key, { _text }]) => {
      result[key] = _text;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * 저장 결과 file path
 */
const getResultFilePath = (option = '') => {
  return path.join(__dirname, 'results', `result${option}.csv`);
};

/**
 * 파일 저장
 */
const saveResult = (data, individual) => {
  try {
    const values = KEYS.map((key) => data[key] || '');
    const filePath = getResultFilePath(
      individual ? dateFormat(new Date(), '_yyyymmddhhMM') : ''
    );
    if (!fs.existsSync(filePath) || individual) {
      fs.writeFileSync(filePath, KEYS.join(',') + '\n', { encoding: 'utf8' });
    }
    fs.appendFileSync(filePath, values.join(',') + '\n', { encoding: 'utf8' });
  } catch (error) {
    throw error;
  }
};

const main = async () => {
  try {
    const data = await fetchData();
    if (data === null) throw new Error('');
    saveResult(data, true); // 각각 파일 저장
    saveResult(data, false); // 통합 파일 저장
  } catch (error) {
    console.error(error);
    const now = dateFormat(new Date(), 'yyyymmddhhMM');
    fs.appendFileSync(ERROR_FILE_PATH, `[${now}] ${error}` + '\n', {
      encoding: 'utf8',
    });
  }
};

main();
