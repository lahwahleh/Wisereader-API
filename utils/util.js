module.exports = {
  broadcastError: function(res, message) {
    res.json({
      "status": "error",
      "data": message
    });
  }
};
