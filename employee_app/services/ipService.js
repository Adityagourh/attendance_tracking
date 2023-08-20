const ip = require("ip")

module.exports = {
  ipAddress: async (empClockInIP) => {
    empClockInIP = ip.address()
    return {empClockInIP};
 },
};