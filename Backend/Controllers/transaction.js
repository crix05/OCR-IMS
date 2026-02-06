import { createTransaction } from "../Services/transaction.js";

export async function handleTransaction(req, res) {
    try {
        const tranDetails = req.body;
        if(
            !tranDetails.transaction_date ||
            !tranDetails.amount ||
            !tranDetails.transactionItems
        ) {
            return res.status(400).json({ error: 'Please enter all fields correctly'});
        }
        const transaction = await createTransaction(tranDetails);
        res.status(200).json({ message:'Transaction recorded successfully', transaction});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}