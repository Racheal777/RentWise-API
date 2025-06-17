import jwt from "jsonwebtoken"

export const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// export const adminAuth = (req, res)=> {
//   if (req.user.role !== 'admin')
//     return res.status(401).json({message: 'you are not an admin'})
// }

// export const tenantAuth = (req, res)=> {
//   if (req.user.role !== 'tenant')
//     return res.status(401).json({message: 'you are not a tenant'})
// }

export const roleAuth = (req, res,next)=>{
    if(req.user.role !== 'admin'){
       return res.status(401).json({message: 'you are a tenant'})
    }else{
      return res.status(401).json({message: 'you are an admin'})
    }
}