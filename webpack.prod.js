const {merge} = require("webpack-merge");
const commonConfig = require("./webpack.common");

const config ={
    output: {
        publicPath: "https://smart-agenda.gate42.it/",
    },
    mode: "production"
};

module.exports = merge(commonConfig, config);
