const fs = require("fs");
const path = require("path");
const { build } = require("esbuild");
const chokidar = require("chokidar");
const spawn = require("child_process").spawn;

const isProduction = process.env.NODE_ENV === "production";
const watch_mode = process.argv.includes("--watch");
const run_electron = process.argv.includes("--run");
let electron_process = null;

const exclude = [
    path.join("./node_modules"),
    path.join("./target"),
    path.join("./.git"),
];

function kill_electron() {
    if (electron_process) {
        electron_process.stdin.pause();
        electron_process.kill();
    }
}

function run() {
    kill_electron();
    electron_process = spawn("npx" + (process.platform === "win32" ? ".cmd" : ""), [
        "electron",
        ".",
    ]);
}

function build_program(out_file, entry_point, node = false) {
    build({
        entryPoints: [entry_point],
        bundle: true,
        platform: node ? "node" : "browser",
        minify: isProduction,
        sourcemap: !isProduction,
        target: node ? "es2015" : "es2018",
        outfile: out_file,
        tsconfig: path.join(__dirname, "tsconfig.json"),
        external: node ? ["electron"] : [],
        define: {
            "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
        },
    }).catch(() => process.exit(1));
}

function build_all() {
    build_program(
        "target/electron.js", 
        path.join(__dirname, "start.ts"),
        true
    );

    build_program(
        "target/main.js",
        path.join(__dirname, "frames/main.ts")
    );
}

if (watch_mode) {
    chokidar.watch(".", {
        ignored: exclude,
        ignoreInitial: true,
    }).on("all", (event, path) => {
        console.log(event, path);
        build_all();
    });

    chokidar.watch("target").on("all", (event, path) => {
        if (
            path.endsWith("electron.js")
            && run_electron
        ) {
            run();
        }
    });
}

build_all();
if (run_electron) {
    run();
}

setTimeout(() => {
    kill_electron();
}, 5000);