const transferUserToResponse = async (req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.user = req.session.user;
    next();
};
const authorizeAdmin = async (req, res, next) => {
    if(req.session.user == undefined || !req.session.user.isAdmin){
        console.log('i am here');
        res.status(401).send('ACCESS DENIED');
    }
    next();
};
const obj = {
    transferUserToResponse: transferUserToResponse,
    authorizeAdmin: authorizeAdmin
};
export default obj;