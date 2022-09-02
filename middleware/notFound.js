//custom 404 response middleware

const notFoundMiddleware = (req, res) =>
  res.status(404).send("Route does not exist");

export default notFoundMiddleware;
