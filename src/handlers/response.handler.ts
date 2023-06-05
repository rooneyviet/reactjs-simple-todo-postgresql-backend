import { AxiosResponse } from "axios";

const responseWithData = (res:any, statusCode: number, data?: any) => res.status(statusCode).json(data);

const error = (res:any) => responseWithData(res, 500, {
    status: 500,
    message: "Oops! Something wrong!"
});

const badRequest = (res:any, message: string) => responseWithData(res, 400, {
    status:400, 
    message
});

const ok = (res:any, data?: any) => responseWithData(res, 200, data);

const created = (res:any, data?: any) => responseWithData(res, 201, data);

const unauthorized = (res:any) => responseWithData(res, 401, {
    status: 401,
    message: "Unauthorized"
});

const notfound = (res:any) => responseWithData(res, 404, {
    status: 404,
    message: "Resource Not Found"
});

export default {
    error,
    badRequest,
    ok,
    created,
    unauthorized,
    notfound
};