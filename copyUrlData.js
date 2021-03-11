let data = [];
let shortUrlData = [];

module.exports = {
  get: () => data,
  set: (_data) => (data = _data),
  getShortUrl: () => shortUrlData,
  setShortUrl: (_shortUrlData) => (shortUrlData = _shortUrlData),
};
