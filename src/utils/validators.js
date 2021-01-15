export function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

export function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

export function isEmpty(str) {
    return !str || str.length === 0; 
}

export function cleanDate(dateString) {
    let dateSplit = dateString.split(' ');
    return `${dateSplit[0]} ${dateSplit[1]} ${dateSplit[2]}, ${dateSplit[3]} at ${militaryToStandardTime(dateSplit[4])}`;
}

export function simpleDate(dateString) {
    let dateSplit = dateString.split(' ');
    return `${dateSplit[1]} ${dateSplit[2]}, ${dateSplit[3]}`;
}

function militaryToStandardTime(timeString) {
    let time = timeString.split(':'); // convert to array
    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var timeValue;

    if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
    } else if (hours > 12) {
    timeValue=  "" + (hours - 12);
    } else if (hours === 0) {
    timeValue = "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

    return timeValue; 
}