import React from 'react';

const ImageHelper = ({product}) => {
    const imageurl = product ? product.image : `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.123rf.com%2Fstock-photo%2Fnot_available.html&psig=AOvVaw3Jf3c_WE-k3LsYb5H3dYc2&ust=1682667911809000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLCbnszIyf4CFQAAAAAdAAAAABAI`;
    return (
        <div className="rounded border border-success p-2">
            <img src={imageurl}
            style={{maxHeight:"100%", maxWidth: "100%"}}
            className='mb-3 rounded'
            alt=''
            />
        </div>
    );
};

export default ImageHelper;