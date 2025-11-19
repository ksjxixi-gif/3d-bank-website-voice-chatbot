# FAQ Dataset Structure Guide

## Overview
The chatbot uses an editable JSON-based FAQ dataset to provide intelligent responses. This guide explains how to modify and extend the dataset.

## File Location
`backend/data/faq-dataset.json`

## Structure

```json
{
  "categories": {
    "category_name": [
      {
        "question": "User question",
        "answer": "Bot response",
        "keywords": ["keyword1", "keyword2"]
      }
    ]
  }
}
```

## Categories

### Current Categories
1. **accounts** - Account management, balances, opening accounts
2. **loans** - Loan products, applications, interest rates
3. **cards** - Credit/debit cards, rewards, activation
4. **transactions** - Transfers, fees, history
5. **security** - Account security, fraud protection, passwords
6. **general** - General inquiries, hours, mobile app

## Adding a New FAQ

### Step 1: Choose the Right Category
Select the category that best matches your FAQ topic.

### Step 2: Add the FAQ Entry
```json
{
  "question": "Clear, specific question",
  "answer": "Detailed, helpful answer",
  "keywords": ["relevant", "search", "terms"]
}
```

### Example
```json
{
  "question": "How do I update my email address?",
  "answer": "You can update your email in Settings > Profile > Contact Information. You'll need to verify the new email address before the change takes effect.",
  "keywords": ["email", "update", "change", "contact"]
}
```

## Best Practices

### Questions
- ✅ Clear and specific
- ✅ Natural language (how users actually ask)
- ✅ One topic per question
- ❌ Don't use jargon unnecessarily

### Answers
- ✅ Comprehensive but concise
- ✅ Include actionable steps
- ✅ Mention relevant page names or features
- ✅ Friendly, professional tone
- ❌ Don't be too technical

### Keywords
- ✅ Include variations (open, opening, create)
- ✅ Include common misspellings
- ✅ Include synonyms (money, funds, balance)
- ✅ Use lowercase
- ❌ Don't duplicate words unnecessarily

## Creating a New Category

To add a new category (e.g., "investments"):

```json
{
  "categories": {
    "investments": [
      {
        "question": "Do you offer investment services?",
        "answer": "Yes! We offer stocks, bonds, and mutual funds...",
        "keywords": ["invest", "stocks", "portfolio"]
      }
    ]
  }
}
```

Then update `backend/utils/nlp.js` to recognize the new category:

```javascript
if (
  lowerMessage.includes('invest') ||
  lowerMessage.includes('stocks') ||
  lowerMessage.includes('portfolio')
) {
  return 'investments';
}
```

## Testing Your Changes

1. Save the JSON file
2. Restart the backend server
3. Test in the chatbot
4. Try different phrasings

## Advanced: Using External AI

For more sophisticated responses, integrate OpenAI or Gemini:

### OpenAI Integration
```javascript
// In backend/routes/chatbot.js
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: message }],
});
```

### Gemini Integration
```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
```

## Troubleshooting

**Chatbot not responding correctly?**
- Check JSON syntax (use a JSON validator)
- Verify keywords match user queries
- Check backend console for errors

**Need more sophisticated matching?**
- Consider integrating a proper NLP library (natural, compromise)
- Use OpenAI/Gemini for semantic understanding

## Maintenance

- Review chatbot logs monthly
- Update answers with latest info
- Add FAQs for common support tickets
- Test new entries before deploying
