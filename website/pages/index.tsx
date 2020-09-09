/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { GridContainer, Grid } from '../components/grid/Grid';

const Layout = () => {
  return (
    <div
      css={css`
        height: 100px;
        background-color: aliceblue;
      `}
    />
  );
};

export default function Home() {
  return (
    <GridContainer>
      <Grid>
        <Layout />
      </Grid>
      <Grid>
        <Layout />
      </Grid>
      <Grid>
        <Layout />
      </Grid>
      <Grid>
        <Layout />
      </Grid>
      <Grid>
        <Layout />
      </Grid>
      <Grid>
        <Layout />
      </Grid>
    </GridContainer>
  );
}
