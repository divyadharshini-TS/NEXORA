const getSharedNotifications = () => {
  if (!globalThis.__nexoraNotifications) globalThis.__nexoraNotifications = {};
  return globalThis.__nexoraNotifications;
};

export const listNotifications = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated.' });
    const all = getSharedNotifications();
    return res.json(all[String(userId)] || []);
  } catch (error) {
    console.error('List notifications failed:', error);
    return res.status(500).json({ message: 'Failed to list notifications.' });
  }
};

export const createNotification = async (req, res) => {
  try {
    const { title, body } = req.body || {};
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated.' });
    if (!title) return res.status(400).json({ message: 'title required' });

    const all = getSharedNotifications();
    const list = all[String(userId)] || [];
    const note = { id: String(Date.now()), title, body: body || '', createdAt: new Date(), read: false };
    list.unshift(note);
    all[String(userId)] = list;
    return res.status(201).json(note);
  } catch (error) {
    console.error('Create notification failed:', error);
    return res.status(500).json({ message: 'Failed to create notification.' });
  }
};
