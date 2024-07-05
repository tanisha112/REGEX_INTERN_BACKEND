const rootcontroller = (req, res) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString(); // ISO format: YYYY-MM-DDTHH:mm:ss.sssZ

  res.status(200).send({
    message: "Welcome to express",
    version: "1.0.0",
    date: formattedDate,
  });
};

module.exports = rootcontroller;
