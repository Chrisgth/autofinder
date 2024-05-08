type AutogidasMakeClassStrings = {
  dropdownOptions: string;
};

type AutogidasModelClassStrings = {
  cookieAccept: string;
  makeDropdown: string;
  overlay: string;
  clearButton: string;
  dropdownOptions: string;
  valueRecordsCount: string;
};

type AutogidasClassStrings = {
  makeClasses: AutogidasMakeClassStrings;
  modelClasses: AutogidasModelClassStrings;
};

const autogidasClassStrings: AutogidasClassStrings = {
  makeClasses: {
    dropdownOptions: ".search-field-input-f_1 .values .value",
  },
  modelClasses: {
    cookieAccept: "#onetrust-accept-btn-handler",
    makeDropdown: ".search-field-input-f_1 .title",
    overlay: ".overlay",
    clearButton: ".input-select.js-make .clear-btn",
    dropdownOptions: ".search-field-input-f_model_14 .values .value",
    valueRecordsCount: ".value-records-count",
  },
};

export default autogidasClassStrings;
