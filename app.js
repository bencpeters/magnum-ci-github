const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const github = require('octonode');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/build_update/:githubToken", (req, res) => {
    const client = github.client(req.params.githubToken);
    const payload = JSON.parse(req.body.payload);
    const repo = client.repo(payload.commit_url.match(/github\.com\/(.+?\/.+?)\//)[1]);
    repo.status(payload.commit, {
        state: payload.status === "pass" ? "success" : "failure",
        target_url: payload.build_url,
        description: payload.title,
        context: "continuous-integration/magnum-ci"
    }, () => {
        res.end('');
    });
});

app.get('/health', (req, res) => {
    res.send('ok');
});

const PORT = process.env.NODE_PORT || 3000;
const IP = process.env.NODE_IP || 'localhost';

app.listen(PORT, IP, () => {
    console.log(`${new Date()}: server started.`);
});
