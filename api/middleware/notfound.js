const notFound = (req, res) => {
  res.status(404).json({
    status: "fail",
    data: {
      message: "Route does not exist",
      code: "404",
    },
  });
};

module.exports = notFound;
