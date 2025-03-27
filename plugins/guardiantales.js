/*
- Fitur: Guardian Tales Guide
- Info: Fitur data data karakter Guardian Tales 
- Requirement: npm install @iamtraction/google-translate
- Type: Plugins `ESM`& `CJS`
- By: SkyWalker
- [ `SUMBER` ]
- https://whatsapp.com/channel/0029Vb1NWzkCRs1ifTWBb13u
*/

import axios from 'axios'
import cheerio from 'cheerio'
import translate from '@iamtraction/google-translate'

// CJS
// const axios = require('axios')
// const cheerio = require('cheerio')
// const translate = require('@iamtraction/google-translate')

let handler = async (m, { text }) => {
    if (!text) return m.reply("Masukkan nama karakter.")

    let result = await guardianTalesGuide(text)
    if (result.error) return m.reply("Karakter tidak ditemukan atau gagal mengambil data.")

    let caption = `Nama: ${result.characterInfo.name}
Sekolah: ${result.characterInfo.school}
Group Buff: ${result.characterInfo.groupBuff}
Diperkenalkan: ${result.characterInfo.introduced}

Normal Attack: ${result.skills.normalAttack.title}
${result.skills.normalAttack.description}

Chain Skill: ${result.skills.chainSkill.title} (${result.skills.chainSkill.type})
${result.skills.chainSkill.description}

Special Ability: ${result.skills.specialAbility.title}
${result.skills.specialAbility.description}

Ex Weapon: ${result.skills.exWeapon.title}
${result.skills.exWeapon.description}

Meta Rankings:
${result.metaRankings.length > 0 ? result.metaRankings.map(r => `- ${r.title}: Rank ${r.rank} (${r.percentageTop})`).join("\n") : "Tidak tersedia."}`

    await conn.sendMessage(m.chat, { image: { url: result.imageUrl }, caption }, { quoted: m })
}

handler.help = ['gtg']
handler.tags = ['info']
handler.command = /^gtg$/i

export default handler

// CJS
// module.exports = handler

async function guardianTalesGuide(query) {
    const { data } = await axios.get(`https://guardiantalesguides.com/game/guardians/show/${query.toLowerCase()}`)
    const $ = cheerio.load(data)

    let characterInfo = getCharacterInfo($)
    let skills = getSkills($)
    let metaRankings = getMetaRankings($)

    return {
        characterInfo: {
            name: characterInfo.name, 
            school: await translateToID(characterInfo.school),
            groupBuff: await translateToID(characterInfo.groupBuff),
            introduced: await translateToID(characterInfo.introduced)
        },
        skills: {
            normalAttack: await translateSkill(skills.normalAttack),
            chainSkill: {
                ...(await translateSkill(skills.chainSkill)),
                type: await translateToID(skills.chainSkill.type)
            },
            specialAbility: await translateSkill(skills.specialAbility),
            exWeapon: await translateSkill(skills.exWeapon)
        },
        metaRankings: await translateMetaRankings(metaRankings),
        imageUrl: `https://guardiantalesguides.com${$('.portrait.unique img').attr('src')}`
    }
}

function getCharacterInfo($) {
    return {
        name: extractText($, "Name:"),
        school: $('.stats div:contains("School:") em').text().trim(),
        groupBuff: extractText($, "Group Buff:"),
        introduced: extractText($, "Introduced:")
    }
}

function getSkills($) {
    return {
        normalAttack: extractSkill($, "Normal Atk"),
        chainSkill: {
            ...extractSkill($, "Chain Skill"),
            type: $('div.info:contains("Chain Skill") .heading em').text().trim()
        },
        specialAbility: extractSkill($, "Special Ability"),
        exWeapon: extractSkill($, "Ex Weapon")
    }
}

function getMetaRankings($) {
    return $(".metaGuardianRankings > div").map((i, el) => ({
        title: $(el).find("h2").text().trim(),
        rank: $(el).find(".ranks").text().trim(),
        percentageTop: `${$(el).find("strong").first().text().trim()}% of Top 100`
    })).get()
}

function extractSkill($, skillName) {
    return {
        title: $(`div.info:contains("${skillName}") .heading`).text().trim(),
        description: cleanSkillDescription($, skillName)
    }
}

function cleanSkillDescription($, skillName) {
    let skillText = $(`div.info:contains("${skillName}") .text`)
    let title = skillText.find("h5").text().trim()
    let description = skillText.text().replace(title, "").trim()
    return `${title} ${description}`
}

function extractText($, label) {
    return $(`.stats div:contains("${label}")`).text().replace(label, "").trim()
}

async function translateToID(text) {
    if (!text) return text
    let res = await translate(text, { to: "id" })
    return res.text
}

async function translateSkill(skill) {
    return {
        title: skill.title,
        description: await translateToID(skill.description)
    }
}

async function translateMetaRankings(metaRankings) {
    let translated = []
    for (let rank of metaRankings) {
        translated.push({
            title: await translateToID(rank.title),
            rank: rank.rank,
            percentageTop: rank.percentageTop
        })
    }
    return translated
}