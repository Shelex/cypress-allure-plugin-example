@epic("cucumber")
@story("myStory")
Feature: The Google

    I want to open Google page

    @subSuite("firsttest0")
    @epic("firsttest2")
    @story("firsttest4")
    @severity("critical")
    @owner("firsttest8")
    @someOtherTags
    @issue("jira","https://google.com")
    Scenario: Opening a Google network page
        Given I open Google page
        Then I see "Google" in the title

    @subSuite("secondtest0")
    @epic("secondtest2")
    @story("secondtest4")
    @severity("normal")
    @owner("secondtest8")
    Scenario: Different kind of opening
        Given I kinda open Google page
        Then I am very happy

    @subSuite("thirdtest0")
    @epic("thirdtest2")
    @story("thirdstory")
    @severity("minor")
    @owner("me")
    @someOtherTags
    @tms("link-to-tms","https://google.com")
    Scenario Outline: Some scenario with examples
        When I sum <a> and <b>
        Then I want to see <result>
        Examples:
            | a | b  | result |
            | 3 | 1  | 4      |
            | 3 | 1  | 5      |
            | 3 | 2  | 5      |
            | 2 | -1 | 1      |