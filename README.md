## NodeJS Programming Task


### Prerequisites

- Please note that this will require some basic JavaScript and [ExpressJS](http://expressjs.com/) knowledge. 
- You will need to have [NodeJS](http://www.nodejs.org/) installed to complete this task. 

## Task

1. Fork this repository.
1. Create a `src` folder to contain your code. 
1. In the `src` directory, please create an ExpressJS app that fills the requirements in *Program Requirements* below.
1. Write unit tests. See *Tests* below.
1. Commit and push your code to your new repository. Don't squash commits.
1. Write a `README.md` file explaining the choices you made any why you made them. Don't treat this assignment like a simple
one-off app; please build it to be usable (no inline scripts, styles, etc). Bonus points if you correctly execute a proper
build. Use this as an opportunity to impress us with a sane, extensible architecture.
1. Send us a pull request, we will review your code and get back to you.

### Program Requirements

1. Connect to the [Github API](http://developer.github.com/)
1. Create a route (`/joyent`) that returns all repositories under the [joyent](https://github.com/joyent) org.
1. Create a route (`/joyent/:repo`) that returns the 100 most recent commits of any of joyent's repos in a table or list. 
   To be clear, `:repo` is a parameter, and a user can enter any string (such as `node` or `libuv`) to get results for that repo.
1. Cache responses coming from the GitHub API using an external store. Be prepared to talk about which store you chose, why you chose it,
   the pros/cons of that store versus others and how you chose to configure it. This is a deliberately open-ended question.
1. Be a nice consumer to the GitHub API. Ensure that no more than 3 concurrent requests are ever made to the API. Write an abstraction layer
   over your requests to the API that performs this throttling. If more requests than the limit are made, requests should wait for an open spot.
   Do not simply an error if too many requests are in progress. 
1. Per commit, display:
   * Author name 
   * Email
   * Author avatar (gravatar)
   * Full commit message
   * Date per commit (in the user's local time zone)
   * `fib(i)` (the value of the fibonacci sequence at index i, where i is the row number)
1. Using CSS (no JS or style tags in the template), when the commit hash ends in a number, color that row to light blue `#E6F1F6`.
1. Using CSS (no JS or style tags in the template), ensure that each commit message completely fills the bounds of its box. For example,
   a commit message containing 20 characters should take up the same width as a commit message containing 160 characters.

Use whichever [templating engine](http://garann.github.io/template-chooser/) you wish, 
but be prepared to tell me why you chose it.

### Tests

Create the following unit test with the testing framework of your choice. 
Use the [joyent/node](https://github.com/joyent/node) repository for your tests.

1. Verify the the correct number of results are returned and that they are each unique. 
1. Verify that rows ending in a number are colored light blue.  
1. Verify that no more than 3 concurrent requests can be made to the GitHub API at a single time.
   Consider mocking up a webserver to test this properly. 
1. Add any other unit tests you feel are necessary to properly ensure correct operation of this program.