# Financial Forecaster
**Identify Your Debt. Seize Your Future.**
The financial forecaster is a tool used to increase debt self-awareness by gathering and calculating hurdles in one place. There are no actual financial decisions to be made with the Forecaster—only a visual representation of planning a monthly budget, and how much money one can set aside to pay down their debt.

## WHY

If managed well, debt can be helpful to experiencing life in an impactful way, and sooner rather than later. However, if managed irresponsibly, debt is one of the realest, most crippling problems that adults face.

I wanted to make a tool that gets someone started in acknowledging their debt, prioritize the worst points, and realistically set monthly budget expectations in a clean, visible way.

## SCREENSHOT

![Screenshot of App Organization](https://github.com/nomcgill/financial-forecaster/blob/master/Screenshot1.png?raw=true)

## THE USER EXPERIENCE

The Financial Forecaster is a single-page app—the idea was simplicity. From this page, one can manage their **"Hurdles"**, another naming of any debt form such as lines of credit or loans, and can also create a quick profile to save and return to their profile later.

While managing Hurdles, the user is constantly updated at the bottom of the screen of their changing:

1. **Total Owed.** This aggregates to total principal balance of all hurdles.
2. **Monthly Expense.** This will aggregate the total monthly amounts that the user has allotted for each Hurdle—essential for planning a monthly budget.
3. **Final Paid.** A sum of the long-term, final calculated amount to be paid based on the pacing of the user's Hurdle payments. Here, by comparing to the "Total Owed" block, a user can see the actual debt that they should feel based on what they expect to be paid in interest.

## UNDER THE HOOD
* Front End: HTML, CSS, JavaScript, JQuery, and json API GET, POST, and PUT requests.
* Back End: A server file which routes requests to a MongoDB Atlas collection. Sets up endpoints for all necessary front-end requests.
* All stored on Heroku.

### The Log In
Because no confidential data is stored, a user simply creates a username to accompany their loans. No confidential information is meant to be stored in the app, but regardless a password functionality will be added in the near future. 

## To Be Continued...

On that note, the app still has improvements to be made! Upcoming changes include:
* Password implementation. Token generation. The works.
* Information bubbles. A little, hover-able tool-tip would be a relieving addition to help people in less-known areas, such as "What is APR?" and further advice.
* Sort Hurdles. An option to self-prioritize hurdles, sort by balance or by interest rate.

## See It Working
See the site [here on Heroku](https://financial-forecaster.herokuapp.com/).
