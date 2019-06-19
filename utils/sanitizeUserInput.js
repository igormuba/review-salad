var sanitizeHtml = require("sanitize-html");

function sanitizeThisInput(untrustedInput) {
  let cleanedInput = sanitizeHtml(untrustedInput);
  return cleanedInput;
}

module.exports = sanitizeThisInput;
