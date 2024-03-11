let websiteLastUpdateDate = {};

websiteLastUpdateDate.getLastUpdateDate = function () {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return "Mar 10, 2024";
};

module.exports = websiteLastUpdateDate;
