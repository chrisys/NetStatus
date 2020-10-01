
const getInt = (envName, defaultValue=-1) => {
    var value = process.env[envName];
    if ( value === undefined ) {
        value = parseInt(defaultValue);
    }
    return value;
}

const getBool = (envName, defaultValue=false) => {
    var value = process.env[envName];
    if ( value === undefined ) {
        value = defaultValue ? true : false;
    }
    return value;
}

export default {
    getInt,
    getBool,
};