const BASE_URL = `http://localhost:3000`;
const WS_BASE_URL = `ws://localhost:3000/realtime`;
const WS_CONN_INTERVAL = 10000; //in ms
const STAGE_2_ASSESSMEMT_COUNT_MIN = 6;
const REASONING_COUNT_MIN = 3;

const ACCURACY_CODES = {
    ACCURATE: 0,
    INACCURATE: 1
}

const CONFIDENCE_CODES = {
    NONE_AT_ALL: 1,
    A_LITTLE: 2,
    A_MODERATE_AMOUNT: 3,
    A_LOT: 4,
    A_GREAT_DEAL: 5
}

export default {
    BASE_URL,
    WS_BASE_URL,
    WS_CONN_INTERVAL,
    ACCURACY_CODES,
    STAGE_2_ASSESSMEMT_COUNT_MIN,
    CONFIDENCE_CODES,
    REASONING_COUNT_MIN
}