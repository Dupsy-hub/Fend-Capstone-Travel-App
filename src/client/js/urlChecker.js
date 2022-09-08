function urlChecker(url) {
    console.log("::: Running checkForName :::", url);

    // Setting the url regex
    const expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    

//if the input matches the url regex, then don't display the invalid text, otherwise, display it
    if (regex.test(url)) {
        console.log("Valid url")
    } else {
        console.log("Invalid url! Doesn't match.")
    }
}

export { urlChecker }
