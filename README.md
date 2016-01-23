#MusicTree

MusicTree is a quick reference guide to recorded music.  Utilizing the [Discogs API](https://www.discogs.com/developers/), MusicTree provides an easy-to-use interface enabling the user to search and browse artist discographies.

![Screenshot](https://storage.googleapis.com/west-coast-skateparks/music-tree-screenshot.jpg)

##Deployment

West Coast Skateparks is deployed to Heroku. Visit the app [here](https://music-tree.herokuapp.com/)

##Technology

Music Tree is a fully decoupled, single-page app built in [React](https://facebook.github.io/react/) and [Rails](rubyonrails.org). [Material-UI](http://www.material-ui.com/) helps it look nice.

##Explore

If you would like to explore the code and run it on your local machine, you will need to obtain your own tokens to access the Discogs API.  Go [here](http://www.discogs.com/developers/) and click "Create an App."" Once you obtain your tokens, you will need to store them in a secure place where the app can access it. One option for doing that is described [here](https://github.com/bkeepers/dotenv). Make sure you have [Ruby 2.2.0](https://rvm.io/rvm/install) and [Node 0.10.x](https://github.com/creationix/nvm) installed.  Once you have an access token do the following:

Clone the repo from your command line:

`git clone https://github.com/alookatommorow/music-tree2.0.git`

Navigate to the `music-tree2.0` folder.

Bundle install for Rails:

`bundle install`

Install [Node Package Manager](https://www.npmjs.com/)

Start the Rails server:

`rails s`

Start the Node server:

`npm run devserve`

Open your browser and navigate to `localhost:8080`

##Code Sample



```javascript

```