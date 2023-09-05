const jwt = require('jsonwebtoken');


const authToken = (req, res, next) => {
    // console.log(req.headers)
    try {
        let token = req.headers.authorization;

         if (!token) {
           return res.status(403).json({ msg: "Not authorized. No token" });
        }
        
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft(); 
            
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            
             req.user = verified;
             next();

        }

 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = authToken;