import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loading = () => (
    <div style={{
        display: "inlineBlock",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
    }}>
        <CircularProgress />
    </div>
)

export default Loading;