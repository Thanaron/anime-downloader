/* eslint-disable */

module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                productName: 'horriblesubs-downloader',
                appId: 'de.tobiaskuechler.horriblesubsdownloader',
                win: {
                    target: ['nsis', 'zip'],
                    appId: 'de.tobiaskuechler.horriblesubsdownloader',
                    publish: {
                        provider: 'github',
                        owner: 'Thanaron',
                        repo: 'horriblesubs-downloader',
                    },
                },
                nsis: {
                    artifactName: '${productName}-setup-${version}.${ext}',
                },
            },
        },
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/theme.scss";`,
            },
        },
    },
};
