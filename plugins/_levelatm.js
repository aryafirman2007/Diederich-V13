/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

export async function before(m) {
	let user = global.db.data.users[m.sender]
    if (user.bank <= 2000) {
    user.atm = 1
    } else if (user.bank <= 1000) {
    user.atm = 2
    } else if (user.bank <= 10000) {
    user.atm = 3
    } else if (user.bank <= 100000) {
    user.atm = 4
    } else if (user.bank <= 1000000) {
    user.atm = 5
    } else if (user.bank <= 10000000) {
    user.atm = 6
    } else if (user.bank <= 100000000) {
    user.atm = 7
    } else if (user.bank <= 100000000) {
    user.atm = 8
    } else if (user.bank <= 1000000000) {
    user.atm = 9
    } else if (user.bank <= 10000000000) {
    user.atm = 10
    } else if (user.bank <= 100000000000) {
    user.atm = 11
    } else if (user.bank <= 1000000000000) {
    user.atm = 12
    } else if (user.bank <= 10000000000000) {
    user.atm = 13
    } else if (user.bank <= 100000000000000) {
    user.atm = 14
    } else if (user.bank <= 1000000000000000) {
    user.atm = 15
    } else if (user.bank <= 10000000000000000) {
    user.atm = 16
    } else if (user.bank <= 10000000000000000) {
    user.atm = 18
    } else if (user.bank <= 100000000000000000) {
    user.atm = 19
    } else if (user.bank <= 1000000000000000000) {
    user.atm = 20
    } 
}
export const disabled = false