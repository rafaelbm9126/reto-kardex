import React from "react";
import { createElement } from "react";
import { useSelector } from "react-redux";
import { MenuItemLink, getResources } from "react-admin";

export const Menu: React.FunctionComponent<any> = ({ onMenuClick, logout }) => {
  const resources = useSelector(getResources);
  return (
    <div>
      {resources.map((resource) => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={<div>{resource.name}</div>}
          leftIcon={createElement(resource.icon)}
          onClick={onMenuClick}
          sidebarIsOpen={false}
        />
      ))}
    </div>
  );
};
