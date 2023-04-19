const testerMiddleware = (req, res, next) => {
    console.log(req.body);
    next();
  };
export default testerMiddleware  