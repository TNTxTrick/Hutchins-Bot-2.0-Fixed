const express = require("express");
const { spawn } = require("child_process");
const gradient = require("gradient-string");
const chalk = require("chalk");

const boldText = (text) => chalk.bold(text);
console.error(boldText(gradient.cristal("Starting....")));

function startBotProcess(script) {
    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", script], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (codeExit) => {
        console.log(`${script} process exited with code: ${codeExit}`);
        if (codeExit !== 0) {
            setTimeout(() => startBotProcess(script), 3000);
        }
    });

    child.on("error", (error) => {
        console.error(`An error occurred starting the ${script} process: ${error}`);
    });
}

// Start bot processes
startBotProcess("main.js");
startBotProcess("./dashboard.js");

// Create an Express app
const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static("public"));

// Route to serve index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
