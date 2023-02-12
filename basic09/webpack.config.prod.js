/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
//es6 module의 .js 확장자를 다 지워야한다.
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  dotenv.config();
  return {
    mode: 'production',
    entry: './src/app.ts',
    output: {
      filename: 'bundle.js',
      //에러를 방지하기 위해 tsconfig.json output path와 일치해야한다.
      //절대경로로 입력
      path: path.resolve(__dirname, 'dist'),
      // publicPath: '/dist/', production에서는 불필요
    },
    devtool: false, //소스맵을 생성하지 않음
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          //tsconfig가 있음으로 추가구성 configuration을 명시하지 않아도 된다.
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    devServer: {
      // historyApiFallback: true,
      //브라우저를 통해 접근하는 경로 webpack.output.publicPath와 동일하게 설정
      devMiddleware: { publicPath: '/dist/' },
      //정적파일을 제공하는 경로
      static: { directory: path.resolve(__dirname) },
    },
    plugins: [
      //빌드할때마다 dist를 초기화
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        GOOGLE: JSON.stringify(process.env.GOOGLE_API_KEY),
      }),
    ],
  };
};
