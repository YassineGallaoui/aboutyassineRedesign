let websiteLastUpdateDate = {};

websiteLastUpdateDate.getLastUpdateDate = function() {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

module.exports = websiteLastUpdateDate;