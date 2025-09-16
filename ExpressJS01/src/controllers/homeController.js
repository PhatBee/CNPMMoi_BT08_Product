const getHomePage = async (req, res) => {
    try {
        res.render("index.ejs");
    } catch (error) {
        console.error("Error rendering home page:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getHomePage
}
