import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { LGIDS_INFO_BLOCK } from './constants';
import {
  CardInfoBlockProps,
  IconInfoBlockProps,
  ImageInfoBlockProps,
  Variant,
} from './InfoBlock.types';
import { InfoBlock } from '.';

const defaultProps = {
  buttonProps: { children: 'CTA Button' },
  description:
    'Lorem ipsum dolor sit amet, consectetur ipsum et adipiscing elit, sed do eiusmod.',
  label: 'Label',
  media: <img alt="Product sample" src="example.png" />,
} as const;

describe('packages/feature-walls/InfoBlock', () => {
  describe(`${Variant.Card} variant`, () => {
    const badgeProps = { children: 'TAG' };

    const renderCardInfoBlock = (
      props?: Partial<Omit<CardInfoBlockProps, 'variant'>>,
    ) => {
      return render(
        <InfoBlock
          {...defaultProps}
          variant={Variant.Card}
          badgeProps={badgeProps}
          {...props}
        />,
      );
    };

    test('does not have basic accessibility issues', async () => {
      const { container } = renderCardInfoBlock();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('renders the media wrapper and media', () => {
      const { getByAltText, getByTestId } = renderCardInfoBlock({
        badgeProps,
        media: defaultProps.media,
      });

      expect(getByAltText('Product sample')).toBeInTheDocument();
      expect(getByTestId(LGIDS_INFO_BLOCK.mediaWrapper)).toBeInTheDocument();
    });

    test('does not render media wrapper or media if media prop is undefined', () => {
      const { queryByAltText, queryByTestId } = renderCardInfoBlock({
        media: undefined,
      });

      expect(queryByAltText('Product sample')).not.toBeInTheDocument();
      expect(
        queryByTestId(LGIDS_INFO_BLOCK.mediaWrapper),
      ).not.toBeInTheDocument();
    });

    test('renders the label and description', () => {
      const { getByText } = renderCardInfoBlock({
        label: defaultProps.label,
        description: defaultProps.description,
      });

      expect(getByText(defaultProps.label)).toBeInTheDocument();
      expect(getByText(defaultProps.description)).toBeInTheDocument();
    });

    test('does not render the description if it is not provided', () => {
      const { queryByTestId } = renderCardInfoBlock({
        description: undefined,
      });

      expect(
        queryByTestId(LGIDS_INFO_BLOCK.description),
      ).not.toBeInTheDocument();
    });

    test('renders the badge', () => {
      const { getByText } = renderCardInfoBlock({
        badgeProps: badgeProps,
      });

      expect(getByText(badgeProps.children)).toBeInTheDocument();
    });

    test('does not render the badge if badgeProps is not provided', () => {
      const { queryByTestId } = renderCardInfoBlock({
        badgeProps: undefined,
      });

      expect(queryByTestId(LGIDS_INFO_BLOCK.badge)).not.toBeInTheDocument();
    });

    test('renders the button', () => {
      const { getByText } = renderCardInfoBlock({
        buttonProps: defaultProps.buttonProps,
      });

      expect(getByText(defaultProps.buttonProps.children)).toBeInTheDocument();
    });

    test('does not render the button if buttonProps is not provided', () => {
      const { queryByTestId } = renderCardInfoBlock({
        buttonProps: undefined,
      });

      expect(queryByTestId(LGIDS_INFO_BLOCK.button)).not.toBeInTheDocument();
    });
  });

  describe(`${Variant.Icon} variant`, () => {
    const renderIconInfoBlock = (
      props?: Partial<Omit<IconInfoBlockProps, 'variant'>>,
    ) => {
      return render(
        <InfoBlock {...defaultProps} variant={Variant.Icon} {...props} />,
      );
    };

    test('does not have basic accessibility issues', async () => {
      const { container } = renderIconInfoBlock();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('renders the media', () => {
      const { getByAltText } = renderIconInfoBlock({
        media: defaultProps.media,
      });

      expect(getByAltText('Product sample')).toBeInTheDocument();
    });

    test('renders the label and description', () => {
      const { getByText } = renderIconInfoBlock({
        label: defaultProps.label,
        description: defaultProps.description,
      });

      expect(getByText(defaultProps.label)).toBeInTheDocument();
      expect(getByText(defaultProps.description)).toBeInTheDocument();
    });

    test('does not render the description if it is not provided', () => {
      const { queryByTestId } = renderIconInfoBlock({
        description: undefined,
      });

      expect(
        queryByTestId(LGIDS_INFO_BLOCK.description),
      ).not.toBeInTheDocument();
    });

    test('renders the button', () => {
      const { getByText } = renderIconInfoBlock({
        buttonProps: defaultProps.buttonProps,
      });

      expect(getByText(defaultProps.buttonProps.children)).toBeInTheDocument();
    });

    test('does not render the button if buttonProps is not provided', () => {
      const { queryByTestId } = renderIconInfoBlock({
        buttonProps: undefined,
      });

      expect(queryByTestId('lg-info-block_button')).not.toBeInTheDocument();
    });
  });

  describe(`${Variant.Image} variant`, () => {
    const badgePropsArray = [{ children: 'TAG1' }, { children: 'TAG2' }];

    const renderImageInfoBlock = (
      props?: Partial<Omit<ImageInfoBlockProps, 'variant'>>,
    ) => {
      return render(
        <InfoBlock
          {...defaultProps}
          variant={Variant.Image}
          badgePropsArray={badgePropsArray}
          {...props}
        />,
      );
    };

    test('does not have basic accessibility issues', async () => {
      const { container } = renderImageInfoBlock();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('renders the media', () => {
      const { getByAltText } = renderImageInfoBlock({
        media: defaultProps.media,
      });

      expect(getByAltText('Product sample')).toBeInTheDocument();
    });

    test('renders the label and description', () => {
      const { getByText } = renderImageInfoBlock({
        label: defaultProps.label,
        description: defaultProps.description,
      });

      expect(getByText(defaultProps.label)).toBeInTheDocument();
      expect(getByText(defaultProps.description)).toBeInTheDocument();
    });

    test('does not render the description if it is not provided', () => {
      const { queryByTestId } = renderImageInfoBlock({
        description: undefined,
      });

      expect(
        queryByTestId(LGIDS_INFO_BLOCK.description),
      ).not.toBeInTheDocument();
    });

    test('renders the badges', () => {
      const { getByText } = renderImageInfoBlock({
        badgePropsArray,
      });

      expect(getByText('TAG1')).toBeInTheDocument();
      expect(getByText('TAG2')).toBeInTheDocument();
    });

    test('does not render the badges if badgePropsArray is not provided', () => {
      const { queryByTestId } = renderImageInfoBlock({
        badgePropsArray: undefined,
      });

      expect(queryByTestId(LGIDS_INFO_BLOCK.badges)).not.toBeInTheDocument();
    });

    test('does not render the badges if badgePropsArray is empty', () => {
      const { queryByTestId } = renderImageInfoBlock({
        badgePropsArray: [],
      });

      expect(queryByTestId(LGIDS_INFO_BLOCK.badges)).not.toBeInTheDocument();
    });

    test('renders the button', () => {
      const { getByText } = renderImageInfoBlock({
        buttonProps: defaultProps.buttonProps,
      });

      expect(getByText(defaultProps.buttonProps.children)).toBeInTheDocument();
    });

    test('does not render the button if buttonProps is not provided', () => {
      const { queryByTestId } = renderImageInfoBlock({
        buttonProps: undefined,
      });

      expect(queryByTestId(LGIDS_INFO_BLOCK.button)).not.toBeInTheDocument();
    });
  });

  /* eslint-disable jest/no-disabled-tests*/
  test.skip('types behave as expected', () => {
    <>
      <InfoBlock variant={Variant.Card} {...defaultProps} />
      <InfoBlock variant={Variant.Icon} {...defaultProps} />
      <InfoBlock variant={Variant.Image} {...defaultProps} />

      {/* @ts-expect-error - in 'card' variant, cannot set badgePropsArray */}
      <InfoBlock
        variant={Variant.Card}
        media={defaultProps.media}
        label={defaultProps.label}
        buttonProps={defaultProps.buttonProps}
        badgeProps={{ children: 'TAG' }}
        badgePropsArray={[{ children: 'TAG' }]}
      />

      {/* @ts-expect-error - in 'icon' variant, cannot set badgeProps or badgePropsArray */}
      <InfoBlock
        variant={Variant.Icon}
        media={defaultProps.media}
        label={defaultProps.label}
        buttonProps={defaultProps.buttonProps}
        badgeProps={{ children: 'TAG' }}
        badgePropsArray={[{ children: 'TAG' }]}
      />

      {/* @ts-expect-error - in 'image' variant, cannot set badgeProps */}
      <InfoBlock
        variant={Variant.Image}
        media={defaultProps.media}
        label={defaultProps.label}
        buttonProps={defaultProps.buttonProps}
        badgeProps={{ children: 'TAG' }}
        badgePropsArray={[{ children: 'TAG' }]}
      />

      <InfoBlock
        variant={Variant.Card}
        {...defaultProps}
        // @ts-expect-error - cannot set variant in badgeProps
        badgeProps={{ children: 'TAG', variant: 'red' }}
      />

      <InfoBlock
        variant={Variant.Image}
        {...defaultProps}
        // @ts-expect-error - cannot set variant in badgePropsArray
        badgePropsArray={[{ children: 'TAG', variant: 'red' }]}
      />
    </>;
  });
});
