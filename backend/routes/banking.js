const express = require('express');
const router = express.Router();

// Mock data
const mockAccounts = [
  { id: 1, type: 'Checking', balance: 12543.50, number: '****1234' },
  { id: 2, type: 'Savings', balance: 45231.80, number: '****5678' },
  { id: 3, type: 'Credit Card', balance: -2543.20, number: '****9012' },
];

const mockTransactions = [
  { id: 1, description: 'Salary Deposit', amount: 5000, type: 'credit', date: '2024-11-18' },
  { id: 2, description: 'Grocery Shopping', amount: -123.45, type: 'debit', date: '2024-11-17' },
  { id: 3, description: 'Online Transfer', amount: -500, type: 'debit', date: '2024-11-17' },
];

// GET /api/banking/accounts
router.get('/accounts', (req, res) => {
  res.json({ accounts: mockAccounts });
});

// GET /api/banking/transactions
router.get('/transactions', (req, res) => {
  res.json({ transactions: mockTransactions });
});

// POST /api/banking/transfer
router.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;
  // Mock transfer logic
  res.json({
    success: true,
    message: `Transferred $${amount} from account ${from} to ${to}`,
    transactionId: Math.random().toString(36).substr(2, 9),
  });
});

module.exports = router;
