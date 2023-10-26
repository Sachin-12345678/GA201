"use strict";
class BankAccount {
    constructor(accountNumber, accountHolder) {
        this.transactions = [];
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = 0;
    }
    //deposit funds into account
    deposit(amount) {
        if (amount <= 0) {
            console.log("There is no deposite amount");
            return;
        }
        this.balance += amount;
        const transaction = {
            type: "deposit",
            amount,
            timestamp: new Date(),
        };
        this.transactions.push(transaction);
        console.log(`Deposited ${amount}. new balance ${this.balance}`);
    }
    //withdraw funds from their account
    withdraw(amount) {
        if (amount <= 0) {
            console.log("Invalid withdrawal amount");
            return;
        }
        if (amount > this.balance) {
            console.log("Less balance. withdrawal cancled");
            return;
        }
        this.balance -= amount;
        const transaction = {
            type: "withdraw",
            amount,
            timestamp: new Date(),
        };
        this.transactions.push(transaction);
        console.log(`withdraw ${amount}. new balance ${this.balance}`);
    }
    //getbalance
    getBalance() {
        return this.balance;
    }
    displayTransactions() {
        console.log(`Transaction history for Account ${this.accountNumber}:`);
        this.transactions.forEach((transaction, index) => {
            console.log(`${index + 1}. Type: ${transaction.type}, Amount: $${transaction.amount}, Timestamp: ${transaction.timestamp}`);
        });
    }
}
// Example usage
const account1 = new BankAccount("455233688", "Sachin Chavan");
console.log(`Account Holder: ${account1.getBalance()}`);
account1.deposit(2000);
account1.withdraw(1250);
account1.deposit(400);
account1.withdraw(1200);
console.log(`Current Balance: $${account1.getBalance()}`);
account1.displayTransactions();
