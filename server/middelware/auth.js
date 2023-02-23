const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  try {
    if (!request.headers.authorization) throw "Forbidden!!";
    const token = request.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, "A6cXZ9Mj5hM4As2wiIugIz5DHNO3q1VF");
    request.accountId = payload.id;
    // console.log(request.payload);
    next();
  } catch (err) {
    response.status(401).json({
      message: "Forbidden 🚫🚫🚫",
    });
  }
};