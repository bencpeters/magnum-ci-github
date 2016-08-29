# magnum-ci-github
Simple Node.js app to update Github with Magnum CI build status for a given commit.

Ready to be deployed to OpenShift via [openshift-cartridge-nodejs](https://github.com/icflorescu/openshift-cartridge-nodejs).

## Usage
1. [Generate GitHub token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/).
2. Add Web Hook in your project settings in Magnum CI: `http://your-magnum-ci-github-server/build_update/your-github-token`
