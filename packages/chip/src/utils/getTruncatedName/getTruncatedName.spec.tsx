import { TruncationLocation } from '../../Chip';

import { getTruncatedName } from '.';

const stringToTruncate = 'hey';

describe('packages/chip/utils/getTruncatedName', () => {
  describe('renders correct label when the chipCharacterLimit is `2`', () => {
    test('and the chipTruncationLocation is `End`', () => {
      const results = getTruncatedName(
        2,
        TruncationLocation.End,
        stringToTruncate,
      );
      expect(results).toEqual('…');
    });

    test('and the chipTruncationLocation is `Start`', () => {
      const results = getTruncatedName(
        2,
        TruncationLocation.Start,
        stringToTruncate,
      );
      expect(results).toEqual('…');
    });

    test('and the chipTruncationLocation is `Middle`', () => {
      const results = getTruncatedName(
        2,
        TruncationLocation.Middle,
        stringToTruncate,
      );
      expect(results).toEqual('…');
    });

    test('and the chipTruncationLocation is `None`', () => {
      const results = getTruncatedName(
        2,
        TruncationLocation.None,
        stringToTruncate,
      );
      expect(results).toEqual('hey');
    });
  });

  describe('renders correct label when the chipCharacterLimit is `3`', () => {
    test('and the chipTruncationLocation is `End`', () => {
      const results = getTruncatedName(
        3,
        TruncationLocation.End,
        stringToTruncate,
      );
      expect(results).toEqual('…');
    });

    test('and the chipTruncationLocation is `Start`', () => {
      const results = getTruncatedName(
        3,
        TruncationLocation.Start,
        stringToTruncate,
      );
      expect(results).toEqual('…');
    });

    test('and the chipTruncationLocation is `Middle`', () => {
      const results = getTruncatedName(
        3,
        TruncationLocation.Middle,
        stringToTruncate,
      );
      expect(results).toEqual('…');
    });

    test('and the chipTruncationLocation is `None`', () => {
      const results = getTruncatedName(
        3,
        TruncationLocation.None,
        stringToTruncate,
      );
      expect(results).toEqual('hey');
    });
  });

  describe('renders correct label when the chipCharacterLimit is `4`', () => {
    test('and the chipTruncationLocation is `End`', () => {
      const results = getTruncatedName(
        4,
        TruncationLocation.End,
        stringToTruncate,
      );
      expect(results).toEqual('h…');
    });

    test('and the chipTruncationLocation is `Start`', () => {
      const results = getTruncatedName(
        4,
        TruncationLocation.Start,
        stringToTruncate,
      );
      expect(results).toEqual('…y');
    });

    test('and the chipTruncationLocation is `Middle`', () => {
      const results = getTruncatedName(
        4,
        TruncationLocation.Middle,
        stringToTruncate,
      );
      expect(results).toEqual('…y');
    });

    test('and the chipTruncationLocation is `None`', () => {
      const results = getTruncatedName(
        4,
        TruncationLocation.None,
        stringToTruncate,
      );
      expect(results).toEqual('hey');
    });
  });

  describe('renders correct label when the chipCharacterLimit is `5`', () => {
    test('and the chipTruncationLocation is `End`', () => {
      const results = getTruncatedName(
        5,
        TruncationLocation.End,
        stringToTruncate,
      );
      expect(results).toEqual('he…');
    });

    test('and the chipTruncationLocation is `Start`', () => {
      const results = getTruncatedName(
        5,
        TruncationLocation.Start,
        stringToTruncate,
      );
      expect(results).toEqual('…ey');
    });

    test('and the chipTruncationLocation is `Middle`', () => {
      const results = getTruncatedName(
        5,
        TruncationLocation.Middle,
        stringToTruncate,
      );
      expect(results).toEqual('h…y');
    });

    test('and the chipTruncationLocation is `None`', () => {
      const results = getTruncatedName(
        5,
        TruncationLocation.None,
        stringToTruncate,
      );
      expect(results).toEqual('hey');
    });
  });

  describe('renders correct label when the chipCharacterLimit is `6`', () => {
    test('and the chipTruncationLocation is `End`', () => {
      const results = getTruncatedName(
        6,
        TruncationLocation.End,
        stringToTruncate,
      );
      expect(results).toEqual('hey…');
    });

    test('and the chipTruncationLocation is `Start`', () => {
      const results = getTruncatedName(
        6,
        TruncationLocation.Start,
        stringToTruncate,
      );
      expect(results).toEqual('…hey');
    });

    test('and the chipTruncationLocation is `Middle`', () => {
      const results = getTruncatedName(
        6,
        TruncationLocation.Middle,
        stringToTruncate,
      );
      expect(results).toEqual('h…ey');
    });

    test('and the chipTruncationLocation is `None`', () => {
      const results = getTruncatedName(
        6,
        TruncationLocation.None,
        stringToTruncate,
      );
      expect(results).toEqual('hey');
    });
  });
});
