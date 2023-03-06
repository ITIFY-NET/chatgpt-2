import axios from 'axios'
import config from '../configs/general.config'

export const sendMessageSimple = async (message) => {
  try {
    const endpoint = `https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${config.TELEGRAM_CHANNEL}&text=${message}`
      return axios({
        url: endpoint,
        method: 'get',
        timeout: 81000,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.data)
    .catch (err => console.error(err))
  } catch (error) {
    console.log(error)
  }
}
