import React from 'react';
import "./Header.scss"
import {inject, observer} from "mobx-react";
import RootStore from "../../Stores/RootStore";

@inject("RootStore")
@observer
class Header extends React.Component<{RootStore?: RootStore}, any>{
  render() {
    const RootStore = this.props.RootStore!;
    const links: [routes, string][] = [
      ["main", "Главная"],
      ["comments", "Комменты"]
    ];

    const menuClass = (RootStore.selectedRoute === 'comments' || RootStore.isHeaderContrast) ? 'title blue' : 'title';

    return (
      <div id="Header">
        {links.map(route=>{
          const title = route[1];
          const underlineClass = (
            route[0] === RootStore.selectedRoute
            && (RootStore.isHeaderContrast || RootStore.selectedRoute !== "main")
          )
            ? 'underline underline_filled'
            : 'underline';
          return (
            <div
              className='link'
              key={route[0]}
              onClick={RootStore.selectRoute.bind(null, route[0])}
            >
              <div className={menuClass}>{title}</div>
              <div className={underlineClass}/>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Header;
