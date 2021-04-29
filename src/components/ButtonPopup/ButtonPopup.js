import React from "react";
import { Popup, Button } from 'semantic-ui-react';

function EmptyCartPopup({content, label}) {
  return (
    <Popup
      trigger={<Button content={label}></Button>}
      on='click'
      pinned
    >
      <Popup.Content>
        {content}
      </Popup.Content>
    </Popup>
  );
}

export default EmptyCartPopup;
