
export default function isAdminOrSuperAdmin(req, res, next) {
  const { IsAdmin } = req.user;

  if (!IsAdmin) {
    return res.status(403).json({ success: false, error: 'Not Admin' });
  }

  next();
}
 