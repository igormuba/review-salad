var sanitizeHtml = require("sanitize-html");

function sanitizeThisInput(untrustedInput) {
  let cleanedInput = sanitizeHtml(untrustedInput);
}

module.exports = sanitizeThisInput;
