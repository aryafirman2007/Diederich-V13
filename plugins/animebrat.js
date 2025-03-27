/*
- Fitur: Anime Brat
- Info: ya begitulah 
- Type: Plugins `ESM` & `CJS`
- Recode By: SkyWalker
- [ `Sumber` ]
- https://whatsapp.com/channel/0029Vb1NWzkCRs1ifTWBb13u
- [ `Sumber Utama` ]
- https://whatsapp.com/channel/0029VasjrIh3gvWXKzWncf2P/1291
*/
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { createCanvas, loadImage, registerFont } from 'canvas'
import sharp from 'sharp'

//  CJS
// const fs = require('fs')
// const path = require('path')
// const axios = require('axios')
// const { createCanvas, loadImage, registerFont } = require('canvas')
// const sharp = require('sharp')

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Masukkan teks untuk stiker.')

    try {
        let sessionPath = path.join(process.cwd(), 'tmp')
        if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath, { recursive: true })

        let imageUrl = 'https://cloudkuimages.com/uploads/images/67ddbbcb065a6.jpg'
        let fontUrl = 'https://github.com/googlefonts/noto-emoji/raw/main/fonts/NotoColorEmoji.ttf'
        let imagePath = path.join(sessionPath, 'file.jpg')
        let outputPath = path.join(sessionPath, 'file.webp')
        let fontPath = path.join(sessionPath, 'NotoColorEmoji.ttf')

        if (!fs.existsSync(fontPath)) {
            let { data } = await axios.get(fontUrl, { responseType: 'arraybuffer' })
            fs.writeFileSync(fontPath, Buffer.from(data))
        }

        let { data } = await axios.get(imageUrl, { responseType: 'arraybuffer' })
        fs.writeFileSync(imagePath, Buffer.from(data))

        let stickerBuffer = await generateSticker(imagePath, fontPath, text)
        fs.writeFileSync(outputPath, stickerBuffer)

        await conn.sendMessage(m.chat, { 
            sticker: { url: outputPath } 
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply('Terjadi kesalahan saat membuat stiker.')
    }
}

handler.help = ['animebrat']
handler.tags = ['sticker']
handler.command = /^animebrat$/i

export default handler

//   CJS
// module.exports = handler

async function generateSticker(imagePath, fontPath, text) {
    let baseImage = await loadImage(imagePath)
    let canvas = createCanvas(baseImage.width, baseImage.height)
    let ctx = canvas.getContext('2d')

    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height)
    registerFont(fontPath, { family: 'EmojiFont' })

    let boardX = canvas.width * 0.22
    let boardY = canvas.height * 0.50
    let boardWidth = canvas.width * 0.56
    let boardHeight = canvas.height * 0.25

    ctx.fillStyle = '#000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    let fontSize = adjustFontSize(ctx, text, boardWidth, boardHeight)
    ctx.font = `bold ${fontSize}px EmojiFont`

    let lines = wrapText(ctx, text, boardWidth)
    let startY = boardY + boardHeight / 2 - (lines.length - 1) * (fontSize * 1.2) / 2

    lines.forEach((line, i) => {
        ctx.fillText(line, boardX + boardWidth / 2, startY + i * (fontSize * 1.2))
    })

    let buffer = canvas.toBuffer('image/jpeg')
    return await sharp(buffer).toFormat('webp').toBuffer()
}

function adjustFontSize(ctx, text, boardWidth, boardHeight) {
    let maxFontSize = 32
    let minFontSize = 12
    let fontSize = maxFontSize

    while (!isTextFit(ctx, text, fontSize, boardWidth, boardHeight) && fontSize > minFontSize) {
        fontSize -= 2
    }
    return fontSize
}

function isTextFit(ctx, text, fontSize, boardWidth, boardHeight) {
    ctx.font = `bold ${fontSize}px EmojiFont`;
    let lineHeight = fontSize * 1.2
    let lines = wrapText(ctx, text, boardWidth)
    return lines.length * lineHeight <= boardHeight * 0.9
}

function wrapText(ctx, text, maxWidth) {
    let words = text.split(' ')
    let lines = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
        let testLine = currentLine + ' ' + words[i]
        let testWidth = ctx.measureText(testLine).width
        if (testWidth > maxWidth * 0.9) {
            lines.push(currentLine)
            currentLine = words[i]
        } else {
            currentLine = testLine
        }
    }
    lines.push(currentLine)
    return lines
}