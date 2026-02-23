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
 * Calculate EMI (Equated Monthly Installment)
 * @param {number|string} p   - Principal (loan amount)
 * @param {number|string} n   - Tenure in months
 * @param {number|string} roi - Annual rate of interest in percent (e.g., 12 for 12%)
 * @returns {number} EMI rounded to 2 decimals. Returns 0 for invalid inputs.
 */
function calcEmi(p, n, roi) {
  if (p == null || n == null || roi == null) return 0;

  const P = Number(p);
  const N = Number(n);
  const annualRatePercent = Number(roi);

  if (!Number.isFinite(P) || !Number.isFinite(N) || !Number.isFinite(annualRatePercent)) return 0;
  if (P <= 0 || N <= 0) return 0;

  // Convert annual % to monthly decimal rate
  const r = (annualRatePercent / 12) / 100;

  // Zero-interest case
  if (r === 0) return Number((P / N).toFixed(2));

  const pow = Math.pow(1 + r, N);
  const denom = pow - 1;
  if (denom === 0) return 0;

  const emi = (P * r * pow) / denom;
  return Number(emi.toFixed(2));
}

// eslint-disable-next-line import/prefer-default-export
export {
  getFullName, days, submitFormArrayToString, maskMobileNumber,calcEmi
};
