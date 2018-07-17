const { Given, When, Then } = require('cucumber')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const expect = chai.expect

const getFieldIdentifier = elementName => ({
  profile: '.rmaUserNav_profile-button',
  Search: '.rmaHeader__searchBox',
  'Log In': '.modal-body .btn',
  'search-label': '.rmaAutoSearchHeader label span',
  'search-text': 'vm.searchTerm',
  'page-heading': 'div[class*="Header---title"] h1',
  'agents-sub-heading': 'div h2[class*="Members---header"]',
  'agent-shortlist-count': '.rmaHeaderShortlistCount__count',
  'shortlisted-agents': '.rmaHeaderShortlistCount a',
  'shortlist-heading': '.rmaUserShortlist h1',
}[elementName] || elementName)

Given(/^I navigate to ratemyagent website$/, { timeout: 20000 }, async () => {
  await browser.get(browser.baseUrl)
})

When(/^I click the "([^"]*)" link$/, async (linkText) => {
  await element(by.cssContainingText('a', linkText)).click()
})

When(/^I click the "([^"]*)" button$/, async (buttonText) => {
  const elementIdentifier = getFieldIdentifier(buttonText)
  await element(by.cssContainingText(elementIdentifier, buttonText)).click()
})

When(/^I click on "([^"]*)" tab$/, async (tabText) => {
  await element(by.cssContainingText('section a div span', tabText)).click()
})

When(/^I click the "([^"]*)" element$/, async (elementName) => {
  const elementIdentifier = getFieldIdentifier(elementName)
  await element(by.css(elementIdentifier)).click()
})

When(/^I click on "([^"]*)" from "([^"]*)" search result$/, { timeout: 20000 }, async (locationName, resultSetType) => {
  await element(by.cssContainingText(`rma-auto-search-result-set[type=${resultSetType}]  .rmaAutoSearchResult__details`, locationName)).click()
})

When(/^I should see the "([^"]*)" button$/, async (buttonName) => {
  const elementIdentifier = getFieldIdentifier(buttonName)
  await browser.wait(async () => {
    try {
      return await element(by.css(elementIdentifier)).isPresent()
    } catch (error) { throw error }
  },
  1000,
  `${buttonName} button not visible yet`)
})

When(/^I see "([^"]*)" error message as "([^"]*)"$/, { timeout: 10000 }, async (elementName, errorText) => {
  const errorToastElement = await element(by.css(`[ng-show="${elementName}.error.message"]`))
  await expect(errorToastElement.getText()).to.eventually.equal(errorText)
})

When(/^The "([^"]*)" should have the text "([^"]*)"$/, { timeout: 10000 }, async (elementName, expElementText) => {
  const elementIdentifier = getFieldIdentifier(elementName)
  const elementText = await element(by.css(elementIdentifier))
  await expect(elementText.getText()).to.eventually.include(expElementText)
})

When(/^I enter the "([^"]*)" as "([^"]*)"$/, async (inputName, inputValue) => {
  const elementIdentifier = getFieldIdentifier(inputName)
  const input = await element(by.model(elementIdentifier))
  await input.sendKeys(inputValue)
})

When(/^I "([^"]*)" shortlist the agent number "([^"]*)"$/, async (shortlistAction, agentId) => {
  const shortListClass = shortlistAction === 'add to' ? 'addToShortlist' : 'shortlisted'
  await element(by.css(`div:nth-child(${agentId}) > div > div > div[class*="TeamMember---this"] div[class*="TeamMember---content"] div a[class*="AgentShortlist---${shortListClass}"]`)).click()
})

When(/^The agent number "([^"]*)" is "([^"]*)"$/, async (agentId, agentName) => {
  const nameElement = await element(by.css(`div:nth-child(${agentId}) > div > div > div[class*="TeamMember---this"] div[class*="TeamMember---content"] div[class*="TeamMember---name"]`))
  await expect(nameElement.getText()).to.eventually.equal(agentName)
})

When(/^The shortlisted agent number "([^"]*)" is "([^"]*)"$/, async (agentId, agentName) => {
  const nameElement = await element(by.css(`.rmaUserShortlist__list rma-user-shortlisted-agent:nth-child(${agentId}) .rmaUserShortlistedAgent__summary h2`))
  await expect(nameElement.getText()).to.eventually.equal(agentName)
})

When(/^I click on "([^"]*)" button for shortlisted agent number "([^"]*)"$/, async (buttonText, agentId) => {
  await element(by.cssContainingText(`.rmaUserShortlist__list rma-user-shortlisted-agent:nth-child(${agentId}) .rmaUserShortlistedAgent__summary__stats button`, buttonText)).click()
})

