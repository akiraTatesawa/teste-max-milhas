Feature: List all CPFs
    The Product Owner can list all the CPFs

    Scenario: The Product Owner lists all the CPFs successfully
        Given I am the Product Owner
        When I try to list all the CPFs
        Then I should see a list of CPFs

    Scenario: The Product Owner lists all the CPFs, but there are no CPFs in the shortlist
        Given I am the Product Owner
        And there are no CPFs in the shortlist
        When I try to list all the CPFs
        Then I should see an empty list
