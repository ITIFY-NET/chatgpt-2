"use strict";
import { DataTypes } from "sequelize";
import { db } from "../db";

const Balance = db.sequelize().define(
  "Balance",
  {
    accountId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Account",
        key: "id",
      },
    },
    credits: DataTypes.STRING,
    validFlag: DataTypes.INTEGER,
    createdAt: DataTypes.BIGINT,
    updatedAt: DataTypes.BIGINT,
  },
  {
    timestamps: false,
  }
);

export default Balance;
