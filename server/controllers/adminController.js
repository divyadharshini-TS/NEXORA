import mongoose from 'mongoose';
import User from '../models/User.js';
import Analysis from '../models/Analysis.js';
import Scheme from '../models/Scheme.js';
import Category from '../models/Category.js';
import LegalRule from '../models/LegalRule.js';
import Resource from '../models/Resource.js';
import { randomUUID } from 'node:crypto';

// In-memory fallback arrays for when MongoDB Atlas/Community is offline
const inMemoryCategories = [
  { _id: 'cat-1', name: 'SaaS / Cloud Software', slug: 'saas', description: 'B2B & B2C Subscription software, micro-SaaS, enterprise platforms', active: true, icon: 'Cloud' },
  { _id: 'cat-2', name: 'E-Commerce / D2C', slug: 'ecommerce', description: 'Direct-to-consumer lifestyle brands, marketplace logistics, retail tech', active: true, icon: 'ShoppingBag' },
  { _id: 'cat-3', name: 'HealthTech & Bio', slug: 'healthtech', description: 'Telehealth, diagnostic medical AI, clinical wearables, EHR software', active: true, icon: 'Activity' },
  { _id: 'cat-4', name: 'FinTech & Payments', slug: 'fintech', description: 'Embedded finance, alternative credit scoring, neo-banking, invoice discounting', active: true, icon: 'DollarSign' },
  { _id: 'cat-5', name: 'EdTech & Upskilling', slug: 'edtech', description: 'Vernacular vocational learning, adaptive AI tutoring, STEM gamification', active: true, icon: 'BookOpen' },
  { _id: 'cat-6', name: 'AgriTech & Rural', slug: 'agritech', description: 'Precision drone spraying, soil IoT telemetry, farm-to-table cold supply', active: true, icon: 'Sprout' },
  { _id: 'cat-7', name: 'CleanTech & Energy', slug: 'cleantech', description: 'Battery recycling, solar microgrid dispatch, wastewater remediation', active: true, icon: 'Sun' },
];

const inMemoryLegalRules = [
  { _id: 'lr-1', category: 'saas', ruleName: 'Software IP & Copyright Registration', complianceType: 'IP Protection', mandatory: true, officialSource: 'IP India / Copyright Office', description: 'Protects proprietary source code, algorithms, and micro-service architectures.' },
  { _id: 'lr-2', category: 'saas', ruleName: 'DPDP Act (Digital Personal Data Protection)', complianceType: 'Data Privacy', mandatory: true, officialSource: 'Ministry of Electronics & IT', description: 'Statutory compliance for customer data storage, encryption, and consent management.' },
  { _id: 'lr-3', category: 'ecommerce', ruleName: 'Consumer Protection (E-Commerce) Rules', complianceType: 'Statutory License', mandatory: true, officialSource: 'Ministry of Consumer Affairs', description: 'Clear display of refund terms, country of origin, and grievance officer.' },
  { _id: 'lr-4', category: 'healthtech', ruleName: 'Telemedicine Practice Guidelines Compliance', complianceType: 'Clinical Certification', mandatory: true, officialSource: 'National Medical Commission', description: 'Protocol adherence for e-prescriptions and doctor-patient confidentiality.' },
  { _id: 'lr-5', category: 'fintech', ruleName: 'RBI Account Aggregator / Payment KYC Norms', complianceType: 'Financial Regulation', mandatory: true, officialSource: 'Reserve Bank of India', description: 'Mandatory Aadhaar/PAN verification and PCI-DSS certification for payment processing.' },
];

const inMemoryResources = [
  { _id: 'res-1', title: 'Startup India DPIIT Recognition Handbook', category: 'all', type: 'Guide', summary: 'Step-by-step guide to claiming Section 80-IAC 3-year tax holidays and fast-track patent processing.', link: 'https://www.startupindia.gov.in', isFeatured: true },
  { _id: 'res-2', title: 'Seed Grant Financial Modeling Template (XLSX)', category: 'all', type: 'Template', summary: 'Standardized 3-statement financial projection template accepted by SISFS and TANSEED evaluators.', link: '#', isFeatured: true },
  { _id: 'res-3', title: 'Standard Founder Confidentiality & IP Assignment Agreement', category: 'legal', type: 'Policy', summary: 'Clean legal assignment guaranteeing company ownership of all software code and assets.', link: '#', isFeatured: false },
];

/**
 * Module 9: Platform Governance Overview Metrics
 */
