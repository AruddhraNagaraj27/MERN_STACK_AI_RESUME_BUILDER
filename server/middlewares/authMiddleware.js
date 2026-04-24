import jwt from 'jsonwebtoken'

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    
    if(!authHeader){
        return res.status(401).json({message: 'Unauthorized - Missing Authorization header' });
    }
    try {
        const token = authHeader.split(' ')[1] || authHeader
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId;
        next();
    }catch (error){
        return res.status(401).json({message: 'Unauthorized - Invalid Token'});
    }
}

export default protect;
