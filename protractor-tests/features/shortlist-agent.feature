#shortlist-agent.feature
Feature: Shortlist Agents
  As an authenticated user
  I should be able to add agents to shortlist and also remove them
  I should be able to view the count of shortlisted agents
  I should be able to view a list of shortlisted agents

  Scenario: Shortlist Agents successfully
    Given I navigate to ratemyagent website
    When I click the "Log in" link
    And I login with valid credentials
    # And I enter the "login.Email" as "sak.arun@gmail.com"
    # And I enter the "login.Password" as "Test007!"
    And I click the "Log In" button
    Then I should see the "profile" button
    When I click the "Search" button
    Then The "search-label" should have the text "Search by location or name"
    When I enter the "search-text" as "Rowville"
    And I click on "Rowville, VIC, 3178" from "Locations" search result
    Then The "page-heading" should have the text "Rowville, 3178"
    When I click on "Agents" tab
    Then The "agents-sub-heading" should have the text "agents with recommendations in the past 12 months"
    And The agent number "2" is "Simon Wang"
    When I "add to" shortlist the agent number "2"
    Then The "agent-shortlist-count" should have the text "2"
    # When I "remove from" shortlist the agent number "1"
    # Then The "agent-shortlist-count" should have the text "1"
    When I click the "shortlisted-agents" element
    Then The "shortlist-heading" should have the text "2 Shortlisted Agents"
    And The shortlisted agent number "1" is "Simon Wang"
    When I click on "Remove" button for shortlisted agent number "1"
    Then The "agent-shortlist-count" should have the text "1"
    And The "shortlist-heading" should have the text "1 Shortlisted Agent"