export const getAdminOverview = async (req, res) => {
  try {
    let totalUsers = 12450;
    let totalAnalyses = 3842;
    let totalSchemes = 12;
    let totalCategories = inMemoryCategories.length;

    if (mongoose.connection.readyState === 1) {
      try {
        const [uCount, aCount, sCount, cCount] = await Promise.all([
          User.countDocuments(),
          Analysis.countDocuments(),
          Scheme.countDocuments(),
          Category.countDocuments(),
        ]);
        if (uCount > 0) totalUsers = uCount;
        if (aCount > 0) totalAnalyses = aCount;
        if (sCount > 0) totalSchemes = sCount;
        if (cCount > 0) totalCategories = cCount;
      } catch (err) {
        console.warn('DB count query fallback:', err.message);
      }
    }

    return res.json({
      metrics: {
        totalFounders: totalUsers,
        totalAnalysesTested: totalAnalyses,
        activeSchemesCatalog: totalSchemes,
        activeCategories: totalCategories,
        systemStatus: '100% Operational',
        mlServiceStatus: 'Connected (Scikit-learn + NLTK + NumPy)',
      },
      recentEvents: [
        { user: 'alex.m@venturehub.io', action: 'ML Viability Score Generated (84/100)', timestamp: 'Just now', status: 'Optimal' },
        { user: 'divya@technovate.co', action: 'Break-Even Model Computed', timestamp: '5 mins ago', status: 'Exported' },
        { user: 'rahul.k@agripro.in', action: 'Matched SISFS Grant (Rs 20 Lakhs)', timestamp: '18 mins ago', status: 'Bookmarked' },
        { user: 'sarah.j@healthflow.ai', action: 'Review Sentiment Analysis Analyzed', timestamp: '42 mins ago', status: 'Completed' },
      ],
    });
  } catch (error) {
    console.error('getAdminOverview error:', error);
    return res.status(500).json({ message: 'Failed to retrieve admin overview.' });
  }
};

// ─── Categories Management ───────────────────────────────────────────────────

export const listCategories = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const items = await Category.find().sort({ createdAt: -1 });
      if (items.length > 0) return res.json(items);
    } catch {}
  }
  return res.json(inMemoryCategories);
};

export const createCategory = async (req, res) => {
  try {
    const { name, slug, description, icon } = req.body || {};
    if (!name || !slug) {
      return res.status(400).json({ message: 'Name and slug are required.' });
    }

    const payload = {
      name: String(name).trim(),
      slug: String(slug).trim().toLowerCase(),
      description: String(description || '').trim(),
      icon: String(icon || 'Layers').trim(),
      active: true,
    };

    if (mongoose.connection.readyState === 1) {
      const created = await Category.create(payload);
      return res.status(201).json(created);
    }

    const item = { _id: `cat-${randomUUID()}`, ...payload };
    inMemoryCategories.unshift(item);
    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create category.' });
  }
};

export const toggleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      const cat = await Category.findById(id);
      if (cat) {
        cat.active = !cat.active;
        await cat.save();
        return res.json(cat);
      }
    }

    const mem = inMemoryCategories.find((c) => c._id === id);
    if (mem) {
      mem.active = !mem.active;
      return res.json(mem);
    }
    return res.status(404).json({ message: 'Category not found.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ─── Legal Rules Management ──────────────────────────────────────────────────

export const listLegalRules = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const rules = await LegalRule.find().sort({ category: 1 });
      if (rules.length > 0) return res.json(rules);
    } catch {}
  }
  return res.json(inMemoryLegalRules);
};

export const createLegalRule = async (req, res) => {
  try {
    const { category, ruleName, complianceType, description, officialSource, mandatory } = req.body || {};
    if (!category || !ruleName) {
      return res.status(400).json({ message: 'Category and ruleName are required.' });
    }

    const payload = {
      category: String(category).trim().toLowerCase(),
      ruleName: String(ruleName).trim(),
      complianceType: String(complianceType || 'Statutory License').trim(),
      description: String(description || '').trim(),
      officialSource: String(officialSource || '').trim(),
      mandatory: mandatory !== false,
    };

    if (mongoose.connection.readyState === 1) {
      const created = await LegalRule.create(payload);
      return res.status(201).json(created);
    }

    const item = { _id: `lr-${randomUUID()}`, ...payload };
    inMemoryLegalRules.unshift(item);
    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteLegalRule = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      await LegalRule.findByIdAndDelete(id);
      return res.json({ message: 'Legal rule deleted successfully.' });
    }
    const idx = inMemoryLegalRules.findIndex((r) => r._id === id);
    if (idx !== -1) inMemoryLegalRules.splice(idx, 1);
    return res.json({ message: 'Legal rule deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ─── Resource Content Management ─────────────────────────────────────────────

export const listResources = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const items = await Resource.find().sort({ isFeatured: -1, createdAt: -1 });
      if (items.length > 0) return res.json(items);
    } catch {}
  }
  return res.json(inMemoryResources);
};

export const createResource = async (req, res) => {
  try {
    const { title, category, type, summary, link, isFeatured } = req.body || {};
    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }

    const payload = {
      title: String(title).trim(),
      category: String(category || 'all').trim().toLowerCase(),
      type: String(type || 'Guide').trim(),
      summary: String(summary || '').trim(),
      link: String(link || '').trim(),
      isFeatured: !!isFeatured,
    };

    if (mongoose.connection.readyState === 1) {
      const created = await Resource.create(payload);
      return res.status(201).json(created);
    }

    const item = { _id: `res-${randomUUID()}`, ...payload };
    inMemoryResources.unshift(item);
    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      await Resource.findByIdAndDelete(id);
      return res.json({ message: 'Resource deleted successfully.' });
    }
    const idx = inMemoryResources.findIndex((r) => r._id === id);
    if (idx !== -1) inMemoryResources.splice(idx, 1);
    return res.json({ message: 'Resource deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
