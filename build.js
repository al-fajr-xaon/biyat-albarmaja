const fs = require("fs");
const path = require("path");
const spawn = require("child_process").spawn;

exports.copyHTMLFiles = function copyHTMLFiles(source, target, exclude) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    let kill = false;
    exclude.forEach((excluded_item) => {
        if (path.join(__dirname, source).startsWith(excluded_item)) {
            kill = true;
        }
    });
     
    if (kill) return;
    console.log(source)

    const files = fs.readdirSync(source);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(source, file);
        const fileStat = fs.lstatSync(filePath);

        if (fileStat.isDirectory()) {
            if (exclude && exclude.indexOf(filePath) >= 0) {
                continue;
            }

            copyHTMLFiles(filePath, path.join(target, file), exclude);
        } else {
            if (path.extname(filePath) !== ".html") {
                continue;
            }

            fs.copyFileSync(filePath, path.join(target, file));
        }
    }
}

copyHTMLFiles("./", "target", [path.join(__dirname, "node_modules"), path.join(__dirname, "target")]);

const tsc = spawn("npx" + (process.platform == "win32" ? ".cmd" : ""), ["tsc", "--project", "./", "--transpile-only"], {
    stdio: "inherit",
});

tsc.on("close", (code) => {
  console.log(`tsc exited with code ${code}`);
});