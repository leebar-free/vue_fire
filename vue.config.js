module.exports = {
    transpileDependencies: [
        'vuetify',
        'vuetify-dialog',
    ],
    configureWebpack: {
        entry: [
            "babel-polyfill",
            "./src/main.js"
        ]
    }
    
}
