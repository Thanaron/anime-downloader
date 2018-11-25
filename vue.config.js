/* eslint-disable */

module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                productName: 'HorribleSubsDownloader',
                appId: 'de.tobiaskuechler.horriblesubsdownloader',
                win: {
                    target: ['nsis', 'zip'],
                    appId: 'de.tobiaskuechler.horriblesubsdownloader',
                    publish: {
                        provider: 'github',
                        owner: 'Thanaron',
                        repo: 'horriblesubsdownloader',
                    },
                },
                nsis: {
                    artifactName: '${productName}-setup-${version}.${ext}',
                },
            },
        },
    },
};
