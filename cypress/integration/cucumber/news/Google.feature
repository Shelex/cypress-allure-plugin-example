
Feature: The Google

    I want to open Google page

    @subSuite("firsttest0")
    @epic("firsttest2")
    @story("firsttest4")
    @severity("critical")
    @owner("firsttest8")
    @lead("firsttest10")
    @host("firsttest12")
    @thread("115")
    @testMethod("firsttest16")
    @testClass("firsttest18")
    @package("firsttest20")
    @someOtherTags
    @framework("firsttest22")
    @issue("jira","https://google.com")
    @language("firsttest24")
    Scenario: Opening a Google network page
        Given I open Google page
        Then I see "Google" in the title

    @subSuite("secondtest0")
    @epic("secondtest2")
    @story("secondtest4")
    @severity("normal")
    @owner("secondtest8")
    @lead("secondtest10")
    @host("secondtest12")
    @thread("114")
    @package("secondtest20")
    @framework("secondtest22")
    @language("secondtest24")
    Scenario: Different kind of opening
        Given I kinda open Google page
        Then I am very happy
