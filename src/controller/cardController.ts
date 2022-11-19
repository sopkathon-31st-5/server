import { Request, Response } from "express";
import { emit } from "process";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";