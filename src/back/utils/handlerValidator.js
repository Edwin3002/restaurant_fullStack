import { validationResult } from 'express-validator'
import nextConnect from 'next-connect';

const validateRequest = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)))
        const errors = validationResult(req)
        if (errors.isEmpty()) return next()
        res.status(400).json({ code: 404, ...errors })
    }
}

// u can customize where your validator runs
// for example u can use this for validate your PUT request :
//          const put = (middleware) => {
//              return nextConnect().put(middleware)
//          }

// when u call this its ONLY run in post request
const get = (middleware) => {
    return nextConnect().get(middleware);
}
const post = (middleware) => {
    return nextConnect().post(middleware);
}
const put = (middleware) => {
    return nextConnect().post(middleware);
}
const remove = (middleware) => {
    return nextConnect().delete(middleware);
}

// u can set onError , onNoMatch and global middleware or etc
//  handler = nextConnect({ onError, onNoMatch }).use(SOME_MIDDLEWARE) 
const handlerValidator = nextConnect();
export default handlerValidator;
export { validateRequest, get, post, put, remove /* Dont forget to use export your PUT middleware or other*/ }
