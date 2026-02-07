import { createUserTransaction, createTransactionItems } from "../Models/transaction.js";
import { pool } from "../pool.js";

export async function createTransaction(tranDetails) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        
        const transaction = await createUserTransaction(client, tranDetails);
       
        const { transactionItems } = tranDetails;

        for (const item of transactionItems) {
            if(
                item.qty == null ||
                item.amount == null || 
                !item.item_id ||
                !item.item_name
            ) {
                throw new Error ('Mandatory details missing');
            }
            await createTransactionItems(client, item, transaction.transaction_id);
        }

        await client.query("COMMIT");

        return transaction;
    } catch(error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}