import { Meta } from 'express-validator';
import moment from 'moment';

export const isDate = (value: string, { req, location, path }: Meta) => {
  if (!value) {
    return false;
  }

  const date = moment(value);
  if (date.isValid()) {
    return true;
  }

  return false;
};
