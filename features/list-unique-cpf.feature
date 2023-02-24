Feature: List an unique CPF
    The Product Owner can provide a CPF and checks if it's in the shortlist

    Scenario: The Product Owner list a CPF successfully
        Given I am the Product Owner
        And I provide a valid CPF "17854840016"
        When I try to list the CPF
        Then I should see the CPF and its registration timestamp

    Scenario: The Product Owner tries to list a CPF that is not in the shortlist, and fails
        Given I am the Product Owner
        And I provide a valid CPF "17854840016"
        But the CPF is not in the shortlist
        When I try to list the CPF
        Then I should see the message "CPF not found"

    Scenario: The Product Owner tries to list a CPF with an invalid format, and fails
        Given I am the Product Owner
        And I provide a CPF with an invalid format "178.548.400-16aaa"
        When I try to list the CPF
        Then I should see the message "Invalid CPF format"

    Scenario: The Product Owner tries to list an invalid CPF, and fails
        Given I am the Product Owner
        And I provide an invalid CPF "11111111111"
        When I try to list the CPF
        Then I should see the message "CPF is not valid"
