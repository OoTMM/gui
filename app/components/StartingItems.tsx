import React from 'react';

import { itemName } from '@ootmm/core';
import { useStartingItems } from '../contexts/GeneratorContext';

const NAMES = {
  MM: "Majora's Mask",
  OOT: 'Ocarina of Time',
  SHARED: 'Shared',
}

export function StartingItems() {
  const { startingItems, itemPool, incr, decr, reset } = useStartingItems();

  const buildSingleTable = (gamePrefix: 'OOT' | 'MM' | 'SHARED') => {
    const items = Object.keys(itemPool).filter((item) => item.startsWith(gamePrefix));

    if (items.length === 0) {
      return null;
    }

    return (
      <table>
        <thead>
          <tr>
            <th colSpan={2}>
              {NAMES[gamePrefix]}
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item} className={startingItems[item] > 0 ? 'active' : 'inactive'}>
              <td className="count">
                <button className="count-adjust" onClick={() => decr(item)}>–</button>
                &nbsp;{startingItems[item] || 0}&nbsp; {/* spaces instead of margins on both sides, cause they double up */}
                <button className="count-adjust" onClick={() => incr(item)}>+</button>
              </td>
              <td>{itemName(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div className="starting-container"> {/* section-margin-top may be needed because of te banner that's missing in my testing  */}
        {buildSingleTable('OOT')}
        {buildSingleTable('MM')}
        <div className="starting-align-button">
          <button className="btn-danger" onClick={reset}>
            Reset Starting Items
          </button>
          {buildSingleTable('SHARED')}
        </div>
      </div>
    </>
  );
}
