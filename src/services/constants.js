// const BASE_URL = `http://localhost:3000`;
// const WS_BASE_URL = `ws://localhost:3000/realtime`;
const BASE_URL = `https://api.personalized-ai.com`;
const WS_BASE_URL = `wss://api.personalized-ai.com/realtime`;
const WS_CONN_INTERVAL = 10000; //in ms
const STAGE_2_ASSESSMEMT_COUNT_MIN = 6;
const REASONING_COUNT_MIN = 3;
const CHANGED_ELEMENT_THRESHOLD = 4;
const EXPERIMENT_2 = 'exp2';
const QUALTRICKS_LINK  = 'https://mit.co1.qualtrics.com/jfe/form/SV_4VOiMkCT2OAWlYq'

const ACCURACY_CODES = {
    ACCURATE: 0,
    INACCURATE: 1
}

const CONFIDENCE_CODES = {
    NOT_AT_ALL: 1,
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
    REASONING_COUNT_MIN,
    CHANGED_ELEMENT_THRESHOLD,
    EXPERIMENT_2,
    QUALTRICKS_LINK
}