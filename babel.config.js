module.exports = api => {
    api.cache(true); //一度使用された関数をキャッシュする（ビルドの時間を短縮）
    return {
        "presets": [[
            "@babel/preset-env", {
                targets: [ // browserlistで検索
                    "last 1 version",
                    "> 1%", //対象のブラウザのバージョンごとのシェア
                    "maintained node versions",
                    "not dead"
                ]
            }
        ]]
    }
}