@parentSuite("Gherkin_parent_suite")
@suite("Gherkin_suite")
@subSuite("Gherkin_sub_suite")
@epic("Behaviours_epic")
@story("Behaviours_story")
Feature: Gherkin_feature

    I want gherkin scenarios be logged into allure

    Scenario: Allure gherkin suite structure
        Given some precondition
        When I do some actions
        Then I get some result

    @owner("Oleksandr_Shevtsov")
    @severity("critical")
    @testID("42")
    @issue("ACT-123")
    @tms("TC-123")
    @link("google","https://google.com")
    @link("https://example.com/")
    @willBeTag
    Scenario: Allure labels
        Given some precondition
        Then I am very happy

    Scenario Outline: Some scenario with examples
        When I sum <a> and <b>
        Then I want to see <result>
        Examples:
            | a | b  | result |
            | 3 | 1  | 4      |
            | 3 | 1  | 5      |
            | 3 | 2  | 5      |
            | 2 | -1 | 1      |

    Scenario Outline: Will attach links for each example separately
        Given some precondition
        Then I am very happy
        Examples:
            | tms         | issue  |
            | TEST-CASE-1 | TASK-1 |
            | TEST-CASE-2 | TASK-2 |