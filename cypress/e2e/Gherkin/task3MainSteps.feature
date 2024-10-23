Feature: Warenkorb dynamische Preisaktualisierung
  In order to ensure the total price is updated dynamically based on user actions,
  as a customer, I want the cart to recalculate the total price when adding or removing products.

  Background:
    Given I enter zipecode "81369" and I go to the home page

  Scenario: Dynamically update the total price based on user clicks for Water Category
    When I select the category "Wasser"
    And I add 5 units of the first product to the cart
    Then the total price should be displayed correctly

    When I check the product price for the 1th product
    And I verify the product quantity in the cart
    And I click on the cart icon
    And I add 1 unit of the second product to the cart
    And I delete 1 unit of the second product from the cart
    Then the total price should be updated correctly in the cart

    When I get the delivery fee
    And I open the delivery fee details
    And I wait for 2 seconds
    Then I should see the delivery fee information

    When I close the delivery fee details
    Then the correct delivery fee should be displayed


  Scenario: Dynamically update the total price based on user clicks for Beer Category
    When I select the category "Bier"
    And I add 4 units of the first product to the cart
    Then the total price should be displayed correctly

    When I check the product price for the 1th product
    And I verify the product quantity in the cart
    And I click on the cart icon
    And I add 2 unit of the second product to the cart
    And I delete 2 unit of the second product from the cart
    Then the total price should be updated correctly in the cart

    When I get the delivery fee
    And I open the delivery fee details
    And I wait for 2 seconds
    Then I should see the delivery fee information

    When I close the delivery fee details
    Then the correct delivery fee should be displayed


  Scenario: Dynamically update the total price based on user clicks for Wine Category
    When I select the category "Weine"
    And I add 4 units of the first product to the cart
    Then the total price should be displayed correctly

    When I check the product price for the 1th product
    And I verify the product quantity in the cart
    And I click on the cart icon
    And I add 2 unit of the second product to the cart
    And I delete 2 unit of the second product from the cart
    Then the total price should be updated correctly in the cart

    When I get the delivery fee
    And I open the delivery fee details
    And I wait for 2 seconds
    Then I should see the delivery fee information

    When I close the delivery fee details
    Then the correct delivery fee should be displayed