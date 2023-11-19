type AutogidasMakeClassStrings = {
  dropdownOptions: string;
};

type AutogidasModelClassStrings = {
  cookieAccept: string;
  makeDropdown: string;
  overlay: string;
  dropdownOptions: string;
  clearButton: string;
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
    makeDropdown: ".input-select.js-make .display-input.js-placeholder",
    overlay: ".input-select.js-model .input-overlay",
    dropdownOptions:
      ".input-select.js-model .dropdown-options.js-options .dropdown-option",
    clearButton: ".input-select.js-make .clear-btn",
  },
};

export default autogidasClassStrings;
