#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const bold = "\x1b[1m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const black = "\x1b[30m";
const lightGray = "\x1b[37m";
const blue = "\x1b[34m";
const magenta = "\x1b[35m";
const yellow = "\x1b[33m";

const reset = "\x1b[0m";

rl.question(
  `${red} ${bold} >> ${red} Please enter the desired project name ${yellow}(use ${green}"." ${yellow} for the current directory): ${green} `,
  (projectName) => {
    if (!projectName.trim()) {
      console.log(`${red} Project name cannot be empty! ${reset}`);
      rl.close();
      return;
    }

    rl.question(`${red} Enter the port number: ${green}`, (port) => {
      if (!port.trim()) {
        console.log("Port number cannot be empty!");
        rl.close();
        return;
      }

      console.log(
        `${green} Starting project "${projectName}" on port ${port}... ${reset}`
      );

      if (!projectName) {
        rl.question("Enter your project name: ", (answer) => {
          projectName = answer.trim() || "my-microfrontend-app";
          rl.close();
          createProject(projectName, port);
        });
      } else {
        createProject(projectName, port);
      }
      rl.close();
    });
  }
);

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function removeSpaces(str) {
  return str.replace(/\s+/g, '');
}

async function createProject(projectName, port) {
  try {
    const cwd = process.cwd()
    const projectPath =
      projectName === "."
        ? process.cwd()
        : path.join(process.cwd(), projectName);

    if (projectName !== ".") {
      fs.mkdirSync(projectPath, { recursive: true });
    }
    process.chdir(projectPath);
    console.log(`Project name is ${projectName === "." ? cwd : projectName}`)
    console.log(
      `\n🚀 ${red}${bold}Creating project in ${projectPath}...${reset}`
    );

    execSync("npm init -y", { stdio: "inherit" });

    // execSync("npm install react react-dom", { stdio: "inherit" });

    // execSync("npm install --save-dev @types/react @types/react-dom");

    // execSync(
    //   "npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin mini-css-extract-plugin terser-webpack-plugin compression-webpack-plugin copy-webpack-plugin webpack-bundle-analyzer swc-loader sass-loader css-loader style-loader postcss-loader image-webpack-loader",
    //   { stdio: "inherit" }
    // );

    // execSync("npm install --save-dev @swc/core @swc/cli @swc/helpers")

    // Adding dependencies manually




    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    packageJson.dependencies = {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
    };

    packageJson.devDependencies = {
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      webpack: "^5.0.0",
      "webpack-cli": "^5.0.0",
      "webpack-dev-server": "^4.0.0",
      "html-webpack-plugin": "^5.5.0",
      "mini-css-extract-plugin": "^2.4.0",
      "terser-webpack-plugin": "^5.3.0",
      "compression-webpack-plugin": "^10.0.0",
      "copy-webpack-plugin": "^11.0.0",
      "webpack-bundle-analyzer": "^4.9.0",
      "swc-loader": "^0.2.0",
      "sass-loader": "^13.3.2",
      "css-loader": "^6.8.1",
      "style-loader": "^3.3.3",
      "postcss-loader": "^7.3.1",
      "image-webpack-loader": "^8.1.0",
      "@swc/core": "^1.3.90",
      "@swc/cli": "^0.1.62",
      "@swc/helpers": "^0.5.2"
    };


    packageJson.scripts = {
      ...packageJson.scripts,
      dev: "webpack serve --mode development",
      build: "webpack --mode production",
    };

    packageJson.lisence = "MIT";
    packageJson.author = {
      name: "Sahil Sharma",
      linkedin: "https://www.linkedin.com/in/sahil-sharma-ss9043283",
      github: "https://github.com/sahil75831",
      medium: "https://medium.com/@sahilsharma_SoftwareDeveloper",
    };

    // Write back to package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    console.log(`\n ${blue}${bold}Creating project structure...`);
    fs.mkdirSync(path.join(projectPath, "src"), { recursive: true });
    fs.mkdirSync(path.join(projectPath, "public"), { recursive: true });
    fs.mkdirSync(path.join(projectPath, "public/assets"), { recursive: true });
    fs.mkdirSync(path.join(projectPath, "src/components"), { recursive: true });


    console.log(`${yellow} Generating index.html file...`);
    fs.writeFileSync(
      path.join(projectPath, "public", "index.html"),
      `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${projectName !== "." ? projectName : path.basename(cwd)}</title>
            <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
        </head>
        <body>
            <div id="root"></div>
        </body>
        </html>`
    );

    console.log(`${blue} Creating favicon.svg...`);
    fs.writeFileSync(
      path.join(projectPath, "public/assets", "favicon.svg"),
      `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#00D8FF" fill-rule="evenodd"> <circle cx="11.996" cy="11.653" r="2.142"></circle> <path fill-rule="nonzero" d="M11.9957722,7.80914159 C14.763782,7.80914159 17.3932297,8.19939152 19.3922491,8.88758063 C21.6123871,9.6518808 22.9666335,10.7818833 22.9666335,11.652558 C22.9666335,12.5799965 21.5040812,13.7840336 19.1293161,14.5708627 C17.2387355,15.1972602 14.7092455,15.538679 11.9957722,15.538679 C9.14520032,15.538679 6.58717845,15.203913 4.71853163,14.565185 C3.54866968,14.1653247 2.58256656,13.6456709 1.92037292,13.0785821 C1.32532838,12.5689984 1.02491103,12.0630628 1.02491103,11.652558 C1.02491103,10.7789546 2.32734001,9.66464781 4.49959681,8.90729393 C6.49945246,8.21010004 9.19325759,7.80914159 11.9957722,7.80914159 L11.9957722,7.80914159 L11.9957722,7.80914159 L11.9957722,7.80914159 L11.9957722,7.80914159 M11.9957722,6.78423056 C9.08437994,6.78423056 6.2777499,7.20198239 4.1621939,7.93951199 C1.62214541,8.82509585 0,10.2129394 0,11.652558 C0,13.1394248 1.74140227,14.6307252 4.38703934,15.5350074 C6.37567236,16.2147483 9.04125041,16.56359 11.9957722,16.56359 C14.8115523,16.56359 17.4474553,16.2078081 19.4516644,15.5437626 C22.2020573,14.632477 23.9915445,13.1592927 23.9915445,11.652558 C23.9915445,10.2077356 22.3170688,8.81052922 19.7258695,7.91848823 C17.6128656,7.19105846 14.871718,6.78423056 11.9957722,6.78423056 L11.9957722,6.78423056 L11.9957722,6.78423056 L11.9957722,6.78423056 L11.9957722,6.78423056 M8.64782576,9.74318674 C10.0306294,7.34537922 11.6822995,5.26251432 13.2771145,3.87459857 C15.0483324,2.33318986 16.7037652,1.72455661 17.4580053,2.15950561 C18.2614273,2.62281187 18.5738182,4.49132292 18.0690455,6.94154209 C17.6671734,8.89223963 16.6992742,11.2540339 15.3437168,13.6046372 C13.9196524,16.0740185 12.3517605,18.1226845 10.8648902,19.4223695 C9.93407029,20.2360369 9.00127666,20.8133347 8.17921011,21.1036655 C7.44050831,21.3645543 6.85214323,21.3720417 6.49651234,21.1669615 C5.73974814,20.7305244 5.42512511,19.045619 5.85426462,16.7855049 C6.24932455,14.7048419 7.24772098,12.1710157 8.64782671,9.74318508 L8.64782576,9.74318674 L8.64782576,9.74318674 L8.64782576,9.74318674 L8.64782576,9.74318674 M7.759974,9.23116928 C6.30547459,11.7533204 5.26525979,14.3932772 4.84734364,16.5943171 C4.34554839,19.2370813 4.73740525,21.3355983 5.98449631,22.0548141 C7.2725788,22.7976074 9.43439148,22.0341158 11.5394159,20.1940284 C13.121755,18.8108935 14.7555742,16.6760844 16.2315707,14.1166508 C17.6382359,11.6774242 18.6468519,9.21627599 19.0728759,7.1483441 C19.6574939,4.31054745 19.2752706,2.02434609 17.9700071,1.27164481 C16.7184046,0.549880923 14.6715337,1.30242953 12.6042836,3.1014613 C10.9185312,4.56851694 9.19669947,6.73986025 7.75997496,9.23116762 L7.759974,9.23116928 L7.759974,9.23116928 L7.759974,9.23116928 L7.759974,9.23116928 M8.65102932,13.6102163 C7.26423584,11.2147037 6.28457878,8.74353725 5.87862056,6.66870559 C5.42774955,4.36439699 5.72720706,2.6262057 6.48072727,2.18999639 C7.28337846,1.72531755 9.05821175,2.38783711 10.9288592,4.04883669 C12.4181905,5.37119379 13.9809502,7.38921897 15.3404734,9.7376059 C16.7686644,12.2045881 17.7605533,14.5861039 18.1440168,16.5233658 C18.384086,17.7361541 18.4183857,18.8326057 18.2593637,19.6898062 C18.1164684,20.4600771 17.8291151,20.9735449 17.473831,21.1792215 C16.7177635,21.6169189 15.1008664,21.0480332 13.3571194,19.5474962 C11.7518336,18.1661133 10.0552117,16.0356933 8.65102599,13.6102105 L8.65102932,13.6102163 L8.65102932,13.6102163 L8.65102932,13.6102163 L8.65102932,13.6102163 M7.76403451,14.1237168 C9.2227685,16.6434222 10.9904487,18.863069 12.6886037,20.3243677 C14.727583,22.0789594 16.7414064,22.7874988 17.9873239,22.0662207 C19.2741476,21.3212689 19.6923336,19.0670565 19.1494202,16.3243517 C18.741335,14.2627011 17.7077401,11.7810493 16.2274688,9.22410641 C14.8166895,6.78718171 13.1881856,4.68425955 11.6093526,3.2824351 C9.4428116,1.3587035 7.27122101,0.548080175 5.96723274,1.30299809 C4.71682218,2.02685487 4.34655386,4.17606524 4.87278214,6.8655093 C5.30188762,9.05864543 6.32316039,11.6347867 7.76403118,14.1237111 L7.76403451,14.1237168 L7.76403451,14.1237168 L7.76403451,14.1237168 L7.76403451,14.1237168"></path> </g> </g></svg>`
    );

    //   creating index.css
    console.log(`${yellow} Setting up index.css file...`);
    fs.writeFileSync(
      path.join(projectPath, "src", "index.css"),
      `.container {
  /* border: 4px solid red; */
  display: flex;
  align-items: center;
}

.linkGroup {
  font-size: 1.3rem;
  font-weight: bold;
  color: black;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  padding: 1.2rem 2.5rem;
  border-radius: 1rem;
  border: 2px dashed black;
  margin: .51rem;
  text-align: center;
}
a{
text-decoration: none;
}`
    );

    //   creating index.ts file
    console.log(`${blue} Initializing index.ts...`);
    fs.writeFileSync(
      path.join(projectPath, "src", "index.ts"),
      `import("./App");
    `
    );

    //   creation tsconfig
    console.log(`${yellow} Configuring tsconfig.json...`);
    fs.writeFileSync(
      path.join(projectPath, "tsconfig.json"),
      JSON.stringify(
        {
          compilerOptions: {
            target: "ES6",
            outDir: "dist",
            lib: ["dom", "dom.iterable", "esnext"],
            allowJs: true,
            skipLibCheck: true,
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            strict: true,
            forceConsistentCasingInFileNames: true,
            module: "esnext",
            moduleResolution: "node",
            isolatedModules: true,
            resolveJsonModule: true,
            noEmit: true,
            jsx: "react",
            sourceMap: true,
            declaration: true,
            noUnusedLocals: true,
            noUnusedParameters: true,
            incremental: true,
            noFallthroughCasesInSwitch: true,
          },
          include: ["src/**/*"],
          exclude: ["node_modules", "build", "dist"],
        },
        null,
        2
      )
    );

    console.log(`${blue} Creating App.tsx component...`);
    fs.writeFileSync(
      path.join(projectPath, "src", "App.tsx"),
      `import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// const RemoteComp = React.lazy(() => import('RemoteApp/Component'));


const App: React.FC = () => (
  <div className="container" style={{display:"flex", flexDirection:"column"}}>
    <h1>Hi, welcome to the ${projectName === "." ? path.basename(cwd) : projectName}</h1>

    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 className='linkGroup' style={{border:"none", boxShadow:"none"}}>About Author</h2>
      <a href='https://www.linkedin.com/in/sahil-sharma-ss9043283'><div className='linkGroup'> Linkedin </div></a>
      <a href='https://github.com/sahil75831'><div className='linkGroup'>Github </div></a>
      <a href='https://medium.com/@sahilsharma_SoftwareDeveloper'><div className='linkGroup'>Medium </div></a>

    </div>

       {/* <Suspense fallback={<h3>Loading......</h3>}>
      <div >
        <RemoteComp />
      </div>
    </Suspense> */}
  </div>
);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
    );




    console.log(`${yellow} Setting up webpack.config.js...`);
    fs.writeFileSync(
      path.join(projectPath, "webpack.config.js"),
      `

const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.ts",
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: "auto",
    },
    module: {
      rules: [
       {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript", // Change to "ecmascript" if using JS
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                  },
                },
              },
            },
          },
        },
        {
          test: /\.module\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: { modules: true },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: "asset",
          use: [
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: { progressive: true, quality: 75 },
                optipng: { enabled: false },
                pngquant: { quality: [0.7, 0.9], speed: 4 },
                gifsicle: { interlaced: false },
              },
            },
          ],
        },
      ],
    },
    optimization: isProduction
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              parallel: true,
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ],
          splitChunks: {
            chunks: "all",
            maxSize: 9000000,
          },
          runtimeChunk: "single",
        }
      : {},
    plugins: [
       new ModuleFederationPlugin({
         name: "${projectName === "." ? capitalizeFirstLetter(removeSpaces(path.basename(cwd))) : capitalizeFirstLetter(projectName)
      }",
         filename: "remoteEntry.js",
         remotes: {
          // RemoteApp: "<RemoteApp_name/>@http://localhost:<RemoteApp_runningPort/>/remoteEntry.js",
        },
         exposes: {
            //  "./Component": "./src/components/MyComponent.jsx",
         },
         shared: {
           react: { singleton: true, requiredVersion: "^18.0.0" },
           "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
         },
       }),
      new HtmlWebPackPlugin({
        template: "public/index.html",
        minify: isProduction
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? "[name].[contenthash].css" : "[name].css",
      }),
      new CompressionPlugin({
        algorithm: "brotliCompress",
        test: /\.(js|css|html)$/,
      }),
      new CompressionPlugin({
        algorithm: "gzip",
        test: /\.(js|css|html)$/,
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "public/assets", to: "assets" }],
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: isProduction ? "static" : "disabled",
      }),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    performance: {
      hints:  false && "warning",
      maxAssetSize: 200000,
    },
    cache: {
      type: "filesystem",
      //   cacheDirectory: path.resolve(__dirname, "custom_cache"),
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      compress: true,
      port: ${port},
      open: true,
      historyApiFallback: true,
      hot: true,
       allowedHosts: "all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    },
  };
};
`
    );

    console.log(`${blue} Creating .swcrc setup...`);
    fs.writeFileSync(
      path.join(projectPath, ".swcrc"),
      JSON.stringify({
        jsc: {
          parser: {
            syntax: "ecmascript",
            jsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      })
    );

    console.log(`${yellow} Creating declare.d.ts setup...`);
    fs.writeFileSync(
      path.join(projectPath, "src", "declare.d.ts"),
      `// declare module "RemoteApp/Component" {
//     const Component: React.ComponentType;
//     export default Component;
//   }
  `
    );

    console.log(`${blue} Creating MyComponent in Component Directory...`)
    fs.writeFileSync(path.join(projectPath, "src", "components", "MyComponent.jsx"), `import React from "react";

const MyComponent = () => (
    <div >
        <h1>Shared component</h1>
    </div>
);
export default MyComponent`)


    console.log(`\n ${red} ✅ Project setup complete!`);

    console.log(
      `\n\n${red}Project setup complete! Run the following commands:`
    );
    projectName !== "." && console.log(`cd ${projectName}`);

    console.log(`npm install \n`)
    console.log("npm run dev");

    console.log(`\n ${reset}`)

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error during project setup:", error.message);
  }
}
