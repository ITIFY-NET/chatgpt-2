// @ts-nocheck
"use strict";
import { DataTypes } from "sequelize";
import { db } from "../db";

const Account = db.sequelize().define(
  "Account",
  {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    screenName: DataTypes.STRING,
    ssoType: DataTypes.STRING,
    ssoId: DataTypes.STRING,
    ssoToken: DataTypes.STRING,
    status: DataTypes.STRING,
    role: DataTypes.STRING,
    lastLoginAt: DataTypes.DATE,
    validFlag: DataTypes.INTEGER,
    createdAt: DataTypes.BIGINT,
    updatedAt: DataTypes.BIGINT,
  },
  {
    timestamps: false,
  }
);

setTimeout(() => {
  Account.associate = function (models) {
    Account.hasOne(models.Profile, {
      as: "profile",
      foreignKey: "accountId",
    });
  };
}, 0);

export default Account;
