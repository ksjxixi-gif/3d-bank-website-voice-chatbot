/**
 * Simple NLP utilities for chatbot
 * For production, consider using natural, compromise, or OpenAI API
 */

// Extract intent from user message
function extractIntent(message) {
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes('account') ||
    lowerMessage.includes('balance') ||
    lowerMessage.includes('open')
  ) {
    return 'accounts';
  }

  if (
    lowerMessage.includes('loan') ||
    lowerMessage.includes('borrow') ||
    lowerMessage.includes('mortgage')
  ) {
    return 'loans';
  }

  if (
    lowerMessage.includes('card') ||
    lowerMessage.includes('credit') ||
    lowerMessage.includes('debit')
  ) {
    return 'cards';
  }

  if (
    lowerMessage.includes('transfer') ||
    lowerMessage.includes('send') ||
    lowerMessage.includes('transaction')
  ) {
    return 'transactions';
  }

  if (
    lowerMessage.includes('secure') ||
    lowerMessage.includes('safe') ||
    lowerMessage.includes('password')
  ) {
    return 'security';
  }

  return 'general';
}

// Calculate similarity between two strings (simple Levenshtein-like)
function similarity(s1, s2) {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;

  if (longer.length === 0) return 1.0;

  const editDistance = calculateEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function calculateEditDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

// Find best matching FAQ answer
function findBestMatch(userMessage, faqData, intent) {
  let bestMatch = null;
  let bestScore = 0;

  // Get FAQs for the detected intent
  const categoryFaqs = faqData.categories[intent] || [];
  const allFaqs = Object.values(faqData.categories).flat();

  // First, try to match within the category
  for (const faq of categoryFaqs) {
    const score = calculateMatchScore(userMessage, faq);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq.answer;
    }
  }

  // If no good match, search all categories
  if (bestScore < 0.3) {
    for (const faq of allFaqs) {
      const score = calculateMatchScore(userMessage, faq);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq.answer;
      }
    }
  }

  // If still no match, return default response
  if (!bestMatch || bestScore < 0.2) {
    return getDefaultResponse(intent);
  }

  return bestMatch;
}

function calculateMatchScore(userMessage, faq) {
  let score = 0;
  const lowerMessage = userMessage.toLowerCase();

  // Check keywords
  for (const keyword of faq.keywords) {
    if (lowerMessage.includes(keyword.toLowerCase())) {
      score += 0.3;
    }
  }

  // Check question similarity
  const questionSim = similarity(lowerMessage, faq.question.toLowerCase());
  score += questionSim * 0.5;

  return score;
}

function getDefaultResponse(intent) {
  const defaults = {
    accounts:
      'I can help you with account information! You can check your balance, open a new account, or manage existing accounts. What would you like to know?',
    loans:
      'We offer various loan options including home loans, auto loans, student loans, and business loans. Would you like information about a specific loan type?',
    cards:
      'Our credit and debit cards come with great rewards and benefits! Would you like to know about our Platinum, Gold, or Student cards?',
    transactions:
      'I can help you with money transfers and transaction history. What would you like to do?',
    security:
      'Your security is our priority. We use bank-grade encryption and offer fraud protection. How can I help you stay secure?',
    general:
      "I'm here to help with your banking needs! You can ask about accounts, loans, cards, transactions, or security. What would you like to know?",
  };

  return defaults[intent] || defaults.general;
}

module.exports = {
  extractIntent,
  findBestMatch,
  similarity,
};
