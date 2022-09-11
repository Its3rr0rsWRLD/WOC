const { argv } = require("process");
const fs = require("fs");

file = argv[2];

if (file == undefined) {
    console.log("ERR: No file specified");
    process.exit(1);
} else {
    if (!fs.existsSync(file)) {
        console.log("ERR: File not found: " + file);
        process.exit(1);
    } else {
        fs.writeFileSync("woc.out", fs.readFileSync(file, "utf8"))
        fs.writeFileSync("woc.out", fs.readFileSync("woc.out", "utf8").replace(/black/g, "0"));
        fs.writeFileSync("woc.out", fs.readFileSync("woc.out", "utf8").replace(/red/g, "1"));
        fs.writeFileSync("woc.out", fs.readFileSync("woc.out", "utf8").replace(/green/g, "2"));
        fs.writeFileSync("woc.out", fs.readFileSync("woc.out", "utf8").replace(/blue/g, "3"));

        // #region Print
        fs.writeFileSync("woc.out", fs.readFileSync("woc.out", "utf8").replace(/133/g, "console.log"));

        if (fs.readFileSync("woc.out", "utf8").includes("(")) {
            let data = fs.readFileSync("woc.out", "utf8");
            let start = data.indexOf("(");
            let end = data.indexOf(")");
            let content = data.substring(start + 1, end);
            // Replace the content "(content) + "
            fs.writeFileSync("woc.out", fs.readFileSync("woc.out", "utf8").replace(/\(.*\)/g, "'" + content + "' + "));

        }

        if (fs.readFileSync("woc.out", "utf8").includes("<")) {
            let data = fs.readFileSync("woc.out", "utf8");
            let start = data.indexOf("<");
            let end = data.indexOf(">");
            let content = data.substring(start + 1, end);

            // Convert the binary to text
            let text = "";
            for (let i = 0; i < content.length; i += 8) {
                text += String.fromCharCode(parseInt(content.substr(i, 8), 2));
            }

            // Replace the content with "text"
            fs.writeFileSync("woc.out", fs.readFileSync("woc.out", "utf8").replace(/<.*>/g, "'" + text + "'"));
            
        }
        
        fs.writeFileSync("woc.out", fs.readFileSync("woc.out", "utf8").replace(/\[/g, "("));
        fs.writeFileSync("woc.out", fs.readFileSync("woc.out", "utf8").replace(/\]/g, ");"));
        
    }
}

// Run the file
if (argv[3] == "--run") {
    require("./woc.out");
}