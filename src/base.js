import Rebase from "re-base";

//connection to our firebase database
const base = Rebase.createClass({
    apiKey: "AIzaSyAB0WD1LsP22q8ZcOJCp3abU_PbHN4CUzQ",
    authDomain: "catch-of-the-day-c0bf0.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-c0bf0.firebaseio.com"
});

export default base;