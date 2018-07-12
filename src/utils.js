// function to interpolate data between a template and data of object. 
// Regex matches mustache formatted values in the template and replaces them with the matching data.
function interpolateData(template, data) {
  let rendered = template;
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    rendered = rendered.replace(
      regex,
      typeof data[key] === 'undefined' ? '' : data[key]
    );
  });
  return rendered;
}

// jQuery free way to change CSS attribute by ID 
function changeCSS(id, attribute, value) {
  document.getElementById(id).style[attribute] = value;
};

// gets Daylight Savings time offset
function dstOffset() {
  const now = new Date().getFullYear();
  const jan = new Date(now, 0, 1);
  const jul = new Date(now, 6, 1);
  const stdOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  if (new Date().getTimezoneOffset() < stdOffset) {
    return 6;
  }
  return 5;
};

// TimeStamp... 
// convert and clean up string for UTC time to Central time 
// takes parameter of 5 or 6 depending on Daylight savings time
// can use dstOffset function
function timeStampInCDT(dst) {
  const timelagging = dst; // 5 or 6 for DST
  const utc = new Date();
  const cdt = new Date(utc.getTime() - 1 * 60 * 60 * 1000 * timelagging)
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
  return cdt;
};

// create log file for NodeJS logging server side
// need to import node util and fs to write to a file
const logFile = fs.createWriteStream(`${__dirname}/logs/debug.log`, {
  flags: 'w'
});
const logStdout = process.stdout;
const debugLog = (string, data) => {
  logFile.write(
    `${convertUTCtoCDT(5)} - ${util.format(string)}\n${util.format(data)}\n`
  );
  logStdout.write(`${util.format(string)}\n${util.format(data)}\n`);
};
