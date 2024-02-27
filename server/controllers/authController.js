const passport = require('passport');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModels');
const ApiError = require('../utils/apiError');
const createToken = require('../utils/createToken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3001/api/v1/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

exports.googleAuthHandler = passport.authenticate('google', { scope: ['email', 'profile'] });

exports.googleAuthCallbackHandler = (req, res, next) => {
    passport.authenticate('google', { successRedirect:"http://localhost:5173/",failureRedirect: '/' })(req, res, next);
};

exports.signup = asyncHandler(async (req, res, next) => {
    const { name, email, password, googleId } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { googleId }] });

    if (existingUser) {
        return next(new ApiError('Email or Google ID is already in use', 400));
    }

    let newUser;

    if (email && password) {
        const hashedPassword = await bcrypt.hash(password, 12);

        newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            googleId: undefined,
        });
    }

    if (googleId) {
        newUser = await User.create({
            name,
            email: undefined,
            password: undefined,
            googleId,
        });
    }

    const token = createToken(newUser._id);

    res.status(201).json({ data: newUser, token });
});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password, googleId, magicLinkToken } = req.body;

    let user;

    if (email && password) {
        user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new ApiError('Incorrect email or password', 401));
        }
    } else if (googleId) {
        user = await User.findOne({ googleId });
        if (!user) {
            return next(new ApiError('No user found with the provided Google ID', 401));
        }
    } else if (magicLinkToken) {
        try {
            const decodedToken = jwt.verify(magicLinkToken, process.env.JWT_SECRET_KEY);

            if (decodedToken && decodedToken.userId) {
                user = await User.findById(decodedToken.userId);
                if (!user) {
                    return next(new ApiError('User not found', 401));
                }

                const token = createToken(user._id);
                const { password: _, ...userData } = user._doc;

                return res.status(200).json({ user: userData, token });
            } else {
                return next(new ApiError('Invalid magic link token', 401));
            }
        } catch (error) {
            return next(new ApiError('Invalid magic link token', 401));
        }
    }

    const token = createToken(user._id);
    const { password: _, ...userData } = user._doc;

    res.status(200).json({ user: userData, token });
});
