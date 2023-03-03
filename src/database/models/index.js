'user strict'
import Account from './account'
import Balance from './balance'
import Profile from './profile'
import DeviceToken from './deviceToken'
import HistoryRequest from './historyRequest'
import Notification from './notification'
import TransactionHistory from './transactionHistories'
import ModelSetting from './settings'

Account.hasOne(Profile, {
  as: 'profile',
  foreignKey: 'accountId'
})
Profile.belongsTo(Account, {
  foreignKey: 'accountId'
})
Profile.belongsTo(ModelSetting, {
  as: 'setting',
  foreignKey: 'modelSettingId'
})
Account.hasMany(TransactionHistory, {
  as: 'transactions',
  foreignKey: 'accountId'
})
Account.hasOne(Balance, {
  as: 'balance',
  foreignKey: 'accountId'
})
Account.hasOne(DeviceToken, {
  as: 'deviceToken',
  foreignKey: 'accountId'
})
export {
  Account,
  Balance,
  Profile,
  DeviceToken,
  HistoryRequest,
  Notification,
  TransactionHistory
}
