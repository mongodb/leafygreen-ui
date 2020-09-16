/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { GridContainer, GridItem } from '../components/grid/Grid';

const PinkDiv = styled.div`
  height: 100px;
  background-color: #ff66d6;
`;

const GreenDiv = styled.div`
  height: 100px;
  background-color: #65fd44;
`;

const BlueDiv = styled.div`
  height: 100px;
  background-color: #65c7ff;
`;

const SalmonDiv = styled.div`
  height: 100px;
  background-color: #ff9191;
`;

const GoldDiv = styled.div`
  height: 100px;
  background-color: #d9c276;
`;

export default function Home() {
  return (
    <div>
      <GridContainer>
        <GridItem lg={12}>
          <PinkDiv />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem lg={6}>
          <GreenDiv />
        </GridItem>
        <GridItem lg={6}>
          <GreenDiv />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem md={6}>
          <BlueDiv />
        </GridItem>
        <GridItem md={6}>
          <BlueDiv />
        </GridItem>
        <GridItem md={6}>
          <BlueDiv />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem md={3}>
          <SalmonDiv />
        </GridItem>
        <GridItem md={3}>
          <SalmonDiv />
        </GridItem>
        <GridItem md={3}>
          <SalmonDiv />
        </GridItem>
        <GridItem md={3}>
          <SalmonDiv />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem sm={6}>
          <GoldDiv />
        </GridItem>
        <GridItem sm={6}>
          <GoldDiv />
        </GridItem>
        <GridItem sm={6}>
          <GoldDiv />
        </GridItem>
        <GridItem sm={6}>
          <GoldDiv />
        </GridItem>
        <GridItem sm={6}>
          <GoldDiv />
        </GridItem>
        <GridItem sm={6}>
          <GoldDiv />
        </GridItem>
      </GridContainer>
    </div>
  );
}
