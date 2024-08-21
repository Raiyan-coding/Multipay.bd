const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve the HTML form directly
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Multipay</title>
            <style>
                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes buttonPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }

                body {
                    font-family: 'Roboto', sans-serif;
                    background-color: #f7f9fc;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    animation: fadeIn 1s ease-in-out;
                }

                h2 {
                    color: #444;
                    font-size: 24px;
                    margin-bottom: 20px;
                    text-align: center;
                    animation: fadeIn 1.5s ease-in-out;
                }

                form {
                    background: #ffffff;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 420px;
                    margin: auto;
                    transition: box-shadow 0.3s ease;
                    animation: fadeIn 2s ease-in-out;
                }

                form:hover {
                    box-shadow: 0 8px 26px rgba(0, 0, 0, 0.15);
                }

                label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: #555;
                    animation: fadeIn 2.5s ease-in-out;
                }

                input[type="text"],
                input[type="number"],
                select {
                    width: 100%;
                    padding: 12px;
                    margin-bottom: 18px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    box-sizing: border-box;
                   
                    font-size: 14px;
                    transition: border-color 0.3s ease;
                    animation: fadeIn 3s ease-in-out;
                }

                input[type="text"]:focus,
                input[type="number"]:focus,
                select:focus {
                    border-color: #007bff;
                    outline: none;
                }

                button {
                    width: 100%;
                    padding: 12px;
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: 600;
                    text-transform: uppercase;
                    transition: background-color 0.5s ease, transform 0.5s ease;
                    animation: buttonPulse 2s infinite;
                }

                button:hover {
                    background-color: #0056b3;
                    transform: translateY(-2px);
                }

                button:active {
                    transform: translateY(1px);
                }

                p {
                    text-align: center;
                    font-size: 16px;
                    margin-bottom: 24px;
                    color: #777;
                    animation: fadeIn 2s ease-in-out;
                }

                @media (max-width: 600px) {
                    form {
                        padding: 20px;
                    }

                    h2 {
                        font-size: 20px;
                    }

                    button {
                        font-size: 14px;
                    }
                }
            </style>
        </head>
        <body>
            <form id="transferForm">
                <h2>Send money everywhere</h2>
                <p>Main Number: 01784867778</p>

                <label for="sender">Your Number:</label>
                <input type="text" id="sender" name="sender" required>

                <label for="senderPlatform">Your Platform:</label>
                <select id="senderPlatform" name="senderPlatform" required>
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                    <option value="rocket">Rocket</option>
                    <option value="upay">Upay</option>
                </select>

                <label for="amount">Amount:</label>
                <input type="number" id="amount" name="amount" required>

                <label for="receiver">Receiver's Number:</label>
                <input type="text" id="receiver" name="receiver" required>

                <label for="receiverPlatform">Receiver's Platform:</label>
                <select id="receiverPlatform" name="receiverPlatform" required>
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                    <option value="rocket">Rocket</option>
                    <option value="upay">Upay</option>
                </select>

                <label for="transactionCode">Transaction Code:</label>
                <input type="text" id="transactionCode" name="transactionCode" required>

                <button type="submit">Send Money</button>
            </form>

            <script>
                document.getElementById('transferForm').addEventListener('submit', function(e) {
                    e.preventDefault();

                    const sender = document.getElementById('sender').value;
                    const senderPlatform = document.getElementById('senderPlatform').value;
                    const amount = document.getElementById('amount').value;
                    const receiver = document.getElementById('receiver').value;
                    const receiverPlatform = document.getElementById('receiverPlatform').value;
                    const transactionCode = document.getElementById('transactionCode').value;

                    fetch('/send-money', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ sender, senderPlatform, amount, receiver, receiverPlatform, transactionCode }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.message);
                    })
                    .catch((error) => {
                        alert('Transaction Failed!');
                        console.error('Error:', error);
                    });
                });
            </script>
        </body>
        </html>
    `);
});

// Endpoint to handle money sending
app.post('/send-money', (req, res) => {
    const { sender, senderPlatform, amount, receiver, receiverPlatform, transactionCode } = req.body;

    // Simulate transaction (replace with actual API integration)
    console.log(`Sending ${amount} from ${sender} via ${senderPlatform} to ${receiver} via ${receiverPlatform} with transaction code ${transactionCode}`);

    const transactionSuccessful = true; // Simulate success/failure

    if (transactionSuccessful) {
        res.json({ message: 'Transaction Successful!' });
    } else {
        res.status(500).json({ message: 'Transaction Failed!' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
