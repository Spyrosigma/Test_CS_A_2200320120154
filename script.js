document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('currency-form');
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const resultInput = document.getElementById('result');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }

        fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                if (rate) {
                    const convertedAmount = amount * rate;
                    resultInput.value = convertedAmount.toFixed(2);
                } else {
                    alert('Conversion rate not available');
                }
            })
            .catch(error => {
                console.error('Error fetching exchange rate:', error);
                alert('Error fetching exchange rate');
            });
    });
});