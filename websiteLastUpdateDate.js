let websiteLastUpdateDate = {};

websiteLastUpdateDate.getLastUpdateDate = function () {
  const options = { day: "numeric", month: "short", year: "numeric" };
  let date = new Date().toLocaleDateString("en-US", options);
  return "Mar 10, 2024";
};

module.exports = websiteLastUpdateDate;
