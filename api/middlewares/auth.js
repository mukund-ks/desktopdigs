import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    // console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Access Denied / Unauthorized request' });
    } else {
        try {
            token = token.split(' ')[1]
            // console.log(token);
            if (token == null || !token) {
                return res.status(401).json({ message: 'Unauthorized request' });
            }
    
            const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
            if (!verifiedUser) {
                return res.status(401).json({ message: 'Unauthorized request' });
            }
    
            req.user = verifiedUser;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid Token', error: error });
        }
    }

};

export const checkAdmin = (req, res, next) => {
    if (req.user.admin) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};