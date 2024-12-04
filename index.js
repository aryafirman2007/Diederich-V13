import _0x121e38 from 'yargs';
import _0x1e1bcc from 'cfonts';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { createRequire } from 'module';
import { createInterface } from 'readline';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
const {
  say
} = _0x1e1bcc;
const rl = createInterface(process.stdin, process.stdout);
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const {
  name,
  author
} = require(join(__dirname, "./package.json"));
say("Diederich\nMULTIDEVICE", {
  'font': "chrome",
  'align': "center",
  'gradient': ["red", "magenta"]
});
say("'" + name + "' By @" + (author.name || author), {
  'font': "console",
  'align': "center",
  'gradient': ["red", "magenta"]
});
console.log("🐾 Starting...");
var isRunning = false;
function start(_0x2ff453) {
  if (isRunning) {
    return;
  }
  isRunning = true;
  let _0x51b541 = [join(__dirname, _0x2ff453), ...process.argv.slice(2)];
  say([process.argv[0], ..._0x51b541].join(" "), {
    'font': "console",
    'align': "center",
    'gradient': ["red", "magenta"]
  });
  setupMaster({
    'exec': _0x51b541[0],
    'args': _0x51b541.slice(1)
  });
  let _0x9b0aa3 = fork();
  _0x9b0aa3.on("message", _0x223e86 => {
    console.log("[✅RECEIVED]", _0x223e86);
    switch (_0x223e86) {
      case "reset":
        _0x9b0aa3.kill();
        isRunning = false;
        start(_0x2ff453);
        break;
      case "uptime":
        _0x9b0aa3.send(process.uptime());
        break;
      default:
        console.warn("[⚠️ UNRECOGNIZED MESSAGE]", _0x223e86);
    }
  });
  _0x9b0aa3.on("exit", (_0x946bee, _0x164a1d) => {
    isRunning = false;
    console.error("[❗] Exited with code:", _0x164a1d);
    if (_0x164a1d !== 0) {
      console.log("[🔄 Restarting worker due to non-zero exit code...");
      return start(_0x2ff453);
    }
    watchFile(_0x51b541[0], () => {
      unwatchFile(_0x51b541[0]);
      start(_0x2ff453);
    });
  });
  let _0x26f9c8 = _0x121e38(process.argv.slice(2)).exitProcess(false).parse();
  if (!_0x26f9c8.test) {
    if (!rl.listenerCount()) {
      rl.on("line", _0x1dffbb => {
        _0x9b0aa3.emit("message", _0x1dffbb.trim());
      });
    }
  }
}
start("main.js");