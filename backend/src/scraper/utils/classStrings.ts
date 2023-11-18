type AutopliusMakeClassStrings = {
  dropdownOptions: string;
};

type AutopliusModelClassStrings = {
  cookieReject: string;
  makeDropdown: string;
  overlay: string;
  dropdownOptions: string;
  clearButton: string;
};

type AutopliusClassStrings = {
  makeClasses: AutopliusMakeClassStrings;
  modelClasses: AutopliusModelClassStrings;
};

export const getAutopliusClasses = (): AutopliusClassStrings => {
  return {
    makeClasses: {
      dropdownOptions:
        ".input-select.js-make .dropdown-options.js-options .dropdown-option",
    },
    modelClasses: {
      cookieReject: "#onetrust-reject-all-handler",
      makeDropdown: ".input-select.js-make .display-input.js-placeholder",
      overlay: ".input-select.js-model .input-overlay",
      dropdownOptions:
        ".input-select.js-model .dropdown-options.js-options .dropdown-option",
      clearButton: ".input-select.js-make .clear-btn",
    },
  };
};
