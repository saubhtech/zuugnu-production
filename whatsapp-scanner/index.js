import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState
} from '@whiskeysockets/baileys'

import Pino from 'pino'
import qrcode from 'qrcode-terminal'

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    logger: Pino({ level: 'silent' }),
    browser: ['LocalScanner', 'Chrome', '120']
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update

    // QR
    if (qr) {
      console.log('\n📱 Scan this QR (LOCAL BACKUP)\n')
      qrcode.generate(qr, { small: true })
    }

    // Connected
    if (connection === 'open') {
      console.log('✅ WhatsApp connected (LOCAL)')

      // 👇 CHANGE THIS NUMBER (WITH COUNTRY CODE)
      const testNumber = '918800607598'
      const jid = `${testNumber}@s.whatsapp.net`

      try {
        await sock.sendMessage(jid, {
          text: '✅ Local WhatsApp scanner test successful'
        })
        console.log('📤 Test message sent successfully')
      } catch (err) {
        console.error('❌ Failed to send message:', err)
      }
    }

    // Disconnected
    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut

      console.log('❌ Disconnected. Reconnect:', shouldReconnect)

      if (shouldReconnect) start()
    }
  })
}

start()

export async function sendPassword(to, password) {
  await sock.sendMessage(`${to}@s.whatsapp.net`, {
    text: `Your Zuugnu login password is: *${password}*`
  })
}

