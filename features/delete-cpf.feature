Feature: Remove CPF from shortlist
    The Product Owner can delete a CPF from the shortlist

    Scenario: The Product Owner deletes a CPF successfully
        Given I am the Product Owner
        And I provide a valid CPF "17854840016"
        When I try to delete the CPF
        Then I should not receive any error messages

    Scenario: The Product Owner tries to delete a CPF that is not in the shortlist, and fails
        Given I am the Product Owner
        And I provide a valid CPF "17854840016"
        But the CPF is not in the shortlist
        When I try to delete the CPF
        Then I should see the message "CPF not found"

    Scenario: The Product Owner tries to delete an invalid CPF, and fails
        Given I am the Product Owner
        And I provide an invalid CPF "17854840099"
        When I try to delete the CPF
        Then I should see the message "CPF is not valid"

    Scenario: The Product Owner tries to delete a CPF with invalid format, and fails
        Given I am the Product Owner
        And I provide a CPF with an invalid format "178.548.400-16aaa"
        When I try to delete the CPF
        Then I should see the message "Invalid CPF format"
