import * as dayjs from 'dayjs';
import { func } from 'joi';

function camelToSnake(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function formatDate(date){
  return dayjs(date).format('YYYY-MM-DD')
}

export function convertKeysToSnakeCase(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = camelToSnake(key);

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[snakeKey] = convertKeysToSnakeCase(value);
    } else if (Array.isArray(value)) {
      result[snakeKey] = value.map((item) =>
        item && typeof item === 'object' ? convertKeysToSnakeCase(item) : item,
      );
    } else {
      result[snakeKey] = value;
    }
  }
  return result;
}

function snakeToCamel(str) {
  return str.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
}

export function convertKeysToCamelCase(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = snakeToCamel(key);

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[camelKey] = convertKeysToCamelCase(value);
    } else if (Array.isArray(value)) {
      result[camelKey] = value.map((item) =>
        item && typeof item === 'object' ? convertKeysToCamelCase(item) : item,
      );
    } else {
      result[camelKey] = value;
    }
  }
  return result;
}

export function totalDay(startDate, endDate) {
  return dayjs(endDate).diff(dayjs(startDate), 'day') + 1;
}
