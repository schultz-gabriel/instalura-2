import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import propToStyle from '../../../theme/utils/propToStyle';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';
import { Link } from '../../commons/Link';

export const TextStyleVariantsMap = {
  smallestException: css`
    font-size: ${({ theme: { theme } }) => theme.typographyVariants.smallestException.fontSize};
    font-weight: ${({ theme: { theme } }) => theme.typographyVariants.smallestException.fontWeight};
    line-height: ${({ theme: { theme } }) => theme.typographyVariants.smallestException.fontHeight};
  `,

  paragraph1: css`
    font-size: ${({ theme: { theme } }) => theme.typographyVariants.paragraph1.fontSize};
    font-weight: ${({ theme: { theme } }) => theme.typographyVariants.paragraph1.fontWeight};
    line-height: ${({ theme: { theme } }) => theme.typographyVariants.paragraph1.fontHeight};
  `,

  title: css`
    ${({ theme: { theme } }) => css`
      font-size: ${theme.typographyVariants.titleXS.fontSize};
      font-weight: ${theme.typographyVariants.titleXS.fontWeight};
      line-height: ${theme.typographyVariants.titleXS.lineHeight};
    `}

    ${breakpointsMedia({
    md: css`
      ${({ theme: { theme } }) => css`
        font-size: ${theme.typographyVariants.title.fontSize};
        font-weight: ${theme.typographyVariants.title.fontWeight};
        line-height: ${theme.typographyVariants.title.lineHeight};
      `}
    `,
  })}
  `,
};

const TextBase = styled.span`
  ${({ variant }) => TextStyleVariantsMap[variant]}
  ${propToStyle('textAlign')}
`;

export default function Text({
  tag,
  variant,
  children,
  href,
  ...props
}) {
  if (href) {
    return (
      <TextBase
        as={Link}
        variant={variant}
        href={href}
        {...props}
      >
        {children}
      </TextBase>
    );
  }

  return (
    <TextBase
      as={tag}
      variant={variant}
      {...props}
    >
      {children}
    </TextBase>
  );
}

Text.propTypes = {
  tag: PropTypes.string,
  href: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node,
};

Text.defaultProps = {
  tag: 'span',
  href: '',
  variant: 'paragraph1',
  children: null,
};
