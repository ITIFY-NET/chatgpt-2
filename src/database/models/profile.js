"use strict";
import { DataTypes } from "sequelize";
import { db } from "../db";

const Profile = db.sequelize().define(
  "Profile",
  {
    accountId: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    placeOfOrigin: DataTypes.STRING,
    bio: DataTypes.TEXT,
    validFlag: DataTypes.INTEGER,
    createdAt: DataTypes.BIGINT,
    updatedAt: DataTypes.BIGINT,
  },
  {
    timestamps: false,
  }
);

setTimeout(() => {
  Profile.associate = function (models) {
    Profile.belongsTo(models.Account, {
      foreignKey: "accountId",
    });
  };
}, 0);

export default Profile;
