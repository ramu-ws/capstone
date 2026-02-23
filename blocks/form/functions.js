/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Custom submit function
 * @param {scope} globals
 */
function submitFormArrayToString(globals) {
  const data = globals.functions.exportData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key] = data[key].join(',');
    }
  });
  globals.functions.submitForm(data, true, 'application/json');
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

/**
* Masks the first 5 digits of the mobile number with *
* @param {*} mobileNumber
* @returns {string} returns the mobile number with first 5 digits masked
*/
function maskMobileNumber(mobileNumber) {
  if (!mobileNumber) {
    return '';
  }
  const value = mobileNumber.toString();
  // Mask first 5 digits and keep the rest
  return ` ${'*'.repeat(5)}${value.substring(5)}`;
}



/**
* Masks the first 5 digits of the mobile number with *
* @param {*} p
* @param {*} n
* @param {*} r
* @returns {string} returns the mobile number with first 5 digits masked
*/
function emicalculation(p, n, r) {
  // Basic guards
  if (p == null || n == null || r == null) return 0;

  const P = Number(p);
  const N = Number(n);
  const annualRatePercent = Number(r); // e.g., 10 => 10%

  if (!Number.isFinite(P) || !Number.isFinite(N) || !Number.isFinite(annualRatePercent)) return 0;
  if (P <= 0 || N <= 0) return 0;

  // Convert annual % (e.g., 10) to monthly decimal (e.g., 0.10/12)
  const monthlyRate = (annualRatePercent / 12) / 100;

  // Zero-interest case
  if (monthlyRate === 0) return Number((P / N).toFixed(2));

  // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
  const pow = Math.pow(1 + monthlyRate, N);
  const denom = pow - 1;
  if (denom === 0) return 0;

  const emi = (P * monthlyRate * pow) / denom;
  return Number(emi.toFixed(2));
}


// eslint-disable-next-line import/prefer-default-export
export {
  getFullName, days, submitFormArrayToString, maskMobileNumber,emicalculation,
};
