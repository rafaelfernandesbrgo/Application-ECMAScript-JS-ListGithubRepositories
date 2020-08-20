


module.exports={
    entry:['@babel/polyfill','./src/main.js'] ,
    output: {
        path: __dirname + '/Public',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: __dirname + '/Public'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                   loader: 'babel-loader' 
                }
            }
        ],
    },
};