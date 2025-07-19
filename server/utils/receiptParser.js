function parseReceiptText(text) {
  const lines = text.split('\n');
  const transactions = [];

  const itemLineRegex = /^(.+?)\s+(\d{1,5}\.\d{2})(?:\s+[A-Z])?$/;

  for (const line of lines) {
    const match = line.match(itemLineRegex);
    if (match) {
      const description = match[1].trim();
      const amount = parseFloat(match[2]);

      const ignoreKeywords = ['subtotal', 'tax', 'total', 'change', 'amount', 'approved'];
      const lowerDesc = description.toLowerCase();
      if (ignoreKeywords.some(k => lowerDesc.includes(k))) continue;

      transactions.push({
        description,
        amount,
        date: new Date(), // fallback
      });
    }
  }

  return transactions;
}

module.exports = { parseReceiptText };
