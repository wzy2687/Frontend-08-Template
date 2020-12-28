const fs = require('fs');
const path = require('path');
const util = require('util');
const crypto = require("crypto");
const exec = util.promisify(require('child_process').exec);


const data = fs.readFileSync('./repos.txt', 'utf8');
const list = data.trim().split('\r\n').map(row => {
    const [n, g, name, repo] = row.split(/\s+/);
    return {
        n,
        g,
        name,
        repo,
        dirname: g + '组' + '_' + name
    }
});

function resolveDir(dirname) {
    return path.resolve(__dirname, dirname);
}

async function clone(item, isForce) {
    const dirname = resolveDir(item.dirname);
    if (fs.existsSync(dirname)) {
        if (isForce) {
            fs.rmdirSync(dirname)
        } else {
            return;
        }
    }
    try {
        await exec(`git clone ${item.repo} ${dirname}`, {
            cwd: './'
        });
        console.log(item.repo + 'is cloned');
    } catch (e) {
        console.error(e);
    }

}

async function pull(item) {
    const dirname = resolveDir(item.dirname);
    if (fs.existsSync(dirname)) {
        try {
            await exec(`git -C ${dirname} pull`, {
                cwd: './'
            })
            console.log(item.repo + 'is pulled');
        } catch (e) {
            console.error(e);
            pull(item);
        }
    } else {
        await clone(item);
    }
}

// console.log(list);

async function main(argv) {
    if (argv[2] === 'clone') {
        for (const item of list) {
            await clone(item, argv[3] === '-f');
        }
    } else if (argv[2] === 'pull') {
        for (const item of list) {
            await pull(item);
        }
    }
}
// console.log(list);

main(process.argv)