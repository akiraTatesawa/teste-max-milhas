Feature: Add CPF to the shortlist
    The Product Owner can add a CPF to the shortlist for future reference.

    Scenario: the Product Owner adds a CPF successfully
        Given I am the Product Owner
        And I provide a valid CPF "17854840016"
        When I try to add the CPF to the shortlist
        Then I should see the CPF and its registration timestamp

    Scenario: the Product Owner tries to add a CPF with invalid format, and fails
        Given I am the Product Owner
        And I provide an invalid CPF (with punctuation) "178.548.400-16"
        When I try to add the CPF to the shortlist
        Then I should see the message "Invalid CPF format"

    Scenario: the Product Owner tries to add an invalid CPF, and fails
        Given I am the Product Owner
        And I provide an invalid CPF "78300163099"
        When I try to add the CPF to the shortlist
        Then I should see the message "CPF is not valid"

    Scenario: the Product Owner tries to add a CPF with repeated numbers, and fails
        Given I am the Product Owner
        And I provide an invalid CPF "11111111111"
        When I try to add the CPF to the shortlist
        Then I should see the message "CPF is not valid"

    Scenario: the Product Owner tries to add a CPF that is already in the shortlist, and fails
        Given I am the Product Owner
        And I provide a valid CPF "17854840016"
        But the CPF is already in the shortlist
        When I try to add the CPF to the shortlist
        Then I should see the message "CPF is already in the shortlist"

