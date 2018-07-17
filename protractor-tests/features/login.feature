#login.feature
Feature: User authentication scenarios

  Scenario Outline: Login - Failure Scenarios
    Given I navigate to ratemyagent website
    When I click the "Log in" link
    And I enter the "login.Email" as "<Email>"
    And I enter the "login.Password" as "test"
    And I click the "Log In" button
    Then I see "login" error message as "<ErrorText>"
    Examples:
    | Email | ErrorText |
    | sak.arun@gmail.com  | Sorry, we couldn’t sign you in. You may not have an account with us yet or the details your provided may be incorrect.  |
    | sak.arun| The Email field is required.|
