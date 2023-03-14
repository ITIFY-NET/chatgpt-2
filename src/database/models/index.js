'user strict'
import Account from './account'
import Balance from './balance'
import Profile from './profile'
import DeviceToken from './deviceToken'
import HistoryRequest from './historyRequest'
import Notification from './notification'
import TransactionHistory from './transactionHistories'
import ModelSetting from './modelSettings'
import MasterToken from './masterToken'
import Conversations from './conversation'
import Messages from './message'

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
Conversations.hasMany(Messages, {
  as: 'messages',
  foreignKey: 'conversationId'
})
Messages.belongsTo(Conversations, {
  foreignKey: 'accountId'
})
export {
  Account,
  Balance,
  Profile,
  DeviceToken,
  HistoryRequest,
  Notification,
  TransactionHistory,
  MasterToken,
  ModelSetting,
  Conversations,
  Messages
}
