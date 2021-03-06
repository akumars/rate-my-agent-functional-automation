require('babel-core/register')

const config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'https://www.ratemyagent.com.au/',
  capabilities: {
    browserName: 'chrome',
  },
  params: {
    pageTimeOut: 20000,
  },
  getPageTimeout: 30000,
  allScriptsTimeout: 30000,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: [
    './features/*.feature',
  ],
  // cucumber command line options
  cucumberOpts: {
    require: ['./step-definitions/*.js'],
    tags: [],
    strict: true,
    'dry-run': false,
    compiler: [],
  },
  onPrepare() {
    browser.manage().window().maximize() // maximize the browser before executing the feature files
    switch (browser.baseUrl) {
      case ('https://www.ratemyagent.com.au/'):
        browser.username = 'sak.arun@gmail.com'
        browser.password = 'Test007!'
        break
      case ('https://www.ratemyagent.com/'):
        browser.username = 'sak.arun@gmail.com'
        browser.password = 'Test007!'
        break
      default:
    }
  },
}

exports.config = config
