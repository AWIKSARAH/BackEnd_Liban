export default function isAdminOrSuperuser(req, res, next) {
    const { role } = req.user;
  
    if (role !== 'admin' && role !== 'superuser') {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
  
    next();
  };
  