import * as React from 'react';

export const pageThumbnailPlugin = (props) => {
    const { PageThumbnail } = props;
    return {
        renderViewer: (renderProps) => {
            let { slot } = renderProps;
            slot.children = PageThumbnail;
            // Reset the sub slot
            slot.subSlot.attrs = {};
            slot.subSlot.children = React.createElement(React.Fragment, null);
            return slot;
        },
    };
};