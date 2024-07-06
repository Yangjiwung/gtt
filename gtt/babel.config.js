module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        // 필요한 Babel 플러그인을 여기에 추가
        '@babel/plugin-transform-modules-commonjs',
    ]
};
