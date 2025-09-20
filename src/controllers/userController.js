export const getMe = async (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ success: false, message: 'User not found in request' });

    return res.status(200).json({ success: true, data: req.user });
  } catch (err) {
    console.error('GetMe error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
