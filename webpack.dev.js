const {merge} = require("webpack-merge");
const commonConfig = require("./webpack.common");


const config ={
    output: {
        publicPath: "http://localhost:8080/",
    },
    mode: "development"
};

module.exports = merge(commonConfig, config);