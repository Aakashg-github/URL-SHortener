const { getuser } = require("../service/auth");

function restrictToLoggedin(req,res,next) {
    const useruid = req.cookies?.uid;
    console.log(useruid);

    if(!useruid)
        return res.redirect('/login');
    const user = getuser(useruid);

    console.log(user);

    if(!user)
        return res.redirect('/login');
    req.user=user;
    next();
}

module.exports = {
    restrictToLoggedin
}