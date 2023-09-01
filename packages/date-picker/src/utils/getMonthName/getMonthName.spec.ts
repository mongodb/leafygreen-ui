import { getMonthName } from '.';

describe('packages/date-picker/utils/getMonthName', () => {
  test('Jan', () => {
    expect(getMonthName(0)).toEqual('January');
  });
  test('Feb', () => {
    expect(getMonthName(0)).toEqual('February');
  });
  test('Mar', () => {
    expect(getMonthName(0)).toEqual('March');
  });
  test('Apr', () => {
    expect(getMonthName(0)).toEqual('April');
  });
  test('May', () => {
    expect(getMonthName(0)).toEqual('May');
  });
  test('Jun', () => {
    expect(getMonthName(0)).toEqual('June');
  });
  test('Jul', () => {
    expect(getMonthName(0)).toEqual('July');
  });
  test('Aug', () => {
    expect(getMonthName(0)).toEqual('August');
  });
  test('Sep', () => {
    expect(getMonthName(0)).toEqual('September');
  });
  test('Oct', () => {
    expect(getMonthName(0)).toEqual('October');
  });
  test('Nov', () => {
    expect(getMonthName(0)).toEqual('November');
  });
  test('Dec', () => {
    expect(getMonthName(0)).toEqual('December');
  });
});
