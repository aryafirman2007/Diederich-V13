process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
import './config.js';
import _0x1c258c, { join } from 'path';
import { platform } from 'process';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';
global.__filename = function filename(_0x41eff1 = import.meta.url, _0x5d45c3 = platform !== "win32") {
  return _0x5d45c3 ? /file:\/\/\//.test(_0x41eff1) ? fileURLToPath(_0x41eff1) : _0x41eff1 : pathToFileURL(_0x41eff1).toString();
};
global.__dirname = function dirname(_0x571b32) {
  return _0x1c258c.dirname(global.__filename(_0x571b32, true));
};
global.__require = function require(_0x3cecd9 = import.meta.url) {
  return createRequire(_0x3cecd9);
};
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch } from 'fs';
import _0x82ee35 from 'yargs/yargs';
import 'yargs/helpers';
import { spawn } from 'child_process';
import _0x573b93 from 'lodash';
import _0x17950d from 'syntax-error';
import _0x16cf25 from 'chalk';
import { tmpdir } from 'os';
import _0x1c8eb5 from 'readline';
import { format } from 'util';
import _0x1620ab from 'pino';
import _0x1879c7 from 'ws';
const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  PHONENUMBER_MCC
} = await import("@adiwajshing/baileys");
import { Low, JSONFile } from 'lowdb';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import _0x58364c from './lib/cloudDBAdapter.js';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';
const {
  CONNECTING
} = _0x1879c7;
const {
  chain
} = _0x573b93;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
protoType();
serialize();
global.API = (_0x997ca0, _0x491b66 = '/', _0x70255b = {}, _0x25ffe9) => (_0x997ca0 in global.APIs ? global.APIs[_0x997ca0] : _0x997ca0) + _0x491b66 + (_0x70255b || _0x25ffe9 ? '?' + new URLSearchParams(Object.entries({
  ..._0x70255b,
  ...(_0x25ffe9 ? {
    [_0x25ffe9]: global.APIKeys[_0x997ca0 in global.APIs ? global.APIs[_0x997ca0] : _0x997ca0]
  } : {})
})) : '');
global.timestamp = {
  'start': new Date()
};
const __dirname = global.__dirname(import.meta.url);
global.opts = new Object(_0x82ee35(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[' + (opts.prefix || "‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-").replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + ']');
global.db = new Low(/https?:\/\//.test(opts.db || '') ? new _0x58364c(opts.db) : /mongodb(\+srv)?:\/\//i.test(opts.db) ? opts.mongodbv2 ? new mongoDBV2(opts.db) : new mongoDB(opts.db) : new JSONFile((opts._[0] ? opts._[0] + '_' : '') + "database.json"));
global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  if (db.READ) {
    return new Promise(_0x5117d5 => setInterval(async function () {
      if (!db.READ) {
        clearInterval(this);
        _0x5117d5(db.data == null ? global.loadDatabase() : db.data);
      }
    }, 1000));
  }
  if (db.data !== null) {
    return;
  }
  db.READ = true;
  await db.read()["catch"](console.error);
  db.READ = null;
  db.data = {
    'users': {},
    'chats': {},
    'stats': {},
    'msgs': {},
    'sticker': {},
    'settings': {},
    ...(db.data || {})
  };
  global.db.chain = chain(db.data);
};
loadDatabase();
const usePairingCode = !process.argv.includes("--use-pairing-code");
var question = function (_0x2d6981) {
  return new Promise(function (_0x58c41e) {
    rl.question(_0x2d6981, _0x58c41e);
  });
};
const rl = _0x1c8eb5.createInterface({
  'input': process.stdin,
  'output': process.stdout
});
const {
  version,
  isLatest
} = await fetchLatestBaileysVersion();
const {
  state,
  saveCreds
} = await useMultiFileAuthState("./sessions");
const connectionOptions = {
  'version': version,
  'logger': _0x1620ab({
    'level': "silent"
  }),
  'printQRInTerminal': !usePairingCode,
  'browser': ["Mac OS", "safari", "5.1.10"],
  'auth': {
    'creds': state.creds,
    'keys': makeCacheableSignalKeyStore(state.keys, _0x1620ab().child({
      'level': "silent",
      'stream': "store"
    }))
  },
  'getMessage': async _0x16c5e4 => {
    const _0x5578f0 = await store.loadMessage(_0x16c5e4.remoteJid, _0x16c5e4.id);
    return _0x5578f0?.["message"] || undefined;
  },
  'generateHighQualityLinkPreview': true,
  'patchMessageBeforeSending': _0x3a1f33 => {
    const _0x38e469 = !!(_0x3a1f33.buttonsMessage || _0x3a1f33.templateMessage || _0x3a1f33.listMessage);
    if (_0x38e469) {
      _0x3a1f33 = {
        'viewOnceMessage': {
          'message': {
            'messageContextInfo': {
              'deviceListMetadataVersion': 0x2,
              'deviceListMetadata': {}
            },
            ..._0x3a1f33
          }
        }
      };
    }
    return _0x3a1f33;
  },
  'connectTimeoutMs': 0xea60,
  'defaultQueryTimeoutMs': 0x0,
  'generateHighQualityLinkPreview': true,
  'syncFullHistory': true,
  'markOnlineOnConnect': true
};
global.conn = makeWASocket(connectionOptions);
conn.isInit = false;
if (usePairingCode && !conn.authState.creds.registered) {
  const phoneNumber = await question(_0x16cf25.blueBright("The password is correct. Now Input a Valid number start with region code. Example : 62xxx:\n"));
  const code = await conn.requestPairingCode(phoneNumber);
  console.log(_0x16cf25.black(_0x16cf25.bgGreen("Your Pairing Code : ")), _0x16cf25.black(_0x16cf25.white(code)));
}
async function resetLimit() {
  try {
    let _0x581823 = Object.entries(global.db.data.users);
    _0x581823.map(([_0x332887, _0x9635e2], _0xb3824a) => {
      if (_0x9635e2.limit <= 25) {
        _0x9635e2.limit = 25;
      }
    });
    console.log("Success Auto Reset Limit");
  } finally {
    setInterval(() => resetLimit(), 86400000);
  }
}
if (!opts.test) {
  (await import("./server.js"))["default"](PORT);
  setInterval(async () => {
    if (global.db.data) {
      await global.db.write()["catch"](console.error);
    }
    clearTmp();
  }, 60000);
}
function clearTmp() {
  const _0x7ee12c = [tmpdir(), join(__dirname, "./tmp")];
  const _0x454c6c = [];
  _0x7ee12c.forEach(_0x9dada6 => readdirSync(_0x9dada6).forEach(_0x5aa88f => _0x454c6c.push(join(_0x9dada6, _0x5aa88f))));
  return _0x454c6c.map(_0x19c07c => {
    const _0x6b38a3 = statSync(_0x19c07c);
    if (_0x6b38a3.isFile() && Date.now() - _0x6b38a3.mtimeMs >= 180000) {
      return unlinkSync(_0x19c07c);
    }
    return false;
  });
}
async function clearSessions(_0x10ecfd = "./sessions") {
  try {
    const _0x57d0fb = await readdirSync(_0x10ecfd);
    const _0x3babc3 = await Promise.all(_0x57d0fb.map(async _0x256505 => {
      try {
        const _0x4cb62f = _0x1c258c.join(_0x10ecfd, _0x256505);
        const _0x83b1d8 = await statSync(_0x4cb62f);
        if (_0x83b1d8.isFile() && _0x256505 !== "creds.json") {
          await unlinkSync(_0x4cb62f);
          console.log("Deleted session:".main, _0x4cb62f.info);
          return _0x4cb62f;
        }
      } catch (_0x15c12e) {
        console.error("Error processing " + _0x256505 + ": " + _0x15c12e.message);
      }
    }));
    return _0x3babc3.filter(_0x5ed821 => _0x5ed821 !== null);
  } catch (_0x3718bc) {
    console.error("Error in Clear Sessions: " + _0x3718bc.message);
    return [];
  } finally {
    setTimeout(() => clearSessions(_0x10ecfd), 3600000);
  }
}
async function connectionUpdate(_0x29c1c1) {
  const {
    receivedPendingNotifications: _0x44e384,
    connection: _0x565367,
    lastDisconnect: _0x413d72,
    isOnline: _0x3577b5,
    isNewLogin: _0x578f8e
  } = _0x29c1c1;
  if (_0x578f8e) {
    conn.isInit = true;
  }
  if (_0x565367 == "connecting") {
    console.log(_0x16cf25.redBright("⚡ Mengaktifkan Bot, Mohon tunggu sebentar..."));
  } else if (_0x565367 == "open") {
    console.log(_0x16cf25.green("✅ Tersambung"));
  }
  if (_0x3577b5 == true) {
    console.log(_0x16cf25.green("Status Aktif"));
  } else if (_0x3577b5 == false) {
    console.log(_0x16cf25.red("Status Mati"));
  }
  if (_0x44e384) {
    console.log(_0x16cf25.yellow("Menunggu Pesan Baru"));
  }
  if (_0x565367 == "open") {
    conn.sendMessage("6283129627886@s.whatsapp.net", {
      'text': "- BOT DIEDERICH AKTIF\n\nSCRIPT BOT INI MILIK ARGO!!!!!\n\nJANGAN LUPA MASUK GC ARGO👇\nhttps://chat.whatsapp.com/LPBLUJReYnIHkkjv8aiPKQ"
    });
  }
  if (_0x565367 == "close") {
    console.log(_0x16cf25.red("⏱️ Koneksi terputus & mencoba menyambung ulang..."));
  }
  global.timestamp.connect = new Date();
  if (_0x413d72 && _0x413d72.error && _0x413d72.error.output && _0x413d72.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== CONNECTING) {
    console.log(await global.reloadHandler(true));
  }
  if (global.db.data == null) {
    await global.loadDatabase();
  }
}
process.on("uncaughtException", console.error);
let isInit = true;
let handler = await import("./handler.js");
global.reloadHandler = async function (_0x5f2aa5) {
  try {
    const _0x1e5865 = await import("./handler.js?update=" + Date.now())["catch"](console.error);
    if (Object.keys(_0x1e5865 || {}).length) {
      handler = _0x1e5865;
    }
  } catch (_0x35b1a4) {
    console.error(_0x35b1a4);
  }
  if (_0x5f2aa5) {
    const _0x470b09 = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch {}
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, {
      'chats': _0x470b09
    });
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off("messages.upsert", conn.handler);
    conn.ev.off("group-participants.update", conn.participantsUpdate);
    conn.ev.off("groups.update", conn.groupsUpdate);
    conn.ev.off("message.delete", conn.onDelete);
    conn.ev.off("connection.update", conn.connectionUpdate);
    conn.ev.off("creds.update", conn.credsUpdate);
  }
  conn.welcome = "❖━━━━━━[ Selamat Datang ]━━━━━━❖\n\n┏––––––━━━━━━━━•\n│☘︎ @subject\n┣━━━━━━━━┅┅┅\n│( 👋 Hallo @user)\n├[ Intro ]—\n│ NAME: \n│ AGE: \n│ GENDER:\n┗––––––━━┅┅┅\n\n––––––┅┅ DESKRIPSI ┅┅––––––\n@desc";
  conn.bye = "❖━━━━━━[ Meninggalkan ]━━━━━━❖\n𝚂𝚊𝚢𝚘𝚗𝚊𝚛𝚊𝚊 @user 👋😃";
  conn.spromote = "@user Sekarang jadi admin!";
  conn.sdemote = "@user Sekarang bukan lagi admin!";
  conn.sDesc = "Deskripsi telah diubah menjadi \n@desc";
  conn.sSubject = "Judul grup telah diubah menjadi \n@subject";
  conn.sIcon = "Icon grup telah diubah!";
  conn.sRevoke = "Link group telah diubah ke \n@revoke";
  conn.sAnnounceOn = "Group telah di tutup!\nsekarang hanya admin yang dapat mengirim pesan.";
  conn.sAnnounceOff = "Group telah di buka!\nsekarang semua peserta dapat mengirim pesan.";
  conn.sRestrictOn = "Edit Info Grup di ubah ke hanya admin!";
  conn.sRestrictOff = "Edit Info Grup di ubah ke semua peserta!";
  conn.handler = handler.handler.bind(global.conn);
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
  conn.onDelete = handler.deleteUpdate.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn);
  conn.ev.on("call", async _0x5e4d9d => {
    console.log("Panggilan diterima:", _0x5e4d9d);
    if (_0x5e4d9d.status === "ringing") {
      await conn.rejectCall(_0x5e4d9d.id);
      console.log("Panggilan ditolak");
    }
  });
  conn.ev.on("messages.upsert", conn.handler);
  conn.ev.on("group-participants.update", conn.participantsUpdate);
  conn.ev.on("groups.update", conn.groupsUpdate);
  conn.ev.on("message.delete", conn.onDelete);
  conn.ev.on("connection.update", conn.connectionUpdate);
  conn.ev.on("creds.update", conn.credsUpdate);
  isInit = false;
  return true;
};
const pluginFolder = global.__dirname(join(__dirname, "./plugins/index"));
const pluginFilter = _0x431c5f => /\.js$/.test(_0x431c5f);
global.plugins = {};
async function filesInit() {
  for (let _0x46c1bf of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let _0x5f0881 = global.__filename(join(pluginFolder, _0x46c1bf));
      const _0x532ea0 = await import(_0x5f0881);
      global.plugins[_0x46c1bf] = _0x532ea0["default"] || _0x532ea0;
    } catch (_0x887f47) {
      conn.logger.error(_0x887f47);
      delete global.plugins[_0x46c1bf];
    }
  }
}
filesInit().then(_0x38c495 => console.log(Object.keys(global.plugins)))["catch"](console.error);
global.reload = async (_0x56e6b2, _0xc2043e) => {
  if (/\.js$/.test(_0xc2043e)) {
    let _0x9fbd3c = global.__filename(join(pluginFolder, _0xc2043e), true);
    if (_0xc2043e in global.plugins) {
      if (existsSync(_0x9fbd3c)) {
        conn.logger.info("re - require plugin '" + _0xc2043e + "'");
      } else {
        conn.logger.warn("deleted plugin '" + _0xc2043e + "'");
        return delete global.plugins[_0xc2043e];
      }
    } else {
      conn.logger.info("requiring new plugin '" + _0xc2043e + "'");
    }
    let _0x2c406f = _0x17950d(readFileSync(_0x9fbd3c), _0xc2043e, {
      'sourceType': "module",
      'allowAwaitOutsideFunction': true
    });
    if (_0x2c406f) {
      conn.logger.error("syntax error while loading '" + _0xc2043e + "'\n" + format(_0x2c406f));
    } else {
      try {
        const _0x5acfe2 = await import(global.__filename(_0x9fbd3c) + "?update=" + Date.now());
        global.plugins[_0xc2043e] = _0x5acfe2["default"] || _0x5acfe2;
      } catch (_0x154c3e) {
        conn.logger.error("error require plugin '" + _0xc2043e + "\n" + format(_0x154c3e) + "'");
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([_0x151519], [_0x599c8a]) => _0x151519.localeCompare(_0x599c8a)));
      }
    }
  }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();
