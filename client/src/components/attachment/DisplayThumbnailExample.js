import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pageThumbnailPlugin } from './pageThumbnailPlugin';
const DisplayThumbnailExample = ({ fileUrl, pageIndex }) => {
    const thumbnailPluginInstance = thumbnailPlugin();
    const { Cover } = thumbnailPluginInstance;
    const pageThumbnailPluginInstance = pageThumbnailPlugin({
        PageThumbnail: React.createElement(Cover, { getPageIndex: () => pageIndex }),
    });
    return React.createElement(Viewer, { fileUrl: fileUrl, plugins: [pageThumbnailPluginInstance, thumbnailPluginInstance] });
};
export default DisplayThumbnailExample;