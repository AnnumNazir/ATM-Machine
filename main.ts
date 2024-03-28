#!/usr/bin/env node
import inquirer from "inquirer";

let myBalance = 10000; //dollar

let myPin = 1234; //pincode

let pinAns = await inquirer.prompt([
  {
    type: "number",
    name: "askPin",
    message: "Enter Your Pin: ",
  },
]);
// console.log(pinAns);
if (pinAns.askPin === myPin) {
  console.log("pin code matched");
} else {
  console.log("Incorrect pin code");
}
async function start() {
  let performAction = await inquirer.prompt([
    {
      type: "list",
      name: "askAction",
      message: "what operation you want to perform ",
      choices: [
        "credit",
        "Check Balance",
        "Cash Withdraw",
        "Fund Transfer",
        "Fast Cash",
        "Cancel",
      ],
    },
  ]);

  if (performAction.askAction === "credit") {
    let accCredit = await inquirer.prompt([
      {
        type: "number",
        name: "creditAmount",
        message: "Enter your amount:  ",
      },
    ]);
    if (accCredit.creditAmount > 0) {
      myBalance += accCredit.creditAmount;
      console.log(
        "Yor account has been credited with the ammount of",
        accCredit.creditAmount,
        "\nyor current balance is ",
        myBalance
      );
    } else {
      ("invalid amount ");
    }
  }
  if (performAction.askAction === "Check Balance") {
    console.log(`your Current balance is: ${myBalance}`);
  } else if (performAction.askAction === "Cash Withdraw") {
    let amount = await inquirer.prompt([
      {
        type: "number",
        name: "enterAmount",
        message: "Enter your amount:  ",
      },
    ]);

    if (amount.enterAmount > myBalance) {
      console.log("Sorry You have insufficient Balance");
    } else {
      myBalance -= amount.enterAmount;
      console.log(
        `Wait Your transaction is being proceed.\nTransect successflly.\nyour remaining balance is: ${myBalance}`
      );
    }
  }
  if (performAction.askAction === "Fund Transfer") {
    let beneficiaryDetail = await inquirer.prompt([
      {
        type: "number",
        name: "accountNum",
        message: "Enter beneficiary account Number :  ",
      },
      {
        type: "number",
        name: "amountTransfer",
        message: "Enter Amount:  ",
      },
    ]);

    if (beneficiaryDetail.amountTransfer > myBalance) {
      console.log("Sorry You have insufficient Balance");
    } else {
      myBalance -= beneficiaryDetail.amountTransfer;
      console.log(
        `You successfully transferred: ${beneficiaryDetail.amountTransfer} to Account Number:${beneficiaryDetail.accountNum}\nYour remaining balance is: ${myBalance}`
      );
    }
  }
  if (performAction.askAction === "Fast Cash") {
    let fastCash = await inquirer.prompt([
      {
        type: "list",
        name: "fastAmount",
        message: "Select amount:  ",
        choices: [1000, 2000, 5000, 10000, 20000],
      },
    ]);

    if (fastCash.fastAmount > myBalance) {
      console.log("Sorry You have insufficient balance");
    } else {
      myBalance -= fastCash.fastAmount;
      console.log(
        `Transect Successfully. \nYour Remaining balance is ${myBalance}`
      );
    }
  }

  if (performAction.askAction === "Cancel") {
    console.log(`Please take Your card`);
  }

  let process = await inquirer.prompt([
    {
      type: "list",
      name: "aboutProcess",
      message: "Do you Want to continue or Exit ",
      choices: ["continue", "exit"],
    },
  ]);

  if (process.aboutProcess === "exit") {
    process.exit;
    console.log("Thank you For using my ATM");
  } else {
    start();
    console.log("you can continue to use our services");
  }
}

start();
