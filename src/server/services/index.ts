import * as express from 'express';
import { nameList } from './name.list';
import { members } from './members';

export function init(app: express.Application) {
  nameList(app);
  members(app);
}
