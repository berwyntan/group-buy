const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const handleNewUser = async (req, res) => {
    const { name, mobile, password } = req.body;
    // validation

    if (!mobile || !password || !name) return res.status(400).json({ 'message': 'Username, mobile, password are required.'});
    if (!validator.isLength(mobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(mobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});
    if (!validator.isAlphanumeric(password)) 
        return res.status(400).json({ 'message': 'Password invalid.'});
    if (!validator.isLength(password, {min: 5})) 
        return res.status(400).json({ 'message': 'Password must be at least 5 characters.'});
    if (!validator.isLength(name, {min: 1, max: 30})) 
        return res.status(400).json({ 'message': 'Name must be between 1 and 30 characters.'});

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({where: { mobile: mobile }});
    if (duplicate) return res.status(409).json({ 'message': 'Mobile number already taken.'}); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new mobile
        const result = await User.create({
            name: name,
            password: hashedPwd,
            mobile: mobile
        });

        // console.log(result);

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const handleLogin = async (req, res) => {
    const { mobile, password } = req.body;
    
    if (!mobile || !password) return res.status(400).json({ 'message': 'Username, mobile, password are required.'});
    if (!validator.isLength(mobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(mobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});
    if (!validator.isAlphanumeric(password)) 
        return res.status(400).json({ 'message': 'Password invalid.'});
    if (!validator.isLength(password, {min: 5})) 
        return res.status(400).json({ 'message': 'Password must be at least 5 characters.'});


    const foundUser = await User.findOne({where: { mobile: mobile }});
    // console.log(foundUser);
    if (!foundUser) return res.status(401).json({ 'message': 'User not found.'});
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {

        try {
            // create JWTs
            const accessToken = jwt.sign(
                {
                    "userInfo" : {
                        "mobile": foundUser.mobile,
                        "role": foundUser.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            const refreshToken = jwt.sign(
                { "mobile": foundUser.mobile, },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '2d' }
            );

            // Saving refreshToken with current mobile
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            
            // console.log(`access: ${accessToken}`)
            // console.log(`refresh: ${refreshToken}`)

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 2 * 24 * 60 * 60 * 1000 });

            return res.status(200).json({ 
                name: foundUser.name,
                id: foundUser.id,
                mobile: foundUser.mobile,
                role: foundUser.role,
                accessToken: accessToken
            });
            } catch (error) {
                return res.status(500).json({ 'message': 'Server error.'});
            }
        } else {
            return res.status(401).json({ 'message': 'Password incorrect.'});
        }        
}

const handleRefreshToken = async (req, res) => {
    // console.log(req.cookies)
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: "No cookie found" });
    const refreshToken = cookies.jwt;
    console.log(refreshToken);

    const foundUser = await User.findOne({where: { refreshToken }});
    if (!foundUser) return res.status(403).json({ message: "User not found"});
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.mobile !== decoded.mobile) return res.status(403).json({ message: "Refresh not allowed"});;
            const role = foundUser.role;
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "mobile": decoded.mobile,
                        "role": role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            res.status(200).json({ 
                name: foundUser.name,
                id: foundUser.id,
                mobile: foundUser.mobile,
                role: foundUser.role,
                accessToken: accessToken,
                // persist: req.session.persist
             })
        }
    );
}

const handleUpdateUser = async (req, res) => {
    const { name, mobile, password, oldMobile } = req.body;
    // validation

    if (!mobile || !password || !name || !oldMobile) return res.status(400).json({ 'message': 'Username, mobile, password are required.'});
    if (!validator.isLength(mobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(mobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});
    if (!validator.isLength(oldMobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(oldMobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});
    if (!validator.isAlphanumeric(password)) 
        return res.status(400).json({ 'message': 'Password invalid.'});
    if (!validator.isLength(name, {min: 1, max: 30})) 
        return res.status(400).json({ 'message': 'Name must be between 1 and 30 characters.'});

    // check for duplicate mobile in the db
    if (mobile !== oldMobile) {
        const duplicate = await User.findOne({where: { mobile: mobile }});
        if (duplicate) return res.status(409).json({ 'message': 'Mobile number already taken.'}); //Conflict 
    }
    

    // evaluate password 
    const foundUser = await User.findOne({where: { mobile: oldMobile }});
    if (!foundUser) return res.status(404).json({ 'message': 'User not found.'});
    const id = foundUser.id;
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        try {
                
            //update new details
            await User.update(
                {
                    mobile: mobile,
                    name: name
                }, 
                {
                    where: { mobile: oldMobile }
                });
    
            const result = await User.findByPk(id);
            
            res.status(200).json(
                {
                    name: result.name,
                    id: result.id,
                    mobile: result.mobile,
                    role: result.role,
                }
            );
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    } else {
        return res.status(401).json({ 'message': 'Invalid password'})
    }
    
}

const handleUpdatePassword = async (req, res) => {
    const { mobile, password, oldPassword } = req.body;
    // validation

    if (!mobile || !password || !oldPassword) return res.status(400).json({ 'message': 'Mobile and password are required.'});
    if (!validator.isLength(mobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(mobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});
    if (!validator.isAlphanumeric(password)) 
        return res.status(400).json({ 'message': 'Password invalid.'});
    if (!validator.isLength(password, {min: 5})) 
        return res.status(400).json({ 'message': 'Password must be at least 5 characters.'});

    

    // evaluate password 
    const foundUser = await User.findOne({where: { mobile: mobile }});
    if (!foundUser) return res.status(404).json({ 'message': 'User not found.'});
    const id = foundUser.id;
    const match = await bcrypt.compare(oldPassword, foundUser.password);
    if (match) {
        try {
                
            // hash new password
            const hashedPwd = await bcrypt.hash(password, 10);

            //update new details
            await User.update(
                {
                    password: hashedPwd
                }, 
                {
                    where: { mobile: mobile }
                });
    
            const result = await User.findByPk(id);
            
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    } else {
        return res.status(401).json({ 'message': 'Invalid password'})
    }
    
}


module.exports = { handleNewUser, handleLogin, handleRefreshToken, handleUpdateUser, handleUpdatePassword }