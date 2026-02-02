import express from "express";

export interface AuthUser {
  exp: string;
  iat: string;
  userId: string;
}

export interface RequestWithUser extends express.Request {
  user: AuthUser;
}
