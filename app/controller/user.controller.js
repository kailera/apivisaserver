exports.allAccess = (req, res)=>{
    res.status(200).send("Public Content")
}

exports.fiscalBoard = (req, res)=>{
    res.status(200).send("Fiscal Content")
}

exports.adminBoard = (req, res)=>{
    res.status(200).send("Admin Content")
}

exports.moderatorBoard = (req, res)=>{
    res.status(200).send("Moderator Content")
}