async function _quickTest() {
  let _0x3613df = await Promise.all([spawn("ffmpeg"), spawn("ffprobe"), spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-filter_complex", "color", "-frames:v", '1', '-f', "webp", '-']), spawn("convert"), spawn("magick"), spawn('gm'), spawn("find", ["--version"])].map(_0x4c7748 => {
    return Promise.race([new Promise(_0x86cf61 => {
      _0x4c7748.on("close", _0x4591aa => {
        _0x86cf61(_0x4591aa !== 127);
      });
    }), new Promise(_0x2d31d2 => {
      _0x4c7748.on("error", _0x198d83 => _0x2d31d2(false));
    })]);
  }));
  let [_0x33087d, _0x171c2e, _0x3c1052, _0xc2eeb, _0x50332d, _0x2f0434, _0x4d5c6e] = _0x3613df;
  console.log(_0x3613df);
  let _0x2bba3f = global.support = {
    'ffmpeg': _0x33087d,
    'ffprobe': _0x171c2e,
    'ffmpegWebp': _0x3c1052,
    'convert': _0xc2eeb,
    'magick': _0x50332d,
    'gm': _0x2f0434,
    'find': _0x4d5c6e
  };
  Object.freeze(global.support);
  if (!_0x2bba3f.ffmpeg) {
    conn.logger.warn("Silahkan install ffmpeg terlebih dahulu agar bisa mengirim video");
  }
  if (_0x2bba3f.ffmpeg && !_0x2bba3f.ffmpegWebp) {
    conn.logger.warn("Sticker Mungkin Tidak Beranimasi tanpa libwebp di ffmpeg (--enable-libwebp while compiling ffmpeg)");
  }
  if (!_0x2bba3f.convert && !_0x2bba3f.magick && !_0x2bba3f.gm) {
    conn.logger.warn("Fitur Stiker Mungkin Tidak Bekerja Tanpa imagemagick dan libwebp di ffmpeg belum terinstall (pkg install imagemagick)");
  }
}
_quickTest().then(() => conn.logger.info("☑️ Quick Test Done , nama file session ~> creds.json"))["catch"](console.error);