const idtouser = new Map();

function setuser(id,user) {
    idtouser.set(id,user);
}

function getuser(id) {
    return idtouser.get(id);
}

module.exports = {
    setuser,
    getuser 
}