async function handler(m, { command }) {
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) return this.sendButton(m.chat, '_Kamu tidak sedang berada di anonymous chat_', author, null, [['Cari Partner', `.start`]], m)
            m.reply('Ok')
            let other = room.other(m.sender)
            if (other) await this.sendButton(other, '_Partner meninggalkan chat_', author, null, [['Cari Partner', `.start`]], m)
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.sendButton(m.chat, '_Kamu masih berada di dalam anonymous chat, menunggu partner_', author, null, [['Keluar', `.leave`]], m)
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendButton(room.a, '_Partner ditemukan!_', author, null, [['Next', `.next`]], m)
                room.b = m.sender
                room.state = 'ᴄʜᴀᴛᴛɪɴɢ'
                await this.sendButton(room.a, '_Partner ditemukan!_', author, null, [['Next', `.next`]], m)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'ᴡᴀɪᴛɪɴɢ',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendButton(m.chat, '_Menunggu partner..._', author, null, [['Keluar', `.leave`]], m)
            }
            break
        }
    }
}
handler.help = ['start', 'leave', 'next']
handler.tags = ['anonymous']
handler.command = ['start', 'leave', 'next']

handler.private = true

export default handler
