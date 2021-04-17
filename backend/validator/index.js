export const  userSignupValidator = (req,res,next) =>{
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Email must be between 3 to 32')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contains @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
        .isLength(
            { min: 6 }
        )
        .withMessage('Mật khẩu phải trên 6 kí tự')
        .matches(/\d/)
        .withMessage('Password must contain a number');

    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error: firstError })
    }
    next();
}