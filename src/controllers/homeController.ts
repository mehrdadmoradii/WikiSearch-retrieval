import { Request, Response, NextFunction } from "express";
import { search } from "../lib/Search";
import StatusCodes from 'http-status-codes';


export async function postSearch(req: Request, res: Response) {
    if (!req.body.term) // Search term not provided
        return res.status(StatusCodes.BAD_REQUEST).send('The search term is required!!');
    const result = await search(req.body.term);
    const resultToBeReturned = result.map(r => {
        return {
            title: r.key.split('wiki/')[1],
            url: r.key 
        }
    }) 
    res.status(StatusCodes.OK).json(resultToBeReturned);
}