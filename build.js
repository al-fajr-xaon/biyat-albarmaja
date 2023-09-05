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
        spawn("taskkill", ["/pid", electron_process.pid, '/f', '/t'], {
            shell: true,
            stdio: "inherit",
        });

        electron_process = null;
    }
}

function run() {
    kill_electron();
    electron_process = spawn("npx" + (process.platform === "win32" ? ".cmd" : ""), [
        "electron",
        ".",
    ], {
        shell: true,
        stdio: "inherit",
    });

    // electron_process.on("close", (code) => {
    //     run();
    // });
}

function build_program(out_file, entry_point, callback) {
    build({
        entryPoints: [entry_point],
        bundle: true,
        platform: "node",
        minify: isProduction,
        sourcemap: !isProduction,
        target: "es2018",
        outfile: out_file,
        tsconfig: path.join(__dirname, "tsconfig.json"),
        external: [
            "electron",
            "path",
            "@electron/remote/main"
        ],
        define: {
            "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
        },
    }).catch((e) => console.error(e))
        .then(() => {
            if (callback) {
                callback();
            }
        });
}

function build_all() {
    build_program(
        "target/main.js",
        path.join(__dirname, "main.ts"),
        () => {
            build_program(
                "target/electron.js",
                path.join(__dirname, "start.ts"),
                () => {
                    build_program(
                        "target/preload.js",
                        path.join(__dirname, "preload.ts"),
                        () => {
                            console.log("Build complete");
                            if (run_electron) {
                                run();
                            }
                        }
                    );
                }
            ); 
        }
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
}

build_all();
if (run_electron) {
    run();
}