import React from 'react';
import MongoMenu from './mongo-menu/index';

export default function MongoNav({}) {
  return (
    <div>
      <MongoMenu
        user={{
          firstName: 'Brooke',
          lastName: 'yalof',
          email: 'xobsyxo@mac.com',
        }}
      />
    </div>
  );
}
