(() => {
  const format = new Intl.NumberFormat('en-PK', { maximumFractionDigits: 2 });
  const pkr = value => `PKR ${format.format(Math.round((value + Number.EPSILON) * 100) / 100)}`;
  const get = (form, name) => Number(new FormData(form).get(name) || 0);
  const show = (form, lines) => {
    const result = form.querySelector('[data-tax-result]');
    if (result) result.textContent = lines.join('\n');
  };
  const balanceLines = (tax, paid) => {
    const balance = tax - paid;
    return balance >= 0
      ? [`Estimated tax: ${pkr(tax)}`, `Tax paid / withheld: ${pkr(paid)}`, `Estimated balance before other credits or adjustments: ${pkr(balance)}`]
      : [`Estimated tax: ${pkr(tax)}`, `Tax paid / withheld: ${pkr(paid)}`, `Possible excess payment to review: ${pkr(Math.abs(balance))}`];
  };
  const individualTax = income => {
    if (income <= 600000) return 0;
    if (income <= 1200000) return (income - 600000) * 0.01;
    if (income <= 2200000) return 6000 + (income - 1200000) * 0.11;
    if (income <= 3200000) return 116000 + (income - 2200000) * 0.20;
    if (income <= 4100000) return 316000 + (income - 3200000) * 0.25;
    if (income <= 5600000) return 541000 + (income - 4100000) * 0.29;
    if (income <= 7000000) return 976000 + (income - 5600000) * 0.32;
    return 1424000 + (income - 7000000) * 0.35;
  };

  document.querySelectorAll('[data-tax-tool]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const kind = form.dataset.taxTool;
      if (kind === 'individual') {
        const income = get(form, 'income');
        const tax = individualTax(income);
        show(form, [...balanceLines(tax, get(form, 'paid')), `Average monthly tax: ${pkr(tax / 12)}`, `Average effective rate: ${income ? format.format((tax / income) * 100) : '0'}%`]);
      } else if (kind === 'business') {
        const receipts = get(form, 'receipts');
        const expenses = get(form, 'expenses');
        const profit = Math.max(0, receipts - expenses);
        const tax = individualTax(profit);
        show(form, [`Estimated taxable profit: ${pkr(profit)}`, ...balanceLines(tax, get(form, 'paid'))]);
      } else if (kind === 'company') {
        const profit = get(form, 'profit');
        const rate = get(form, 'rate');
        const tax = profit * rate / 100;
        show(form, [`Rate applied: ${format.format(rate)}%`, ...balanceLines(tax, get(form, 'paid'))]);
      } else if (kind === 'withholding') {
        const gross = get(form, 'gross');
        const rate = get(form, 'rate');
        const deduction = gross * rate / 100;
        show(form, [`Rate applied: ${format.format(rate)}%`, `Estimated withholding: ${pkr(deduction)}`, `Estimated net payment: ${pkr(gross - deduction)}`]);
      } else if (kind === 'sales') {
        const amount = get(form, 'amount');
        const rate = get(form, 'rate');
        const credit = get(form, 'credit');
        const inclusive = new FormData(form).get('mode') === 'inclusive';
        const taxableValue = inclusive ? amount / (1 + rate / 100) : amount;
        const outputTax = inclusive ? amount - taxableValue : taxableValue * rate / 100;
        const invoiceTotal = inclusive ? amount : taxableValue + outputTax;
        const netTax = outputTax - credit;
        const lines = [`Taxable value: ${pkr(taxableValue)}`, `Output sales tax: ${pkr(outputTax)}`, `Invoice total: ${pkr(invoiceTotal)}`];
        lines.push(netTax >= 0 ? `Estimated net output tax after entered input credit: ${pkr(netTax)}` : `Entered input credit exceeds output tax by: ${pkr(Math.abs(netTax))}`);
        show(form, lines);
      } else if (kind === 'reserve') {
        const tax = get(form, 'tax');
        const paid = get(form, 'paid');
        const months = get(form, 'months');
        const outstanding = tax - paid;
        if (outstanding <= 0) {
          show(form, [`Estimated annual tax: ${pkr(tax)}`, `Paid so far: ${pkr(paid)}`, `Remaining estimated balance: ${pkr(Math.max(0, outstanding))}`, outstanding < 0 ? `Possible excess payment to reconcile: ${pkr(Math.abs(outstanding))}` : 'No remaining balance in this estimate.']);
        } else {
          show(form, [`Remaining estimated balance: ${pkr(outstanding)}`, `Planning period: ${months} months`, `Suggested monthly reserve: ${pkr(outstanding / months)}`, 'Budgeting illustration only; not an FBR due-date or instalment calculation.']);
        }
      }
    });
  });
})();
