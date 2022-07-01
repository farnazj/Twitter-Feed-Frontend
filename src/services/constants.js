const BASE_URL = `http://localhost:3000`;
const WS_BASE_URL = `ws://localhost:3000/realtime`;
const WS_CONN_INTERVAL = 10000; //in ms
const STAGE_2_ASSESSMEMT_COUNT_MIN = 6;

const ACCURACY_CODES =  {
    ACCURATE: 0,
    INACCURATE: 1
}

export default {
    BASE_URL,
    WS_BASE_URL,
    WS_CONN_INTERVAL,
    ACCURACY_CODES,
    STAGE_2_ASSESSMEMT_COUNT_MIN
}