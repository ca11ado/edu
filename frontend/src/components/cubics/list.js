import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';

const ListWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const LinkWrap = styled.div`
  margin: 0 10px;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
`;

export default ({ data: cubics }) => {
  const list = _.map(cubics, (cubic) => {
    const href = `/cubic/${cubic.id}`;
    return (
      <LinkWrap key={"li_" + cubic.id}>
        <CustomLink key={cubic.id} to={href}>{cubic.name}</CustomLink>
      </LinkWrap>
    );
  });

  return (
    <ListWrapper>{list}</ListWrapper>
  );
}

