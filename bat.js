const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


const data = fs.readFileSync('./repos.txt', 'utf8');
const list = data.trim().split('\r\n').map(row => {
    const [n, g, name, repo] = row.split(/\s+/);
    return { n, g, name, repo, dirname: g + '组' + '_' + name }
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

function createHtmlTable(rows) {
    let html = [];
    for (const item of rows) {
        html.push(`<tr>${ item.map(item=>`<td>${item}</td>`).join('') }</tr>`)
    }
    const tpl = fs.readFileSync('table.tpl', 'utf8');
    fs.writeFileSync('temp.html', tpl.replace('{{content}}', html.join('')), 'utf8');
}

async function main(argv) {
    if (argv[2] === 'clone') {
        for (const item of list) {
            await clone(item, argv[3] === '-f');
        }
    } else if (argv[2] === 'pull') {
        for (const item of list) {
            await pull(item);
        }
    } else if (argv[2] === 'ex' && argv[3]) {
        const dir = fs.readdirSync(argv[3], 'utf8');
        const files = dir.reduce((map, name) => {
            const [id, n] = name.split('-');
            map[n] = { id, ex: fs.readFileSync(path.resolve(__dirname, argv[3], name))};
            return map;
        }, {})
        const res = list.map(item => {
            const { id, ex } = files[item.n] || {};
            if (!id) {
                return ['404', item.n, item.g, item.name];
            } else {
                return [id, item.n, item.g, item.name, `<a href="javascript:openURL('data:text/html;charset=utf-8;base64,${ex.toString('base64')}')" >打开</a>`];
            }
        })
        createHtmlTable(res);
    }
}
// console.log(list);

main(process.argv)