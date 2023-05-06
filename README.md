# Wallet

This project aim to organize information and help manage investments. It is based on the [Bastter System](https://bastter.com/). The system is supposed to be used by long-term investors.

## Table of contents

* [The Project](#the-project)
* [Functionalities](#functionalities)
  * [Rules used to suggest investments](#rules-used-to-sugest-investments)
* [Technologies Used](#technologies-used)

## The Project

The main objective of the system is to receive information of investments and provide information in a organized way when requested. At first, the system will be developed to support brazilian stokes and treasure from central bank of Brazil.

## Functionalities

* Receive mensal investment data and store the information in the database.
* Receive information defining the percentual objective of each asset on the wallet.
* Receive information defining the one of the following possibilities regarding the state of the asset:
  * **Buy**: assets to invest in the future.
  * **Sell**: assets to sell in the future.
  * **Quarantine**: assets of companies that are presenting worst results on the last years.
  * **Studing**: assets that you are currently studing and don't want to invest right now.
* Provide data regarding the total amount invested.
* Provide data regarding the current amount of each asset, the amount expended on it, number of investments on it, and when each investment was realized.
* Provide the percentual representation of each asset comparing to the total amount invested.
* Suggest the next asset to investment. The indication will be based on a set of rules described next.

### Rules used to sugest investments

* The suggested investments will be ranked based on the difference between its percentual target and the current participation. The assets whose participation is smaller than the objectives will apear on the first suggestion of the list.

Restrictions:

* Assets whose percentual participation is bigger than the percentual objective will not be displayed as an investment suggestion.

* Only assets defined with the **Buy** option will be listed as investment options.

* If you invest in the same asset two consecutive months, the system will not suggest you invest on this asset for the next six months.

## Technologies Used

The backend will be developed using the Nestjs framework. It was choosed becouse it provides a well organized way of developing. In addition, Nestjs documentation is clear and easy to understand, with several examples to help in the developing process.

The Prisma ORM will be used because its data model is very intuitive. In addition, Prisma studio makes development easier.

For the database, the Postgress was selected because it is one of most used sequential databases used in the market.