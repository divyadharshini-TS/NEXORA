import mongoose from 'mongoose';
import Scheme from '../models/Scheme.js';
import SavedScheme from '../models/SavedScheme.js';

const getSharedSchemes = () => {
  if (!globalThis.__nexoraSchemes) {
    globalThis.__nexoraSchemes = [];
  }
  return globalThis.__nexoraSchemes;
};

const getSharedSavedSchemes = () => {
  if (!globalThis.__nexoraSavedSchemes) {
    globalThis.__nexoraSavedSchemes = [];
  }
  return globalThis.__nexoraSavedSchemes;
};

export const setInMemorySchemes = (schemes = []) => {
  const shared = getSharedSchemes();
  shared.length = 0;
  schemes.forEach((scheme) => shared.push({ ...scheme, _id: scheme._id || scheme.id || String(Math.random()) }));
};

export const listSchemes = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const schemes = await Scheme.find().sort({ name: 1 });
      return res.json(schemes);
    }

    return res.json(getSharedSchemes());
  } catch (error) {
    console.error('List schemes failed:', error);
    return res.status(500).json({ message: 'Failed to list schemes.' });
  }
};

export const saveScheme = async (req, res) => {
  try {
    const { schemeId } = req.body || {};

    if (!schemeId) {
      return res.status(400).json({ message: 'schemeId is required.' });
    }

    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    if (mongoose.connection.readyState === 1) {
      const existing = await SavedScheme.findOne({ userId, schemeId });
      if (existing) {
        return res.status(200).json({ message: 'Scheme already saved.', saved: existing });
      }

      const saved = await SavedScheme.create({ userId, schemeId });
      return res.status(201).json({ message: 'Scheme saved.', saved });
    }

    const sharedSaved = getSharedSavedSchemes();
    const existing = sharedSaved.find((entry) => entry.userId === String(userId) && entry.schemeId === String(schemeId));
    if (existing) {
      return res.status(200).json({ message: 'Scheme already saved.', saved: existing });
    }

    const saved = { _id: String(Date.now()), userId: String(userId), schemeId: String(schemeId), createdAt: new Date() };
    sharedSaved.push(saved);

    return res.status(201).json({ message: 'Scheme saved.', saved });
  } catch (error) {
    console.error('Save scheme failed:', error);
    return res.status(500).json({ message: 'Failed to save scheme.' });
  }
};

export const listSavedSchemesForUser = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated.' });

    if (mongoose.connection.readyState === 1) {
      const saved = await SavedScheme.find({ userId }).sort({ createdAt: -1 });
      const schemeIds = saved.map((s) => s.schemeId);
      const schemes = await Scheme.find({ _id: { $in: schemeIds } });
      return res.json(schemes);
    }

    const sharedSaved = getSharedSavedSchemes().filter((s) => String(s.userId) === String(userId));
    const schemeIds = sharedSaved.map((s) => s.schemeId);
    const all = getSharedSchemes().filter((s) => schemeIds.includes(String(s._id || s.id || s.name)));
    return res.json(all);
  } catch (error) {
    console.error('List saved schemes failed:', error);
    return res.status(500).json({ message: 'Failed to list saved schemes.' });
  }
};
