const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

function copyHTMLFiles(source, target, exclude) {
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

const tsc = spawn("npx" + (process.platform == "win32" ? ".cmd" : ""), ["tsc", "--project", "./", "--watch"], {
    stdio: "inherit",
});

const exclude = [path.join('node_modules'), path.join('target')];
const watcher = chokidar.watch('.', {
    ignored: exclude,
    persistent: true,
});

watcher.on('change', (path) => {
    console.log(`File ${path} has been changed`);
    build.copyHTMLFiles('./', 'target', exclude);
});